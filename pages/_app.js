import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { ThemeProvider } from '@material-ui/styles';
import {
  CssBaseline,
  Fade,
  BottomNavigation,
  BottomNavigationAction
  // useMediaQuery
} from '@material-ui/core';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import HomeIcon from '@material-ui/icons/HomeRounded';
import BookIcon from '@material-ui/icons/BookRounded';
import WartaIcon from '@material-ui/icons/LocalLibraryRounded';
import theme from 'theme';
import * as gtag from 'utils/gtag';

// Import SCSS
import 'styles/index.scss';

// Redux Store
import configureStore from 'store';

const store = configureStore();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pathname: ctx.pathname, pageProps, maintenance: false };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  navOnChange = (e, value) => {
    Router.push(`${value}`);
  };

  render() {
    const { Component, pageProps, maintenance } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>FreedomLife</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <Provider store={store}>
          {/* TODO: Research a better way using this redux-persist one */}
          {/* <PersistGate persistor={store.__PERSISTOR} loading={null}> */}
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Fade in>
              {maintenance ? (
                <div className="jumbo-header">
                  <div className="jumbo-header-overlay"></div>
                  <div className="container" style={{ paddingBottom: 90 }}>
                    <h2 className="header-title" style={{ marginTop: 70 }}>
                      Freedom Life
                    </h2>
                    <p className="header-subtitle">Under Maintenance</p>
                  </div>
                </div>
              ) : this.props.pathname === '/bible' ||
                this.props.pathname === '/sitemap.xml' ? (
                <Component {...pageProps} />
              ) : (
                <div className="jumbo-header">
                  <div className="jumbo-header-overlay"></div>
                  <Component {...pageProps} />
                  <BottomNavigation
                    showLabels
                    value={this.props.pathname}
                    onChange={this.navOnChange}
                    className="styled-bottom-nav"
                  >
                    <BottomNavigationAction
                      className="styled-bottom-nav-action"
                      label="Warta"
                      value="/warta"
                      icon={<WartaIcon />}
                    ></BottomNavigationAction>
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
                </div>
              )}
            </Fade>
          </ThemeProvider>
          {/* </PersistGate> */}
        </Provider>
      </React.Fragment>
    );
  }
}

// Google Analytics (Page View)
Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default withRedux(configureStore)(MyApp);
