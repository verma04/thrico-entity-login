import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: 'standalone',
  typescript: {
    
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/account',
        destination: '/my-accounts',
        permanent: false,
      },
      {
        source: '/accounts',
        destination: '/my-accounts',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
