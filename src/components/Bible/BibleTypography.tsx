import { useEffect } from 'react'
import { Typography } from '@material-ui/core'

// Components
import BibleLoading from './BibleLoading'

// Types
import type { BibleTypographyProps } from '../../types'

const BibleTypography: React.FC<BibleTypographyProps> = ({
  data,
  passageArray,
  highlightedText,
  setHighlighted,
  setHighlightedText,
}) => {
  useEffect(() => {
    if (highlightedText.length === 0) {
      setHighlighted(false)
    }
  }, [highlightedText])

  const highlightText = (verse: number, content: string) => {
    if (highlightedText.find((item) => item.verse === verse)) {
      setHighlightedText(highlightedText.filter((item) => item.verse !== verse))
    } else {
      setHighlighted(true)
      setHighlightedText([...highlightedText, { verse, content }])
    }
  }

  return (
    <div className={`bible__verse${!data ? '--loading' : ''}`}>
      {!data ? (
        <BibleLoading />
      ) : (
        passageArray.map((item, index) => {
          if (item.type === 'title') {
            return (
              <Typography
                key={index}
                className="bible__text__title"
                variant="h5"
              >
                {item.content || ''}
              </Typography>
            )
          } else {
            return (
              <Typography
                key={index}
                className="bible__text__verse"
                onClick={() => highlightText(item.verse, item.content)}
              >
                <sup className="bible__text__verse__sup">
                  {item.verse || ''}
                </sup>{' '}
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
