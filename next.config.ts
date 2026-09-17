import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // Serve files from /public directly. Vercel's Image Optimization API
    // returns 402 on this project, which breaks all next/image components.
    unoptimized: true,
  },
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
