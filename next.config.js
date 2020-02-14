require('dotenv').config();
const path = require('path');
const sitemap = require('nextjs-sitemap-generator');
sitemap({
  baseUrl: 'https://freedomlife.id/',
  pagesDirectory: `${__dirname}/pages`,
  targetDirectory: 'public/static/',
  ignoredPaths: ['api']
});

const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {} // We're never in "production server" phase when in development mode
    : !process.env.NOW_REGION
    ? require('next/constants') // Get values from `next` package when building locally
    : require('next-server/constants'); // Get values from `next-server` package when building on now v2

const nextConfig = {
  webpack(config) {
    config.resolve.alias['actions'] = path.join(__dirname, 'src', 'actions');
    config.resolve.alias['db'] = path.join(__dirname, 'src', 'db');
    config.resolve.alias['models'] = path.join(__dirname, 'src', 'models');
    config.resolve.alias['reducers'] = path.join(__dirname, 'src', 'reducers');
    config.resolve.alias['sagas'] = path.join(__dirname, 'src', 'sagas');
    config.resolve.alias['utils'] = path.join(__dirname, 'src', 'utils');
    config.resolve.alias['store'] = path.join(__dirname, 'src', 'store');
    config.resolve.alias['theme'] = path.join(__dirname, 'src', 'theme');
    config.resolve.alias['styles'] = path.join(__dirname, 'styles');
    return config;
  },
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
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
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withSass = require('@zeit/next-sass');
  const withOffline = require('next-offline');
  const withFonts = require('next-fonts');

  return withSass(withFonts(withOffline(nextConfig)));
};
