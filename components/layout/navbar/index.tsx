'use client'
import Container from '@/components/container'
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button';

const Navbar = () => {
      const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <Container>
          <div className="flex justify-between items-center h-20">
    
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
        </Container>
      </nav>
  )
}

export default Navbar