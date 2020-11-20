const nextConfig = {
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
  const withPreact = require('next-plugin-preact')
  const withOffline = require('next-offline')

  return withPreact(withOffline(nextConfig))
}
