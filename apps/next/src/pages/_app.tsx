import { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { Inter } from '@next/font/google'

// Components
import SEO from '~/components/SEO'
import BottomTabBar from '~/components/BottomTabBar'

// Contexts
import { GuideProvider } from '~/contexts/GuideContext'
import { BibleProvider } from '~/contexts/BibleContext'

// Types
import type { AppProps } from 'next/app'

// Styles
import '../styles/globals.css'

// react-modal-sheet not yet compatible with @next/font
// commented this code so if it compatibles, enable it again.
// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const queryClient = new QueryClient()

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta name="title" content="freedomlife — Alkitab &amp; Panduan Baca" />
      </Head>
      <Script
        async
        defer
        data-website-id="2eee9168-15ac-46de-814a-35725fc77c53"
        src="https://analytics.agallio.xyz/script.js"
      />
      <SEO />

      {/* <div className={`${inter.variable} font-sans`}> */}
      <QueryClientProvider client={queryClient}>
        <GuideProvider>
          <BibleProvider>
            <Toaster />
            <Component {...pageProps} />

            {router.pathname !== '/404' &&
              router.pathname !== '/persembahan' &&
              router.pathname !== '/learn' && <BottomTabBar />}
          </BibleProvider>
        </GuideProvider>
      </QueryClientProvider>
      {/* </div> */}
    </>
  )
}

export default MyApp
