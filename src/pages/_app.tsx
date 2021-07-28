import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

import StateProvider from '../store'

import SEO from '@/components/SEO'
import BottomTabBar from '@/components/BottomTabBar'

import '@/styles/index.css'
import 'react-spring-bottom-sheet/dist/style.css'

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta name="title" content="FreedomLife — Alkitab &amp; Panduan Baca" />
      </Head>
      <SEO />

      <StateProvider>
        <ThemeProvider attribute="class">
          <AnimateSharedLayout type="crossfade">
            <Toaster />
            <Component {...pageProps} />
            {router.pathname !== '/persembahan' &&
              router.pathname !== '/learn' && <BottomTabBar />}
          </AnimateSharedLayout>
        </ThemeProvider>
      </StateProvider>
    </>
  )
}

export default MyApp
