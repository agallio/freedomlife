require('dotenv').config()

const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants') // Get values from `next-server` package when building on now v2

const nextConfig = {
  env: {
    DB_FL_URI: process.env.DB_FL_URI,
    DB_BIBLE_URI: process.env.DB_BIBLE_URI,
    DB_FL_URI_2020: process.env.DB_FL_URI_2020,
  },
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest),
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {}
  }

  const withOffline = require('next-offline')
  const withFonts = require('next-fonts')

  return withFonts(withOffline(nextConfig))
}
