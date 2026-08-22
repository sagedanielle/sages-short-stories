import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/sages-short-stories",
  assetPrefix: "/sages-short-stories/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;