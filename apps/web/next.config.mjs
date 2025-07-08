import { withExpo } from '@expo/next-adapter'
import createMDX from '@next/mdx'

// Rehype Plugins
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// Next.js Plugins
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
    'expo-linear-gradient',
  ],

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
      test: /\.(js|jsx)$/,
      include: [/node_modules\/@react-native-segmented-control/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-flow', { all: true }], 'next/babel'],
          cacheDirectory: true,
        },
      },
    })

    return config
  },
}

export default withMDX(withExpo(nextConfig))
