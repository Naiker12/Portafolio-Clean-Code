import type { NextConfig } from "next";
import { basePath } from "./lib/assets";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
