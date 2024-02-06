import { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { createPortal } from 'react-dom'
import { Toaster } from 'react-hot-toast'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
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
import { BibleLocalDatabaseProvider } from '~/contexts/BibleLocalDatabaseContext'
import { useEffect, useState } from 'react'

// react-modal-sheet not yet compatible with @next/font
// commented this code so if it compatibles, enable it again.
// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta) {
        console.log(query.meta?.errorMessage, error)
        return
      }

      console.log(error)
    },
  }),
})

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta name="title" content="freedomlife — Alkitab &amp; Panduan Baca" />
      </Head>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          defer
          data-website-id="2eee9168-15ac-46de-814a-35725fc77c53"
          src="https://analytics.agallio.xyz/script.js"
        />
      )}
      <SEO />

      {/* <div className={`${inter.variable} font-sans`}> */}
      <QueryClientProvider client={queryClient}>
        <GuideProvider>
          <BibleProvider>
            <BibleLocalDatabaseProvider>
              <ToasterContainer />
              <Component {...pageProps} />

              {router.pathname !== '/404' &&
                router.pathname !== '/persembahan' &&
                router.pathname !== '/learn' && <BottomTabBar />}
            </BibleLocalDatabaseProvider>
          </BibleProvider>
        </GuideProvider>
      </QueryClientProvider>
      {/* </div> */}
    </>
  )
}

function ToasterContainer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? createPortal(<Toaster />, document.body) : undefined
}

export default MyApp
