import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "7qvm95rknv.ufs.sh",
      "uploadthing.com"
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
