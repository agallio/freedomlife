import { NextPage } from 'next'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

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

const queryClient = new QueryClient()

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta name="title" content="FreedomLife — Alkitab &amp; Panduan Baca" />
      </Head>
      <SEO />

      <QueryClientProvider client={queryClient}>
        <GuideProvider>
          <BibleProvider>
            <ThemeProvider attribute="class">
              <Toaster />
              <Component {...pageProps} />

              {router.pathname !== '/404' &&
                router.pathname !== '/persembahan' &&
                router.pathname !== '/learn' && <BottomTabBar />}
            </ThemeProvider>
          </BibleProvider>
        </GuideProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
