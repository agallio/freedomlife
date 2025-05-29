import '../styles/global.css'

import { useEffect } from 'react'
import { type AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { DefaultSeo } from 'next-seo'
import posthog from 'posthog-js'

// Contexts
import PostHogProviderWeb from '../providers/posthog.provider.web'
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
  const nextRouter = useRouter()

  // Effects
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: '/ingest',
      capture_pageview: 'history_change',

      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })
  }, [])

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

      <PostHogProviderWeb client={posthog}>
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
                      router.pathname.includes('read')
                        ? '/read'
                        : router.pathname
                    }
                    webRouterPush={nextRouter.push}
                  />
                )}
            </main>

            <ToasterContainer />
          </ReadProviders>
        </QueryProvider>
      </PostHogProviderWeb>
    </>
  )
}
