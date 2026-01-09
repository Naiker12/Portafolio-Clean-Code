import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  turbopack: {
    root: "C:/Users/gomez/Downloads/portafolio",
  },
  images: {
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

