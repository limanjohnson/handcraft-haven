import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // Allow images from Unsplash for product and artisan photos and products
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      }
    ],
    
  },

  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },

  // Suppress hydration warnings caused by browser extensions
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Tell webpack not to bundle these server-only packages for the client
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle pg and related packages on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }
    return config;
  },
};

export default nextConfig;
