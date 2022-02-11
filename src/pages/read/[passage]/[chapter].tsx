// Core
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'

// 3rd Party Libs
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'

// Components
import BibleNavbar from '~/components/Bible/BibleNavbar'
import PageTransition from '~/components/PageTransition'

// Utils
import { copyText } from '~/utils/bible'

// Utils —— Constants
import { bibleList, scrollToTop } from '~/utils/constants'

// Utils —— Hooks
import { useBibleByPassage } from '~/utils/hooks/useFetchedBible'
import useLocalStorage from '~/utils/hooks/useLocalStorage'

// Contexts
import { useBible } from '~/store/Bible'
import BibleTypography from '~/components/Bible/BibleTypography'
import BibleNavigator from '~/components/Bible/BibleNavigator'
import BibleTranslateDialog from '~/components/Bible/BibleTranslateDialog'
import BiblePassageDialog from '~/components/Bible/BiblePassageDialog'
import BibleSettingDialog from '~/components/Bible/BibleSettingDialog'

export default function ReadIndividualChapter() {
  // Core Configs
  const router = useRouter()
  const { resolvedTheme: theme } = useTheme()
  const { passage, chapter } = router.query

  // Contexts
  const {
    bibleState: {
      openTranslate,
      openPassage,
      openSetting,
      highlighted,
      highlightedText,
      bibleVersion,
      maintenance,
    },
    bibleDispatch,
  } = useBible()

  // Local Storage States
  const [verseFontSize, setVerseFontSize] = useLocalStorage(
    'verse_font_size',
    'base'
  )

  // Memoized Values
  const biblePassage = useMemo(() => `${passage}-${chapter}`, [router.query])
  const bibleDetail = useMemo(() => {
    return bibleList.find((item) => item.abbr === passage)
  }, [router.query])

  // Refs
  const bibleTypographyRef = useRef<HTMLDivElement>(null)

  // Queries
  const { data, error, isLoading, refetch } = useBibleByPassage(
    bibleVersion,
    biblePassage
  )

  // Methods
  const passageTitle = (): string | undefined => {
    if (!data) return 'Memuat'

    return bibleList.find((item) =>
      item.abbr === biblePassage ? biblePassage.split('-')[0] : 'kej-1'
    )
      ? `${
          bibleList.find(
            (item) =>
              item.abbr === (biblePassage ? biblePassage.split('-')[0] : 'kej')
          )?.name
        } ${biblePassage ? biblePassage.split('-')[1] : '1'}`
      : ''
  }

  const handleOpenPassage = () => {
    if (data) {
      document.body.style.overflow = 'hidden'
      bibleDispatch({ type: 'SET_OPEN_PASSAGE', data: true })
    }
  }

  const nextPassage = () => {
    if (biblePassage !== 'why-22') {
      const chapterIndex = bibleList.findIndex(
        (item) => item.abbr === biblePassage.split('-')[0]
      )
      const maxChapter = bibleList.find(
        (item) => item.abbr === biblePassage.split('-')[0]
      )?.passage

      const nowAbbr = biblePassage.split('-')[0]
      const nowChapter = Number(biblePassage.split('-')[1])

      if (nowChapter !== maxChapter) {
        localStorage.setItem('last_chapter', `${nowAbbr}-${nowChapter + 1}`)
        router.push(`/read/${nowAbbr}/${nowChapter + 1}`)
      } else {
        const nextChapter = bibleList[chapterIndex + 1]
        localStorage.setItem('last_chapter', `${nextChapter.abbr}-1`)
        router.push(`/read/${nextChapter.abbr}/1`)
      }
    }
  }

  const backPassage = () => {
    if (biblePassage !== 'kej-1') {
      const chapterIndex = bibleList.findIndex(
        (item) => item.abbr === biblePassage.split('-')[0]
      )
      const minChapter = 1

      const nowAbbr = biblePassage.split('-')[0]
      const nowChapter = Number(biblePassage.split('-')[1])

      if (nowChapter !== minChapter) {
        localStorage.setItem('last_chapter', `${nowAbbr}-${nowChapter - 1}`)
        router.push(`/read/${nowAbbr}/${nowChapter - 1}`)
        // scrollToTop()
      } else {
        const prevChapter = bibleList[chapterIndex - 1]
        const prevChapterLastPassage = prevChapter.passage
        localStorage.setItem(
          'last_chapter',
          `${prevChapter.abbr}-${prevChapterLastPassage}`
        )
        router.push(`/read/${prevChapter.abbr}/${prevChapterLastPassage}`)
        // scrollToTop()
      }
    }
  }

  const changeChapter = (passageChapter: string) => {
    const [passage, chapter] = passageChapter.split('-')

    document.body.style.overflow = 'visible'
    bibleDispatch({ type: 'SET_OPEN_PASSAGE', data: false })
    localStorage.setItem('last_chapter', passageChapter)
    router.push(`/read/${passage}/${chapter}`)
    scrollToTop()
  }

  const changeVersion = (version: string) => {
    document.body.style.overflow = 'visible'
    bibleDispatch({ type: 'SET_BIBLE_VERSION', data: version })
    bibleDispatch({ type: 'SET_OPEN_TRANSLATE', data: false })
    scrollToTop()
  }

  const highlightText = (verse: number, content: string) => {
    if (highlightedText.find((item) => item.verse === verse)) {
      bibleDispatch({
        type: 'SET_HIGHLIGHTED_TEXT',
        data: highlightedText.filter((item) => item.verse !== verse),
      })
    } else {
      bibleDispatch({ type: 'SET_HIGHLIGHTED', data: true })
      bibleDispatch({
        type: 'SET_HIGHLIGHTED_TEXT',
        data: [...highlightedText, { verse, content }],
      })
    }
  }

  const removeHighlight = () => {
    bibleDispatch({ type: 'SET_HIGHLIGHTED', data: false })
    bibleDispatch({ type: 'SET_HIGHLIGHTED_TEXT', data: [] })
  }

  // Lifecycles —— Side Effects
  useEffect(() => {
    if (error) {
      console.error(error)
      bibleDispatch({ type: 'SET_MAINTENANCE', data: true })
    }
  }, [error])

  useEffect(() => {
    if (highlightedText.length === 0) {
      bibleDispatch({ type: 'SET_HIGHLIGHTED', data: false })
    }
  }, [highlightedText])

  useEffect(() => {
    refetch()
  }, [bibleVersion, passage, chapter])

  return (
    <>
      <Head>
        <title>
          {bibleDetail
            ? `${bibleDetail.name} ${chapter} | FreedomLife`
            : 'FreedomLife'}
        </title>
      </Head>
      <NextSeo
        title={
          bibleDetail
            ? `${bibleDetail.name} ${chapter} | FreedomLife`
            : 'FreedomLife'
        }
        description="Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca."
        openGraph={{
          url: `https://freedomlife.id/read/${passage}/${chapter}`,
          title: bibleDetail
            ? `${bibleDetail.name} ${chapter} | FreedomLife`
            : 'FreedomLife',
          description:
            'Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca.',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'http://freedomlife.id/images/og-read.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Baca Firman Hari Ini'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <BibleNavbar
        inGuide={false}
        highlighted={highlighted}
        highlightedText={highlightedText}
        bibleVersion={bibleVersion}
        passageTitle={passageTitle}
        handleOpenTranslate={() => {
          document.body.style.overflow = 'hidden'
          bibleDispatch({ type: 'SET_OPEN_TRANSLATE', data: true })
        }}
        handleOpenPassage={handleOpenPassage}
        handleOpenSetting={() => {
          document.body.style.overflow = 'hidden'
          bibleDispatch({ type: 'SET_OPEN_SETTING', data: true })
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
          maintenance={maintenance}
          verseFontSize={verseFontSize}
          highlightedText={highlightedText}
          bibleByPassageData={data}
          isBibleByPassageLoading={isLoading}
          highlightText={highlightText}
        />
      </PageTransition>

      <BibleNavigator
        // chevronRef={chevronRef}
        inGuide={false}
        biblePassage={biblePassage}
        isBibleByPassageLoading={isLoading}
        backPassage={backPassage}
        nextPassage={nextPassage}
      />

      <BibleTranslateDialog
        openTranslate={openTranslate}
        bibleVersion={bibleVersion}
        handleCloseTranslate={() => {
          document.body.style.overflow = 'visible'
          bibleDispatch({ type: 'SET_OPEN_TRANSLATE', data: false })
        }}
        changeVersion={changeVersion}
      />

      <BiblePassageDialog
        inGuide={false}
        openPassage={openPassage}
        changeChapter={changeChapter}
        handleClosePassage={() => {
          document.body.style.overflow = 'visible'
          bibleDispatch({ type: 'SET_OPEN_PASSAGE', data: false })
        }}
      />

      <BibleSettingDialog
        openSetting={openSetting}
        verseFontSize={verseFontSize}
        setVerseFontSize={setVerseFontSize}
        handleCloseSetting={() => {
          document.body.style.overflow = 'visible'
          bibleDispatch({ type: 'SET_OPEN_SETTING', data: false })
        }}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { passage, chapter } = query

  const isPassageExist = bibleList.find((item) => item.abbr === passage)

  if (!isPassageExist) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const isChapterValid =
    Number(chapter) >= 0 && Number(chapter) <= isPassageExist?.passage

  if (!isChapterValid) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return { props: {} }
}
