import { withExpo } from '@expo/next-adapter'
import createMDX from '@next/mdx'
import createNextPWA from 'next-pwa'

// Rehype Plugins
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Next.js Plugins
const withPWA = createNextPWA({
  dest: 'public',
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
  buildExcludes: [
    /chunks\/images\/.*$/, // Don't precache files under .next/static/chunks/images this improves next-optimized-images behaviour
    /chunks\/pages\/api\/.*/, // Don't cache the API it needs fresh serverinfo
  ],
  exclude: [
    /\.map$/, // Don't cache map files
    /^.*ts.*$/, // Don't let serviceworker touch the TS streams
    /-manifest.json$/, // Exclude those pesky json files in _next root but still serve the ones we need from /_next/static
    /-manifest.js$/, // Exclude Next.js middleware manifest
  ],
  reloadOnOnline: false, // Prevents reloads on offline/online switch
})

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
})

// Security
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.posthog.com;
  child-src *.googletagmanager.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com *.freedomlife.id *.posthog.com;
  worker-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  transpilePackages: [
    '@repo/app',
    'burnt',
    'moti',
    'nativewind',
    'react-native',
    'react-native-svg',
    'react-native-heroicons',
    'react-native-reanimated',
    'react-native-css-interop',
    '@react-native-segmented-control/segmented-control',
    'expo-linear-gradient',
    'solito',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // PostHog
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ]
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  webpack: (config) => {
    // Handle @react-native-segmented-control/segmented-control in Next.js.
    // They write using flow but the devs don't strip the flow types yet, so it's broken in Next.js
    config.module.rules.push({
      test: /\.jsx?$/,
      use: ['remove-flow-types-loader'],
    })
    return config
  },
}

export default withExpo(withPWA(withMDX(nextConfig)))
