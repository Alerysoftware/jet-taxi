import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Image optimization'ı aktif et
    formats: ['image/webp', 'image/avif'], // Modern format desteği
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Image sizes
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 gün cache
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'], // Bundle optimization
  },
  // Compression
  compress: true,
  // Powered by header'ı kaldır
  poweredByHeader: false,
  // Strict mode
  reactStrictMode: true,
  // Swc minify
  swcMinify: true,
}

// PWA ile export et
export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})(nextConfig)
