import React from 'react'
import { Card, CardContent } from '@material-ui/core'

const Privacy = ({ children }: { children: JSX.Element }): JSX.Element => (
  <div className="container-fluid">
    <Card className="styled-fluid-card">
      <CardContent
        className="privacy"
        style={{
          padding: '16px 10%',
        }}
      >
        {children}
      </CardContent>
    </Card>
  </div>
)

export default Privacy
