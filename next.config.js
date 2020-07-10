require('dotenv').config()

const nextConfig = {
  env: {
    DB_FL_URI: process.env.DB_FL_URI,
    DB_BIBLE_URI: process.env.DB_BIBLE_URI,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest),
  generateInDevMode: true,
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
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

module.exports = () => {
  const withOffline = require('next-offline')
  const withFonts = require('next-fonts')

  return withFonts(withOffline(nextConfig))
}
