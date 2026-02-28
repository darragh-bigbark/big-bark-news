import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bbnm.ie",
      },
    ],
  },
};

export default nextConfig;
