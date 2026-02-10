import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = "Portafolio-Clean-Code";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  basePath: isProd ? `/${repoName}` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
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

