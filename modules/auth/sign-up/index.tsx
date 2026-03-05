"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import Container from "@/components/container";
import { PhoneInput } from "@/components/input-phone";
import SearchableSelect from "@/components/searchableSelect";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { nhost } from "@/lib/nhost";
import bcrypt from "bcryptjs";

const GET_COMPANIES = gql`
  query GetCompanies {
    company(order_by: { company_fullname: asc }) {
      company_id
      company_fullname
    }
  }
`;

const GET_BASE_TOWNS = gql`
  query GetBaseTowns($districtId: uuid!) {
    base_town(
      where: { district_id: { _eq: $districtId } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`;

const INSERT_USER = gql`
  mutation InsertUser(
    $email: citext!
    $passwordHash: String!
    $displayName: String!
    $locale: String!
  ) {
    insertUser(
      object: {
        email: $email
        passwordHash: $passwordHash
        displayName: $displayName
        locale: $locale
      }
    ) {
      id
    }
  }
`;

const INSERT_PHARMACY_USER = gql`
  mutation InsertPharmacyUser(
    $user_id: uuid!
    $blood_group: String
    $image_id: uuid
    $company_id: uuid
    $active: Boolean
    $district_id: uuid
    $basetown_id: uuid
    $gender: String
    $cnic: String
    $phone: String
    $phone2: String
    $dob: String
  ) {
    insert_pharmacy_users_one(
      object: {
        user_id: $user_id
        blood_group: $blood_group
        image_id: $image_id
        company_id: $company_id
        active: $active
        district_id: $district_id
        basetown_id: $basetown_id
        gender: $gender
        cnic: $cnic
        phone: $phone
        phone2: $phone2
        dob: $dob
      }
    ) {
      id
    }
  }
`;

const GET_DISTRICTS = gql`
  query GetDistricts {
    districts(order_by: { name: asc }) {
      id
      name
    }
  }
`;

type FormValues = {
  username: string;
  email: string;
  password: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  bloodGroup: string;
  companyId: string;
  districtId: string;
  baseTownId: string;
  cnic: any;
  phones: { value: string }[];
  gender: any;
};

const SignupCard = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      phones: [{ value: "" }],
    },
  });
  const [district, setDistrict] = useState<string>("");
  const [baseTown, setBaseTown] = useState<string>("");
  const [companies, setCompanies] = useState<
    { company_id: string; company_fullname: string }[]
  >([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [baseTowns, setBaseTowns] = useState<{ id: string; name: string | null }[]>(
    []
  );
  const [loadingBaseTowns, setLoadingBaseTowns] = useState(false);

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phones" });

  const districtId = watch("districtId");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const { data } =
          await client.query<{
            company: { company_id: string; company_fullname: string }[];
          }>({
            query: GET_COMPANIES,
            fetchPolicy: "network-only",
          });
        setCompanies(data?.company || []);
      } catch (error: any) {
        toast.error(error.message || "Failed to load companies");
      } finally {
        setLoadingCompanies(false);
      }
    };

    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);
        const { data } =
          await client.query<{
            districts: { id: string; name: string }[];
          }>({
            query: GET_DISTRICTS,
            fetchPolicy: "network-only",
          });
        setDistricts(data?.districts || []);
      } catch (error: any) {
        toast.error(error.message || "Failed to load districts");
      } finally {
        setLoadingDistricts(false);
      }
    };

    const fetchBaseTowns = async (districtIdForQuery: string) => {
      if (!districtIdForQuery) {
        setBaseTowns([]);
        return;
      }
      try {
        setLoadingBaseTowns(true);
        const { data } =
          await client.query<{
            base_town: { id: string; name: string | null }[];
          }>({
            query: GET_BASE_TOWNS,
            variables: { districtId: districtIdForQuery },
            fetchPolicy: "network-only",
          });
        setBaseTowns(data?.base_town || []);
      } catch (error: any) {
        toast.error(error.message || "Failed to load base towns");
      } finally {
        setLoadingBaseTowns(false);
      }
    };

    fetchCompanies();
    fetchDistricts();

    // If a district is already selected (e.g. when editing), load its base towns
    if (districtId) {
      fetchBaseTowns(districtId);
    }
  }, [districtId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Hash password with bcryptjs
      const passwordHash = await bcrypt.hash(data.password, 10);

      // Insert into user table
      const userResult = await client.mutate<{
        insertUser: { id: string };
      }>({
        mutation: INSERT_USER,
        variables: {
          email: data.email,
          passwordHash,
          displayName: data.username,
          locale: "en",
        },
      });

      const userId = userResult.data?.insertUser?.id;

      if (!userId) {
        toast.error("Failed to create user");
        return;
      }

      // Upload profile image to Nhost storage (if provided)
      let imageId: string | null = null;
      if (imageFile) {
        try {
          const token = nhost.auth.getAccessToken();
          const formData = new FormData();
          formData.append("file", imageFile);

          const baseStorageUrl =
            process.env.NEXT_PUBLIC_NHOST_STORAGE_URL ||
            "https://lfgwnrkyoofwbvejrpqm.storage.eu-central-1.nhost.run";

          const res = await fetch(`${baseStorageUrl}/v1/files`, {
            method: "POST",
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
          });

          if (!res.ok) {
            throw new Error("Failed to upload profile image");
          }

          const json = await res.json();
          imageId = json?.id || json?.[0]?.id || null;
        } catch (err: any) {
          toast.error(
            err?.message ||
              "Failed to upload profile image. Continuing without it."
          );
        }
      }

      // Build DOB string (YYYY-MM-DD) from day/month/year (if all provided)
      let dobString: string | null = null;
      if (data.dob?.day && data.dob?.month && data.dob?.year) {
        const day = data.dob.day.toString().padStart(2, "0");
        const month = data.dob.month.toString().padStart(2, "0");
        dobString = `${data.dob.year}-${month}-${day}`;
      }

      const phones = data.phones.map((p) => p.value).filter(Boolean);

      // Insert into pharmacy_users table
      await client.mutate({
        mutation: INSERT_PHARMACY_USER,
        variables: {
          user_id: userId,
          blood_group: data.bloodGroup || null,
          image_id: imageId,
          company_id: data.companyId || null,
          active: true,
          district_id: data.districtId || null,
          basetown_id: data.baseTownId || null,
          gender: data.gender || null,
          cnic: data.cnic || null,
          phone: phones[0] || null,
          phone2: phones[1] || null,
          dob: dobString,
        },
      });

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up");
    }
  };

  return (
    <Container>
      <Card className="shadow-2xl border rounded-2xl w-full max-w-4xl mx-auto mb-4 mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create Account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Fill in your details to get started
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* LEFT: FORM (8 columns) */}
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <div>
                  <Label>Username</Label>
                  <Input
                    {...register("username")}
                    placeholder="Your username"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Create a password"
                  />
                </div>

                {/* DOB */}
                <div>
                  <Label>Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Select onValueChange={(v) => setValue("dob.day", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent className="max-h-56">
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (d) => (
                            <SelectItem key={d} value={String(d)}>
                              {d}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={(v) => setValue("dob.month", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((m, i) => (
                          <SelectItem key={m} value={String(i + 1)}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={(v) => setValue("dob.year", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="max-h-56">
                        {Array.from({ length: 80 }, (_, i) => 2025 - i).map(
                          (y) => (
                            <SelectItem key={y} value={String(y)}>
                              {y}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* CNIC */}
                <div>
                  <Label>CNIC</Label>
                  <Input
                    placeholder="12345-1234567-1"
                    maxLength={15}
                    {...register("cnic")}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5);
                      if (v.length > 13)
                        v = v.slice(0, 13) + "-" + v.slice(13, 14);
                      setValue("cnic", v);
                    }}
                  />
                </div>

                <div>
                  <Label>Blood Group</Label>
                  <Select onValueChange={(v) => setValue("bloodGroup", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-start">
                <Label>Profile Image</Label>

                {imagePreview ? (
                  <div className="relative mt-2 w-28">
                    <img
                      src={imagePreview}
                      className="h-28 w-28 rounded-md object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-md p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="mt-2 flex h-28 w-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Company</Label>
                <SearchableSelect
                  value={selectedCompanyName}
                  onChange={(name) => {
                    setSelectedCompanyName(name);
                    const match = companies.find(
                      (c) => c.company_fullname === name
                    );
                    setValue("companyId", match?.company_id || "");
                  }}
                  options={companies.map((c) => c.company_fullname)}
                  placeholder={
                    loadingCompanies ? "Loading companies..." : "Select company"
                  }
                  searchPlaceholder="Search company..."
                  disabled={loadingCompanies || companies.length === 0}
                />
              </div>
              <div>
                <Label>District</Label>
                <SearchableSelect
                  value={district}
                  onChange={(name) => {
                    setDistrict(name);
                    const match = districts.find((d) => d.name === name);
                    setValue("districtId", match?.id || "");
                    setBaseTown("");
                    setValue("baseTownId", "");
                  }}
                  options={districts.map((d) => d.name)}
                  placeholder={
                    loadingDistricts ? "Loading districts..." : "Select district"
                  }
                  searchPlaceholder="Search district..."
                  disabled={loadingDistricts || districts.length === 0}
                />
              </div>
              <div>
                <Label>Base Town</Label>
                <SearchableSelect
                  value={baseTown}
                  onChange={(name) => {
                    setBaseTown(name);
                    const match = baseTowns.find((t) => t.name === name);
                    setValue("baseTownId", match?.id || "");
                  }}
                  options={baseTowns
                    .map((t) => t.name)
                    .filter((n): n is string => !!n)}
                  placeholder={
                    !district
                      ? "Select district first"
                      : loadingBaseTowns
                      ? "Loading base towns..."
                      : "Select base town"
                  }
                  searchPlaceholder="Search base town..."
                  disabled={
                    !district || loadingBaseTowns || baseTowns.length === 0
                  }
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select onValueChange={(v) => setValue("gender", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Label>Phone Numbers</Label>
                {phoneFields.map((field, index) => (
                  <>
                    <div className="flex flex-col gap-2">
                      <div key={field.id} className="flex items-center gap-2">
                        <PhoneInput
                          value={watch(`phones.${index}.value`)}
                          defaultCountry="PK"
                          countryCallingCodeEditable={false}
                          onChange={(value) =>
                            setValue(`phones.${index}.value`, value)
                          }
                        />

                        {phoneFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removePhone(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                ))}
                <Button
                  type="button"
                  size="sm"
                  className="w-fit text-sm rounded-full mt-1 "
                  variant="outline"
                  onClick={() => appendPhone({ value: "" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>

              <p className="text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
export default SignupCard;
