"use client";
import Container from "@/components/container";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/modules/home-module/compoents/login-dialog";
import { MenuData } from "@/data";
import { usePathname } from "next/navigation";
import MainLogo from "@/components/logo";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { nhost } from "@/lib/nhost";
import { client } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Image from "next/image";

const GET_PHARMACY_USER = gql`
  query GetPharmacyUserProfile($email: citext!) {
    users(where: { email: { _eq: $email } }) {
      id
      displayName
      pharmacy_user {
        image_id
      }
    }
  }
`;

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthenticationStatus();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = nhost.auth.getUser();
        if (!user) {
          setProfileImageUrl(null);
          setDisplayName(null);
          return;
        }

        const { data } = await client.query<{
          users: {
            id: string;
            displayName: string;
            pharmacy_user: { image_id: string | null }[];
          }[];
        }>({
          query: GET_PHARMACY_USER,
          variables: { email: user.email },
          fetchPolicy: "network-only",
        });

        const dbUser = data?.users[0];
        if (!dbUser) {
          setProfileImageUrl(null);
          setDisplayName(user.displayName ?? null);
          return;
        }

        setDisplayName(dbUser.displayName || user.displayName || null);

        const imageId = dbUser.pharmacy_user?.[0]?.image_id;
        if (imageId) {
          const baseStorageUrl =
            process.env.NEXT_PUBLIC_NHOST_STORAGE_URL ||
            "https://lfgwnrkyoofwbvejrpqm.storage.eu-central-1.nhost.run";
          setProfileImageUrl(`${baseStorageUrl}/v1/files/${imageId}`);
        } else {
          setProfileImageUrl(null);
        }
      } catch (e) {
        setProfileImageUrl(null);
      }
    };

    if (isAuthenticated) {
      loadProfile();
    } else {
      setProfileImageUrl(null);
      setDisplayName(null);
    }
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    await nhost.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="relative">
              <MainLogo />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 lg:gap-4">
            {MenuData.map((item: any) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-[14px] rounded-lg px-3.5 py-2.5 whitespace-nowrap font-normal text-secondary transition-colors duration-200 hover:bg-[#e8e8e8]/30 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {!isAuthenticated && (
              <>
                <LoginDialog />
                <Link href="/signup">
                  <Button
                    variant={"outline"}
                    className="text-black hidden lg:block text-sm cursor-pointer rounded-full"
                    size="sm"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border px-2 py-1 hover:bg-gray-50"
                >
                  <Image
                    src={profileImageUrl || "/assets/svg/logo2.svg"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  {displayName && (
                    <span className="hidden md:inline text-sm">
                      {displayName}
                    </span>
                  )}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md py-1 z-50">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
