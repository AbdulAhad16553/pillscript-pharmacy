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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { nhost } from "@/lib/nhost";
import { Upload, X, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    message: "Please select a blood group",
  }),
  companyId: z.string().min(1, "Please select a company"),
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


const CREATE_USER = gql`
  mutation CreateUser($email: citext!, $phoneNumber: String!, $displayName: String!) {
    insertUser(
      object: {
        email: $email
        phoneNumber: $phoneNumber
        displayName: $displayName
        locale: "en"
      }
    ) {
      id
      email
      phoneNumber
      displayName
      locale
    }
  }
`;
const CREATE_PHARMACY_USER = gql`
  mutation CreatePharmacyUser(
    $user_id: uuid!
    $blood_group: String!
    $image_id: String
    $company_id: uuid!
  ) {
    insert_pharmacy_users_one(
      object: {
        user_id: $user_id
        blood_group: $blood_group
        image_id: $image_id
        company_id: $company_id
        active: true
      }
    ) {
      id
      user_id
      blood_group
      image_id
      company_id
      active
    }
  }
`;

export default function SignupPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: companiesData, loading: companiesLoading } = useQuery(
    GET_COMPANIES
  );

  const [createUser] = useMutation(CREATE_USER);
  const [createPharmacyUser] = useMutation(CREATE_PHARMACY_USER);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const bloodGroup = watch("bloodGroup");
  const companyId = watch("companyId");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const { fileMetadata, error } = await nhost.storage.upload({
        file,
        bucketId: "default",
      });

      if (error) {
        toast.error("Failed to upload image: " + error.message);
        return null;
      }

      if (fileMetadata) {
        return fileMetadata.id;
      }
      return null;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Upload image if provided
      let uploadedImageId = imageId;
      if (imageFile && !imageId) {
        uploadedImageId = await uploadImage(imageFile);
        if (!uploadedImageId) {
          return;
        }
        setImageId(uploadedImageId);
      }

      // Create user first
      const { data: userData } = await createUser({
        variables: {
          email: data.email,
          phoneNumber: data.phone,
          displayName: data.username,
        },
      });

      const userId = (userData as any)?.insertUser?.id;
      if (!userId) {
        toast.error("Failed to create user");
        return;
      }

      // Create pharmacy user
      const { data: pharmacyUserData } = await createPharmacyUser({
        variables: {
          user_id: userId,
          blood_group: data.bloodGroup,
          image_id: uploadedImageId,
          company_id: data.companyId,
        },
      });

      if ((pharmacyUserData as any)?.insert_pharmacy_users_one) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error("Failed to create pharmacy user");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(
        error.message || "An error occurred during signup. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-600">
              PillScript Pharmacy
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-gray-600">
            Join the pharma professional network
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Enter your username"
                  className="mt-1"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Blood Group */}
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
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodGroup && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bloodGroup.message}
                  </p>
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
                    {((companiesData as any)?.company || []).map((company: any) => (
                      <SelectItem
                        key={company.company_id}
                        value={company.company_id}
                      >
                        {company.company_displayname || company.company_fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.companyId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.companyId.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || uploading}
              >
                {isSubmitting || uploading
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

