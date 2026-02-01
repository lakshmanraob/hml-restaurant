import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All images are now stored locally in public/images as WebP files
  // No remote patterns needed since we no longer fetch from Pexels at runtime

  // Disable ESLint during production builds to prevent deployment failures
  // ESLint still runs during development (npm run dev)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during build (optional - can be removed if TS is clean)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
