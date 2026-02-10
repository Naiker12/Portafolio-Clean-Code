import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  // basePath: "/Portafolio-Clean-Code",
  trailingSlash: true,
  images: {
    // unoptimized: true, // Commented out to enable Next.js Image Optimization
  },
  // @ts-ignore
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // turbopack: {
    //   root: process.cwd(),
    // },
  },
};



export default nextConfig;

