import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ['www.thecocktaildb.com'],
    unoptimized: true,
  },
  output: "standalone",
}

export default nextConfig
