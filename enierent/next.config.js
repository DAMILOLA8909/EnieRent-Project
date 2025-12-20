/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Keep your existing remotePatterns for security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      // Adding pannellum.org for virtual tour images
      {
        protocol: 'https',
        hostname: 'cdn.pannellum.org',
        pathname: '/**',
      },
      // Add pannellum.org main domain as well
      {
        protocol: 'https',
        hostname: 'pannellum.org',
        pathname: '/**',
      },
    ],
    // Adding image formats for optimization
    formats: ['image/avif', 'image/webp'],
    // Optional: Adding deviceSizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Enable experimental CSS optimization
  experimental: {
    optimizeCss: true,
  },
  // Although Optional: Adding other optimizations
  compress: true,
  // Optional: Remove X-Powered-By header for security
  poweredByHeader: false,
  // Optional: Add headers for security
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
}

module.exports = nextConfig