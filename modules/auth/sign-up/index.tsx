"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { nhost } from "@/lib/nhost";
import { Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Container from "@/components/container";
import { motion } from "framer-motion";

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  companyId: z.string().min(1),
  districtId: z.string().min(1),
  baseTownId: z.string().min(1),
});

type SignupFormData = z.infer<typeof signupSchema>;

const GET_COMPANIES = gql`
  query GetCompanies {
    company(where: { is_active: { _eq: true } }) {
      company_id
      company_fullname
      company_displayname
    }
  }
`;

const GET_DISTRICTS = gql`
  query {
    district(order_by: { name: asc }) {
      id
      name
    }
  }
`;

const GET_BASE_TOWNS = gql`
  query ($districtId: uuid!) {
    base_town(where: { district_id: { _eq: $districtId } }) {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation ($email: citext!, $phoneNumber: String!, $displayName: String!) {
    insertUser(
      object: { email: $email, phoneNumber: $phoneNumber, displayName: $displayName }
    ) {
      id
    }
  }
`;

const CREATE_PHARMACY_USER = gql`
  mutation (
    $user_id: uuid!
    $blood_group: String!
    $image_id: String
    $company_id: uuid!
    $district_id: uuid!
    $base_town_id: uuid!
  ) {
    insert_pharmacy_users_one(
      object: {
        user_id: $user_id
        blood_group: $blood_group
        image_id: $image_id
        company_id: $company_id
        district_id: $district_id
        base_town_id: $base_town_id
        active: true
      }
    ) {
      id
    }
  }
`;

const SignupForm = () => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { data: companiesData, loading: companiesLoading } = useQuery(GET_COMPANIES);
  const { data: districts } = useQuery<any>(GET_DISTRICTS);

  const districtId:any = watch("districtId");
  const { data: baseTowns } = useQuery<any>(GET_BASE_TOWNS, {
    variables: { districtId },
    skip: !districtId,
  });

  const bloodGroup = watch("bloodGroup");
  const companyId = watch("companyId");

  const [createUser] = useMutation(CREATE_USER);
  const [createPharmacyUser] = useMutation(CREATE_PHARMACY_USER);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const { fileMetadata, error } = await nhost.storage.upload({
        file,
        bucketId: "default",
      });
      if (error) {
        toast.error("Failed to upload image: " + error.message);
        return null;
      }
      return fileMetadata?.id ?? null;
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      let uploadedImageId = imageId;
      if (imageFile && !imageId) {
        uploadedImageId = await uploadImage(imageFile);
        if (!uploadedImageId) return;
        setImageId(uploadedImageId);
      }

      const { data: userData } = await createUser({
        variables: {
          email: data.email,
          phoneNumber: data.phone,
          displayName: data.username,
        },
      });

      const userId = (userData as any)?.insertUser?.id;
      if (!userId) return toast.error("Failed to create user");

      const { data: pharmacyUserData } = await createPharmacyUser({
        variables: {
          user_id: userId,
          blood_group: data.bloodGroup,
          image_id: uploadedImageId,
          company_id: data.companyId,
          district_id: data.districtId,
          base_town_id: data.baseTownId,
        },
      });

      if ((pharmacyUserData as any)?.insert_pharmacy_users_one) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else toast.error("Failed to create pharmacy user");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-white pt-4 pb-4 ">
      <Container className="w-full lg:w-[65%]">
       
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-gray-600">Join the pharma professional network</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full  mx-auto"
        >
          <Card className="shadow-xl border border-gray-200  ">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
 <form onSubmit={handleSubmit(onSubmit)} className="  grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...register("username")}
                    placeholder="Enter your username"
                    className="mt-1"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                  )}
                </div>

         
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

              
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

              
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={bloodGroup}
                    onValueChange={(value) => setValue("bloodGroup", value as any)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && (
                    <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <Label htmlFor="companyId">Company</Label>
                  <Select
                    value={companyId}
                    onValueChange={(value) => setValue("companyId", value)}
                    disabled={companiesLoading}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {((companiesData as any)?.company || []).map((c: any) => (
                        <SelectItem key={c.company_id} value={c.company_id}>
                          {c.company_displayname || c.company_fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.companyId && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>
                  )}
                </div>

                {/* District */}
                <div>
                  <Label htmlFor="districtId">District</Label>
                  <Select onValueChange={(v) => setValue("districtId", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts?.district?.map((d: any) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Base Town */}
                <div>
                  <Label htmlFor="baseTownId">Base Town</Label>
                  <Select
                    disabled={!districtId}
                    onValueChange={(v) => setValue("baseTownId", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select base town" />
                    </SelectTrigger>
                    <SelectContent>
                      {baseTowns?.base_town?.map((b: any) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

               
                <div className="flex flex-wrap justify-between items-start">
                  <Label htmlFor="image">Profile Image</Label>
                  <div className="mt-1">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-32 rounded-full object-cover border-4 border-blue-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setImageId(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Upload Image</span>
                      </label>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
            
               
                <Button
                  type="submit"
                  className="w-fit bg-black hover:bg-gray-800 text-white"
                  disabled={isSubmitting || uploading}
                >
                  {isSubmitting || uploading ? "Creating Account..." : "Create Account"}
                </Button>

             
                <div className=" text-center sm:text-end">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
                </CardDescription>
             
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default SignupForm;
