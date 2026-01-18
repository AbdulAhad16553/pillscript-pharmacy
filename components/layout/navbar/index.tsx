"use client";
import Container from "@/components/container";
import React, { useState } from "react";
import {
  Search,
  Users,
  Truck,
  MessageCircle,
  Menu,
  X,
  Globe,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/modules/home-module/compoents/login-dialog";
import LoginSheet from "@/modules/home-module/compoents/login-dialog/login-sheet";
import { MenuData } from "@/data";
import { usePathname } from "next/navigation";
import MainLogo from "@/components/logo";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200    ">
      <Container>
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="relative">
              <MainLogo />
            </div>
            <span className="text-sm md:text-lg font-bold ">
              Pharma <span className="text-blue-500">Force</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 lg:gap-4  ">
            {MenuData.map((item: any) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-[14px] rounded-lg  px-3.5 py-2.5  whitespace-nowrap font-normal text-secondary transition-colors duration-200 hover:bg-[#e8e8e8]/30 hover:text-primary "

                  // ${
                  //   isActive
                  //     ? "bg-secondary/50 text-primary"
                  //     : "text-gray-700 hover:text-blue-600"
                  // }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
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
          </div>

          {/* Mobile Menu Button */}
          {/* <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button> */}
        </div>

        {/* Mobile Navigation */}
        {/* {mobileNavOpen && (
            <div className="md: pb-4 space-y-2">
              <Link
                href="/"
                className="block text-blue-600 font-semibold py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#colleagues"
                className="block text-gray-700 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Find Colleagues
              </Link>
              <Link
                href="#distributors"
                className="block text-gray-700 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                Distributors
              </Link>
              <Link
                href="#whatsapp"
                className="block text-gray-700 py-2"
                onClick={() => setMobileNavOpen(false)}
              >
                WhatsApp Groups
              </Link>
              <div className="pt-4 space-y-2">
              
                  <LoginSheet />
                
             
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Signup
                  </Button>
                
              </div>
            </div>
          )} */}
      </Container>
    </nav>
  );
};

export default Navbar;
