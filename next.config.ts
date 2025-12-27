import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.nhost.run",
        port: "",
        pathname: "/v1/files/**",
      },
      {
        protocol: "https",
        hostname: "lfgwnrkyoofwbvejrpqm.storage.eu-central-1.nhost.run",
        port: "",
        pathname: "/v1/files/**",
      },
    ],
  },
};

export default nextConfig;
