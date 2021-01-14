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

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>FreedomLife</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="FreedomLife, Aplikasi Panduan Baca Alkitab Setahun."
        />
      </Head>
      <SEO />

      <StateProvider>
        <ThemeProvider attribute="class">
          <AnimateSharedLayout type="crossfade">
            <Toaster />
            <Component {...pageProps} />
            <BottomTabBar />
          </AnimateSharedLayout>
        </ThemeProvider>
      </StateProvider>
    </>
  )
}

export default MyApp
