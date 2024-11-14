/** @type {import('next').NextConfig} */

// http://localhost:5001/uploads\thumbnail-1730617594375-907275613.png
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "172.188.116.118",
        port: "5001",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "osaw.in",
        port: "",
        pathname: "/v1/uploads/**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
