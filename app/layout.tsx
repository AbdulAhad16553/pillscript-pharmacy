import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NhostProvider from "@/provider/NhostProvider";
import ApolloProvider from "@/provider/ApolloProvider";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const outfit = Outfit({ subsets:['latin'] });


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
        className={outfit.className}
      >
        <NhostProvider>
          <ApolloProvider>
            <Toaster position="top-right" richColors />
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
          </ApolloProvider>
        </NhostProvider>
      </body>
    </html>
  );
}
