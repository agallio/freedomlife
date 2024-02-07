import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'
import { NextSeo } from 'next-seo'
import clsx from 'clsx'

// Components
import BibleNavbar from '~/components/Bible/BibleNavbar'
import PageTransition from '~/components/PageTransition'
import BibleTypography from '~/components/Bible/BibleTypography'
import BibleNavigator from '~/components/Bible/BibleNavigator'
const BibleTranslateDialog = dynamic(
  () => import('~/components/Bible/BibleTranslateDialog'),
)
const BiblePassageDialog = dynamic(
  () => import('~/components/Bible/BiblePassageDialog'),
)
const BibleSettingDialog = dynamic(
  () => import('~/components/Bible/BibleSettingDialog'),
)

// Utils
import { copyText } from '~/utils/bible'
import { bibleList, scrollToTop } from '~/utils/constants'
import { useBibleByPassage } from '~/utils/hooks/useFetchedBible'
import useLocalStorage from '~/utils/hooks/useLocalStorage'
import { checkTheme } from '~/utils/hooks/useDynamicTheme'

// Contexts
import { useBible } from '~/contexts/BibleContext'

export default function ReadIndividualChapter() {
  const router = useRouter()

  const chapterQuery = router.query.chapter as string

  useEffect(() => {
    if (router.isReady) {
      if (!chapterQuery) {
        router.push(`${router.pathname}?chapter=kej-1`)
      }
    }
  }, [router.isReady, chapterQuery])

  return chapterQuery ? (
    <ReadIndividualChapterComponent chapterQuery={chapterQuery.toLowerCase()} />
  ) : (
    <div>
      <header
        className={clsx(
          'fixed left-0 top-0 z-40 h-12 w-full border-b border-gray-100 bg-white bg-opacity-60 dark:border-gray-800 dark:bg-gray-700 dark:bg-opacity-70 sm:h-14',
        )}
        style={{
          backdropFilter: 'saturate(180%) blur(12px)',
          WebkitBackdropFilter: 'saturate(180%) blur(12px)',
        }}
      />
    </div>
  )
}

function ReadIndividualChapterComponent({
  chapterQuery,
}: {
  chapterQuery: string
}) {
  const router = useRouter()
  const theme = checkTheme()
  const abbrQuery = chapterQuery?.split('-')[0] || ''
  const chapterNumberQuery = chapterQuery?.split('-')[1] || ''
  const isChapterQueryValid = bibleList.map((i) => i.abbr).includes(abbrQuery)

  // Refs
  const bibleTypographyRef = useRef<HTMLDivElement>(null)

  // Contexts
  const {
    openTranslate,
    setOpenTranslate,
    openPassage,
    setOpenPassage,
    openSetting,
    setOpenSetting,
    highlighted,
    setHighlighted,
    highlightedText,
    setHighlightedText,
    bibleVersion,
    setBibleVersion,
    maintenance,
    setMaintenance,
  } = useBible()

  // Local Storage States
  const [verseFontSize, setVerseFontSize] = useLocalStorage(
    'verse_font_size',
    'base',
  )

  // Memoized Value
  const bibleDetail = useMemo(() => {
    return bibleList.find((item) => item.abbr === abbrQuery)
  }, [abbrQuery])

  // Queries
  const { data, error, isLoading } = useBibleByPassage(
    bibleVersion,
    chapterQuery,
    isChapterQueryValid,
  )

  // Methods
  const passageTitle = (): string => {
    if (!isChapterQueryValid) return 'Tidak Valid'
    if (!data) return 'Memuat'

    const passageName = bibleDetail?.name || 'Kejadian'
    const passageChapterNumber = chapterNumberQuery || '1'

    return `${passageName} ${passageChapterNumber}`
  }

  const handleOpenPassage = () => {
    if (data) {
      document.body.style.overflow = 'hidden'
      setOpenPassage(true)
    }
  }

  const nextPassage = () => {
    if (chapterQuery !== 'why-22') {
      const nowChapter = Number(chapterNumberQuery)

      const chapterIndex = bibleList.findIndex(
        (item) => item.abbr === abbrQuery,
      )
      const maxChapter = bibleList.find((item) => item.abbr === abbrQuery)
        ?.passage

      if (nowChapter !== maxChapter) {
        localStorage.setItem('last_chapter', `${abbrQuery}-${nowChapter + 1}`)
        router.push(`/read/bible?chapter=${abbrQuery}-${nowChapter + 1}`)
      } else {
        const nextChapter = bibleList[chapterIndex + 1]!
        localStorage.setItem('last_chapter', `${nextChapter.abbr}-1`)
        router.push(`/read/bible?chapter=${nextChapter.abbr}-1`)
      }
    }
  }

  const backPassage = () => {
    if (chapterQuery !== 'kej-1') {
      const nowChapter = Number(chapterNumberQuery)

      const chapterIndex = bibleList.findIndex(
        (item) => item.abbr === abbrQuery,
      )
      const minChapter = 1

      if (nowChapter !== minChapter) {
        localStorage.setItem('last_chapter', `${abbrQuery}-${nowChapter - 1}`)
        router.push(`/read/bible?chapter=${abbrQuery}-${nowChapter - 1}`)
        scrollToTop()
      } else {
        const prevChapter = bibleList[chapterIndex - 1]!
        const prevChapterLastPassage = prevChapter.passage
        localStorage.setItem(
          'last_chapter',
          `${prevChapter.abbr}-${prevChapterLastPassage}`,
        )
        router.push(
          `/read/bible?chapter=${prevChapter.abbr}-${prevChapterLastPassage}`,
        )
        scrollToTop()
      }
    }
  }

  const changeChapter = (passageChapter: string) => {
    const [passage, chapter] = passageChapter.split('-')

    document.body.style.overflow = 'visible'
    setOpenPassage(false)
    localStorage.setItem('last_chapter', passageChapter)
    router.push(`/read/bible?chapter=${passage}-${chapter}`)
    scrollToTop()
  }

  const changeVersion = (version: string) => {
    document.body.style.overflow = 'visible'
    setBibleVersion(version)
    setOpenTranslate(false)
    scrollToTop()
  }

  const highlightText = (verse: number, content: string) => {
    if (highlightedText.find((item) => item.verse === verse)) {
      setHighlightedText(highlightedText.filter((item) => item.verse !== verse))
    } else {
      setHighlighted(true)
      setHighlightedText([...highlightedText, { verse, content }])
    }
  }

  const removeHighlight = () => {
    setHighlighted(false)
    setHighlightedText([])
  }

  // Lifecycles —— Side Effects
  useEffect(() => {
    if (error) {
      console.error(error)
      setMaintenance(true)
    }
  }, [error])

  useEffect(() => {
    if (highlightedText.length === 0) {
      setHighlighted(false)
    }
  }, [highlightedText])

  return (
    <>
      <Head>
        <title>
          {bibleDetail
            ? `${bibleDetail.name} ${chapterNumberQuery} — freedomlife`
            : 'freedomlife'}
        </title>
      </Head>
      <NextSeo noindex />

      <BibleNavbar
        inGuide={false}
        highlighted={highlighted}
        highlightedText={highlightedText}
        bibleVersion={bibleVersion}
        passageTitle={passageTitle}
        handleOpenTranslate={() => {
          if (data) {
            document.body.style.overflow = 'hidden'
            setOpenTranslate(true)
          }
        }}
        handleOpenPassage={handleOpenPassage}
        handleOpenSetting={() => {
          if (data) {
            document.body.style.overflow = 'hidden'
            setOpenSetting(true)
          }
        }}
        removeHighlight={removeHighlight}
        copyText={() =>
          copyText(highlightedText, {
            theme,
            bibleVersion,
            passageTitle: passageTitle(),
            removeHighlight,
          })
        }
      />

      <PageTransition>
        <BibleTypography
          bibleTypographyRef={bibleTypographyRef}
          inGuide={false}
          isChapterQueryValid={isChapterQueryValid}
          maintenance={maintenance}
          verseFontSize={verseFontSize}
          highlightedText={highlightedText}
          bibleByPassageData={data}
          isBibleByPassageLoading={isLoading}
          highlightText={highlightText}
        />
      </PageTransition>

      {isChapterQueryValid && (
        <BibleNavigator
          // chevronRef={chevronRef}
          inGuide={false}
          biblePassage={chapterQuery}
          isBibleByPassageLoading={isLoading}
          backPassage={backPassage}
          nextPassage={nextPassage}
        />
      )}

      <BibleTranslateDialog
        inGuide={false}
        openTranslate={openTranslate}
        bibleVersion={bibleVersion}
        handleCloseTranslate={() => {
          document.body.style.overflow = 'visible'
          setOpenTranslate(false)
        }}
        changeVersion={changeVersion}
      />

      <BiblePassageDialog
        inGuide={false}
        openPassage={openPassage}
        changeChapter={changeChapter}
        handleClosePassage={() => {
          document.body.style.overflow = 'visible'
          setOpenPassage(false)
        }}
      />

      <BibleSettingDialog
        openSetting={openSetting}
        verseFontSize={verseFontSize}
        setVerseFontSize={setVerseFontSize}
        handleCloseSetting={() => {
          document.body.style.overflow = 'visible'
          setOpenSetting(false)
        }}
      />
    </>
  )
}
