import { useEffect } from 'react'
import Head from 'next/head'
import {
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
  Fade,
  ThemeProvider,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/HomeRounded'
import BookIcon from '@material-ui/icons/BookRounded'

// Store
import StateProvider from '../src/store'

// Types
import type { AppProps } from 'next/app'

// Styles
import theme from '../src/theme'
import '../src/styles/index.scss'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const navOnChange = (e: React.ChangeEvent<unknown>, value: any) => {
    router.push(`${value}`)
  }

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
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="description"
          content="FreedomLife, Aplikasi Panduan Baca Alkitab Setahun."
        />
      </Head>
      <StateProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Fade in>
            {router.pathname === '/bible' ||
            router.pathname === '/_error' ||
            router.pathname === '/maintenance' ? (
              <Component {...pageProps} />
            ) : (
              <div className="header">
                <div className="header__overlay" />
                <Component {...pageProps} />
                {router.pathname !== '/persembahan' && (
                  <BottomNavigation
                    showLabels
                    value={router.pathname}
                    onChange={navOnChange}
                    className="bottomnav"
                  >
                    <BottomNavigationAction
                      className="bottomnav__action"
                      label="Beranda"
                      value="/"
                      icon={<HomeIcon />}
                    ></BottomNavigationAction>
                    <BottomNavigationAction
                      className="bottomnav__action"
                      label="Panduan"
                      value="/guide"
                      icon={<BookIcon />}
                    ></BottomNavigationAction>
                  </BottomNavigation>
                )}
              </div>
            )}
          </Fade>
        </ThemeProvider>
      </StateProvider>
    </>
  )
}

export default MyApp
