/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Environment variables for client-side access
  env: {
    NEXT_PUBLIC_API_URL: 'https://gelbeseitanreplica-production.up.railway.app',
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Suppress third-party script errors in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Asset rewrites
  async rewrites() {
    return [
      {
        source: '/webgs/:path*',
        destination: '/assets/:path*',
      },
    ];
  },
  
  // Webpack config to handle legacy scripts
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Ensure path alias is properly resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    
    return config;
  },
}

module.exports = nextConfig
