import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'

// Redux
import { ContentData } from '../../reducers'

// Components
import BibleLoading from './BibleLoading'

// Types
import { HighlightedText } from '../../../pages/bible'

interface BibleTypographyProps {
  isFetching: boolean
  passageArray: ContentData[]
  highlightedText: HighlightedText[]
  setHighlighted: React.Dispatch<React.SetStateAction<boolean>>
  setHighlightedText: React.Dispatch<React.SetStateAction<HighlightedText[]>>
}

const BibleTypography = ({
  isFetching,
  passageArray,
  highlightedText,
  setHighlighted,
  setHighlightedText,
}: BibleTypographyProps) => {
  // Component Lifecycle
  useEffect(() => {
    if (highlightedText.length === 0) {
      setHighlighted(false)
    }
  }, [highlightedText])

  // Component Methods
  const highlightText = (verse: number, content: string) => {
    if (highlightedText.find((item) => item.verse === verse)) {
      setHighlightedText(highlightedText.filter((item) => item.verse !== verse))
    } else {
      setHighlighted(true)
      setHighlightedText([...highlightedText, { verse, content }])
    }
  }

  return (
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
              <Typography
                key={index}
                className="regular-text bible-verse"
                onClick={() => highlightText(item.verse, item.content)}
              >
                <sup className="bible-verse-sup">{item.verse || ''}</sup>{' '}
                <span
                  style={{
                    textDecoration: highlightedText.find(
                      (hl) => hl.verse === item.verse
                    )
                      ? 'underline'
                      : '',
                  }}
                >
                  {item.content || ''}
                </span>
              </Typography>
            )
          }
        })
      )}
    </div>
  )
}

export default BibleTypography
