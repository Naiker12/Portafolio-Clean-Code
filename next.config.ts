import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Portafolio-Clean-Code",
  assetPrefix: "/Portafolio-Clean-Code",
  trailingSlash: true,
  // @ts-ignore
  turbopack: {
    root: "C:/Users/gomez/Downloads/portafolio",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
};



export default nextConfig;

