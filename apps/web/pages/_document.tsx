import React, { Children } from 'react'
import { AppRegistry } from 'react-native'
import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
} from 'next/document'

export default class Document extends NextDocument {
  // To prevent react-native-web & nativewind styling flashing on first load.
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const styles = [getStyleElement()]

    const initialProps = await NextDocument.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: Children.toArray(styles).map((style, index) =>
        React.isValidElement(style)
          ? React.cloneElement(style, { key: `style-${index}` })
          : style,
      ),
    }
  }

  render() {
    return (
      <Html lang="id" suppressHydrationWarning>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#673ab7" />
          <meta name="msapplication-TileColor" content="#673ab7" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#f9fafb"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#1f2937"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
