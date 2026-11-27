import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components would reject `dynamic = "force-dynamic"`. Pipeline pages
  // opt into dynamic rendering instead, so `next build` does not query Supabase.
  // The dev server is bound on 0.0.0.0 and opened at 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
