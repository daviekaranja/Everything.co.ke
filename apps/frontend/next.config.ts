import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Matches any request starting with /api/
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`, // Proxy to Backend API
      },
    ];
  },
};

export default nextConfig;
