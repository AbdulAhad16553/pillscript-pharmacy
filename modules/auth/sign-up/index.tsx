"use client";

import React, { useState } from "react";
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

type FormValues = {
  username: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  bloodGroup: string;
  companyId: string;
  districtId: string;
  baseTownId: string;
  emails: string;
  cnic: any;
  phones: { value: string }[];
  gender: any;
};

const SignupCard = () => {
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

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phones" });

  const districtId = watch("districtId");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ---------------- Submit (GraphQL) ---------------- */
  const onSubmit = async (data: FormValues) => {
    const payload = {
      username: data.username,
      dob: data.dob,
      bloodGroup: data.bloodGroup,
      companyId: data.companyId,
      districtId: data.districtId,
      baseTownId: data.baseTownId,
      emails: data.emails,
      phones: data.phones.map((p) => p.value),
    };
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

                {/* Blood Group */}
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
                      onClick={() => setImagePreview(null)}
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
                <Select onValueChange={(v) => setValue("companyId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Company One</SelectItem>
                    <SelectItem value="2">Company Two</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>District</Label>
                <Select onValueChange={(v) => setValue("districtId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">District A</SelectItem>
                    <SelectItem value="2">District B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Base Town</Label>
                <Select
                  disabled={!districtId}
                  onValueChange={(v) => setValue("baseTownId", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select base town" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Town One</SelectItem>
                    <SelectItem value="2">Town Two</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="mt-3 space-y-3">
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
                  className="w-fit text-sm rounded-full "
                  variant="outline"
                  onClick={() => appendPhone({ value: "" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                </Button>
              </div>

              <div className="mt-3 space-y-3">
                <Label>Email Addresses</Label>

                <Input type="email" {...register("emails")} />
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
