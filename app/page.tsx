"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export default function LandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Globe className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                PillScript Pharmacy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              >
                Home
              </Link>
              <Link
                href="#colleagues"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Find Colleagues
              </Link>
              <Link
                href="#distributors"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Distributors
              </Link>
              <Link
                href="#whatsapp"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                WhatsApp Groups
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Signup
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
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
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileNavOpen && (
            <div className="md:hidden pb-4 space-y-2">
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
                <Link href="/login" onClick={() => setMobileNavOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileNavOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        {/* Network Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-1/4 w-16 h-16 bg-white rounded-full border-4 border-blue-200 shadow-lg"></div>
          <div className="absolute top-48 right-1/4 w-14 h-14 bg-white rounded-full border-4 border-blue-200 shadow-lg"></div>
          <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-white rounded-full border-4 border-blue-200 shadow-lg"></div>
          <div className="absolute top-1/2 right-1/3 w-18 h-18 bg-white rounded-full border-4 border-blue-200 shadow-lg"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Connecting Every Pharma Professional
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Connecting Every For Pharma Professional
            </p>

            {/* Search Interface */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
              <div className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search Company"
                    className="w-full h-14 text-lg pl-4 pr-12"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  type="text"
                  placeholder="Search Company"
                  className="h-12"
                />
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Area / City"
                    className="h-12 pr-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <Input
                  type="text"
                  placeholder="Manager Distributor"
                  className="h-12"
                />
              </div>
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
                SEARCH
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Build Your Pharma Circle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Contact Exchange
                </h3>
                <p className="text-gray-600">
                  Connect and exchange contacts with pharma professionals
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Distributor Info
                </h3>
                <p className="text-gray-600">
                  Access comprehensive distributor information
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Area Groups
                </h3>
                <p className="text-gray-600">
                  Join WhatsApp groups for your area
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PillScript Pharmacy. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
