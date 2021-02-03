const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const pages = await globby([
    'src/pages/*.tsx',
    '!src/pages/persembahan.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('src', '')
                  .replace('/', '')
                  .replace('pages', '')
                  .replace('.tsx', '')
                const route = path === '/index' ? '' : path

                return `
                        <url>
                            <loc>${`https://freedomlife.id${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
