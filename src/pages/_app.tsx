// Core
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'

// 3rd Party Libs
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

// Context
import { GuideProvider } from '../store/Guide'

// Components
import SEO from '@/components/SEO'
import BottomTabBar from '@/components/BottomTabBar'

// Styles
import '@/styles/index.css'

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
          <ThemeProvider attribute="class">
            <Toaster />
            <Component {...pageProps} />
            {router.pathname !== '/404' &&
              router.pathname !== '/persembahan' &&
              router.pathname !== '/learn' && <BottomTabBar />}
          </ThemeProvider>
        </GuideProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
