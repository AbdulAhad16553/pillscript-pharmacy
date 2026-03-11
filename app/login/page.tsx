"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import Link from "next/link";
import { nhost } from "@/lib/nhost";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { session, error } = await nhost.auth.signIn({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (session) {
        // Check if this user has an active pharmacy_users row
        const userId = session.user?.id;
        if (!userId) {
          toast.error("Could not determine user id.");
          return;
        }

        const { data, error: gqlError } = await nhost.graphql.request(
          `
          query CheckPharmacyUser($userId: uuid!) {
            pharmacy_users(where: { user_id: { _eq: $userId } }) {
              active
            }
          }
        `,
          { userId }
        );

        if (gqlError) {
          const msg = Array.isArray(gqlError)
            ? gqlError[0]?.message
            : (gqlError as { message?: string }).message;
          toast.error(msg || "Failed to verify account status.");
          return;
        }

        const record = data?.pharmacy_users?.[0];

        if (!record || !record.active) {
          await nhost.auth.signOut();
          toast.error("You are not approved by owner.");
          return;
        }

        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign Up
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


