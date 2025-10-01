import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yfgavwinbjynrnsdvoci.supabase.co",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
