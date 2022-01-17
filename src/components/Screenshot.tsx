// Core
import { forwardRef } from 'react'

// Utils
import { bibleVersionName } from '@/utils/bible'

// Types
import type { HighlightedText } from '@/types/components'

const Screenshot = forwardRef<
  HTMLDivElement,
  {
    theme?: string
    passageTitle?: string
    bibleVersion: string
    highlightedText: HighlightedText[]
  }
>(({ theme, passageTitle, bibleVersion, highlightedText }, ref) => {
  const sortedHighlightedText = highlightedText.sort(
    (a, b) => a.verse - b.verse
  )

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: -10000,
        left: -10000,
        width: 1080,
        height: 1920,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
        zIndex: 999999,
      }}
    >
      <div
        style={{
          width: '88%',
          height: 'auto',
          backgroundColor: theme === 'dark' ? '#111827' : '#e5e7eb',
          borderRadius: 36,
          padding: 60,
          paddingBottom: 100,
        }}
      >
        {sortedHighlightedText.map((item, index) => (
          <p
            key={index}
            style={{
              fontSize: 44,
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              margin: 0,
              padding: 0,
              lineHeight: '180%',
              letterSpacing: 1.2,
            }}
          >
            <sup
              style={{
                top: -2,
                marginRight: 6,
                fontWeight: 300,
                color: theme === 'dark' ? '#6ee7b7' : '#047857',
              }}
            >
              {item.verse}
            </sup>{' '}
            {item.content}
          </p>
        ))}

        <p
          style={{
            fontSize: 44,
            fontWeight: 700,
            marginTop: 60,
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            letterSpacing: 1.2,
          }}
        >
          {passageTitle}
        </p>
        <p
          style={{
            fontSize: 40,
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            letterSpacing: 1,
          }}
        >
          {bibleVersionName[bibleVersion]}
        </p>

        <img
          src="/android-chrome-512x512.png"
          alt="FreedomLife Logo"
          width={90}
          height={90}
          style={{ float: 'right', marginTop: -90 }}
        />
      </div>
    </div>
  )
})

export default Screenshot
