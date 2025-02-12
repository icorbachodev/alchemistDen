import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.thecocktaildb.com'],
    unoptimized: true,
  },
};

export default nextConfig;
