import React from 'react'
import Head from 'next/head'
import { NextPageContext } from 'next'

// Types
interface ErrorProps {
  statusCode: number | undefined
}

class Error extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextPageContext): ErrorProps {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  getSubtitle(code: string | number) {
    const codeToString = String(code)

    switch (codeToString) {
      case '404':
        return 'Page Not Found'
      default:
        return 'An error occured on server'
    }
  }

  render() {
    return (
      <>
        <Head>
          <title>Error | FreedomLife</title>
        </Head>
        <div>
          {this.props.statusCode ? (
            <div className="container">
              <div className="header-title" style={{ marginTop: 80 }}>
                {this.props.statusCode}
              </div>
              <div className="header-subtitle">
                {this.getSubtitle(this.props.statusCode)}
              </div>
            </div>
          ) : (
            <div>
              <div className="header-subtitle" style={{ marginTop: 110 }}>
                Error
              </div>
              <div className="header-subtitle">An error occurred on Client</div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Error
