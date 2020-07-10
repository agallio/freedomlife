import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent } from '@material-ui/core'

// Redux
import { RootState } from '../../reducers'

// Components
import GuideLoading from './GuideLoading'
import GuideItem from './GuideItem'

const GuideList = (): JSX.Element => {
  // Redux Store
  const guide = useSelector((state: RootState) => state.guide)

  // Redux Deconstructor
  const { isFetching, guideByMonth } = guide

  return (
    <div className="container-fluid" style={{ paddingBottom: 55 }}>
      <Card className="styled-fluid-card">
        <CardContent
          style={{
            padding: '16px 10%',
            height: isFetching ? '80vh' : '',
          }}
        >
          {isFetching
            ? [1, 2, 3, 4, 5, 6].map((item) => (
                <GuideLoading key={item} item={item} />
              ))
            : guideByMonth.map((item, index) => (
                <GuideItem key={index} index={index} item={item} />
              ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default GuideList
