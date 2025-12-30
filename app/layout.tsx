import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NhostProvider from "@/provider/NhostProvider";
import ApolloProvider from "@/provider/ApolloProvider";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PillScript Pharmacy - Connecting Pharma Professionals",
  description: "Connect with pharma professionals, find distributors, and join area groups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NhostProvider>
          <ApolloProvider>
            <Toaster position="top-right" richColors />
            <Navbar />
            {children}
            <Footer />
          </ApolloProvider>
        </NhostProvider>
      </body>
    </html>
  );
}
