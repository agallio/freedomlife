import '../styles/global.css'

import { type AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { DefaultSeo } from 'next-seo'

// Contexts
import QueryProvider from '@repo/app/providers/react-query'
import ReadProviders from '@repo/app/features/read/contexts'

// Lazy-load Components
const BottomTab = dynamic(() => import('@repo/app/components/bottom-tab'), {
  ssr: false,
})
const ToasterContainer = dynamic(
  () => import('@repo/app/components/toaster-container.web'),
  { ssr: false },
)

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

const SeoConfig = {
  title: 'freedomlife — Alkitab & Panduan Baca',
  description:
    'freedomlife adalah aplikasi Alkitab dengan panduan baca. Anda dapat melihat panduan baca untuk hari ini dan hari-hari lain dalam bulan yang sama. Anda juga dapat langsung membaca Alkitab dari aplikasi ini sesuai panduan baca yang ada.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://freedomlife.id',
    title: 'freedomlife — Alkitab & Panduan Baca',
    description:
      'freedomlife adalah aplikasi Alkitab dengan panduan baca. Anda dapat melihat panduan baca untuk hari ini dan hari-hari lain dalam bulan yang sama. Anda juga dapat langsung membaca Alkitab dari aplikasi ini sesuai panduan baca yang ada.',
    site_name: 'freedomlife',
    images: [
      {
        url: 'https://freedomlife.id/images/og-index.png',
        alt: `Tulisan dan logo 'freedomlife'`,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
}

function SEO() {
  return <DefaultSeo {...SeoConfig} />
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>freedomlife - Alkitab & Panduan Baca</title>
      </Head>

      <SEO />

      {/* Declare font globally */}
      <style jsx global>{`
        :root {
          --font-inter: ${interFont.style.fontFamily};
        }
      `}</style>

      <QueryProvider>
        <ReadProviders router={router}>
          <main className="antialiased">
            <Component {...pageProps} />

            {router.pathname !== '/404' &&
              router.pathname !== '/_error' &&
              router.pathname !== '/learn' &&
              router.pathname !== '/persembahan' && (
                <BottomTab
                  pathname={
                    router.pathname.includes('read') ? '/read' : router.pathname
                  }
                />
              )}
          </main>

          <ToasterContainer />
        </ReadProviders>
      </QueryProvider>
    </>
  )
}
