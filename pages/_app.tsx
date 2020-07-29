import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import {
  CssBaseline,
  Fade,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/HomeRounded'
import BookIcon from '@material-ui/icons/BookRounded'

// Styling
import theme from '../src/theme'
import '../src/styles/index.scss'

// Redux Store
import configureStore from '../src/store'

// Google Tag Manager
import * as gtag from '../src/utils/gtag'

const store = configureStore()

const MyApp = (props: any) => {
  const { Component, pageProps } = props

  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')!
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  const navOnChange = (e: React.ChangeEvent<{}>, value: any) => {
    router.push(`${value}`)
  }

  return (
    <React.Fragment>
      <Head>
        <title>FreedomLife</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Fade in>
            {router.pathname === '/bible' ? (
              <Component {...pageProps} />
            ) : (
              <div className="jumbo-header">
                <div className="jumbo-header-overlay"></div>
                <Component {...pageProps} />
                {router.pathname !== '/privacy' && (
                  <BottomNavigation
                    showLabels
                    value={router.pathname}
                    onChange={navOnChange}
                    className="styled-bottom-nav"
                  >
                    <BottomNavigationAction
                      className="styled-bottom-nav-action"
                      label="Beranda"
                      value="/"
                      icon={<HomeIcon />}
                    ></BottomNavigationAction>
                    <BottomNavigationAction
                      className="styled-bottom-nav-action"
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
      </Provider>
    </React.Fragment>
  )
}

// Google Analytics (Page View)
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp
