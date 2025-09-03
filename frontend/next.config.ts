import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    PAYPAL_DEBUG: 'false'
  }
};

export default nextConfig;
