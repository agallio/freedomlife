import React from 'react'
import { Typography } from '@material-ui/core'

// Redux
import { ContentData } from '../../reducers'

// Components
import BibleLoading from './BibleLoading'

interface BibleTypographyProps {
  isFetching: boolean
  passageArray: ContentData[]
}

const BibleTypography = ({
  isFetching,
  passageArray,
}: BibleTypographyProps) => (
  <div className={isFetching ? 'bible-passage-loading' : 'bible-passage'}>
    {isFetching ? (
      <BibleLoading />
    ) : (
      passageArray.map((item, index) => {
        if (item.type === 'title') {
          return (
            <Typography
              key={index}
              className="bold-text bible-title"
              variant="h5"
            >
              {item.content || ''}
            </Typography>
          )
        } else {
          return (
            <Typography key={index} className="regular-text bible-verse">
              <sup className="bible-verse-sup">{item.verse || ''}</sup>{' '}
              {item.content || ''}
            </Typography>
          )
        }
      })
    )}
  </div>
)

export default BibleTypography
