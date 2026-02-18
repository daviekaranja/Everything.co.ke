import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Matches any request starting with /api/
        source: "/api/:path*",
        // Points to your FastAPI backend
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000/api/v1/:path*"
            : "https://api.everything.co.ke/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
