require('dotenv').config()

const nextConfig = {
  env: {
    DB_FL_URI: process.env.DB_FL_URI,
    DB_BIBLE_URI: process.env.DB_BIBLE_URI,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest),
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : 'static/service-worker.js',
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
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ]
  },
}

module.exports = () => {
  const withOffline = require('next-offline')
  const withFonts = require('next-fonts')

  return withFonts(withOffline(nextConfig))
}
