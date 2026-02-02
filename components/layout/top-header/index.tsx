import Container from "@/components/container";
import MainLogo from "@/components/logo";
import Link from "next/link";
import React from "react";

const TopNavbar = () => {
  return (
    <Container>
      <div className="flex items-center py-4 pb-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <MainLogo />
          </div>
          {/* <span className="text-lg font-bold hidden md:block">
            PillScript <span className="text-blue-500">Pharmacy</span>
          </span> */}
        </Link>
      </div>
    </Container>
  );
};

export default TopNavbar;
