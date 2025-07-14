/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14

  // Enable experimental features for better SEO
  experimental: {
    optimizeCss: true,
  },

  // Optimize images for better performance (when not using static export)
  // images: {
  //   formats: ['image/webp', 'image/avif'],
  //   minimumCacheTTL: 60,
  // },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/feed.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/rss+xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Redirects for better SEO
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },

  // Compress output for better performance
  compress: true,

  // Uncomment these for static site generation:
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true,
  // },
};

module.exports = nextConfig;
