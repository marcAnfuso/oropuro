import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Comentado para permitir API routes (server-side)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
