import React from 'react'
import { NextPageContext } from 'next'

interface ErrorProps {
  statusCode: number | undefined
}

class Error extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextPageContext): ErrorProps {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  render() {
    return (
      <div>
        {this.props.statusCode ? (
          <div>
            <div className="header-title" style={{ marginTop: 110 }}>
              {this.props.statusCode}
            </div>
            <div className="header-subtitle">An error occurred on server</div>
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
    )
  }
}

export default Error