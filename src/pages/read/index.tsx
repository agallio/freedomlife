import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NextSeo } from 'next-seo'
import toast from 'react-hot-toast'

// Components
import BibleNavbar from '~/components/Bible/BibleNavbar'
import BibleTypography from '~/components/Bible/BibleTypography'
import BibleNavigator from '~/components/Bible/BibleNavigator'
import BibleTranslateDialog from '~/components/Bible/BibleTranslateDialog'
import BiblePassageDialog from '~/components/Bible/BiblePassageDialog'
import BibleSettingDialog from '~/components/Bible/BibleSettingDialog'
import PageTransition from '~/components/PageTransition'

// Utils
import dayjs from '~/utils/dayjs'
import { copyText } from '~/utils/bible'
import { scrollToTop } from '~/utils/constants'
import { useGuideByDate } from '~/utils/hooks/useFetchedGuide'
import { useBibleByDate } from '~/utils/hooks/useFetchedBible'
import useLocalStorage from '~/utils/hooks/useLocalStorage'
import { checkTheme } from '~/utils/hooks/useDynamicTheme'

// Contexts
import { useGuide } from '~/contexts/GuideContext'
import { useBible } from '~/contexts/BibleContext'

const Read: NextPage = () => {
  // Core Configs
  const router = useRouter()
  const theme = checkTheme()

  // Contexts
  const { guideData, guideDate } = useGuide()
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
    'base'
  )

  // States
  const [passage, setPassage] = useState('pl-1')
  // const [prevScrollPos, setPrevScrollPos] = useState(0)

  // Refs
  // const chevronRef = useRef<HTMLElement>(null)
  const bibleTypographyRef = useRef<HTMLDivElement>(null)

  // Queries (Data Fetching)
  const {
    error,
    isLoading: isGuideByDateLoading,
    refetch: guideRefetch,
  } = useGuideByDate()
  const {
    data: bibleByDateData,
    isLoading: isBibleByDateLoading,
    refetch: bibleByDateRefetch,
  } = useBibleByDate(bibleVersion)

  // Memoized Value
  const guideBibleDataInfo = useMemo(
    () => guideData?.guide_bible_data || [],
    [guideData]
  )

  const guideBibleDataInfoByPassage = useMemo(() => {
    if (guideBibleDataInfo.length > 0) {
      return guideBibleDataInfo.find((i) => i.value === passage)
    }
    return null
  }, [guideBibleDataInfo, passage])

  // Methods
  const passageTitle = (): string | undefined => {
    if (isGuideByDateLoading || isBibleByDateLoading) {
      return 'Memuat'
    }

    return guideBibleDataInfoByPassage?.title || 'Memuat'
  }

  const handleOpenPassage = () => {
    if (guideData && bibleByDateData) {
      document.body.style.overflow = 'hidden'
      setOpenPassage(true)
      return
    }
  }

  const nextPassage = () => {
    removeHighlight()

    const currChapter = bibleByDateData?.passage
    const currPassage = currChapter?.find((i) => i === passage)
    const currPassageIndex = currChapter?.findIndex((i) => i === passage)

    if (currPassage) {
      scrollToTop()
      setPassage(currChapter![currPassageIndex! + 1])
    }
  }

  const backPassage = () => {
    removeHighlight()

    const currChapter = bibleByDateData?.passage
    const currPassage = currChapter?.find((i) => i === passage)
    const currPassageIndex = currChapter?.findIndex((i) => i === passage)

    if (currPassage) {
      scrollToTop()
      setPassage(currChapter![currPassageIndex! - 1])
    }
  }

  const changePassage = (name: string) => {
    document.body.style.overflow = 'visible'
    setPassage(name)
    setOpenPassage(false)
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

  const handleExitGuide = () => {
    if (guideBibleDataInfoByPassage) {
      document.body.style.overflow = 'visible'
      setOpenPassage(false)

      const { abbr } = guideBibleDataInfoByPassage
      const abbrSplitted = abbr.split('-')

      localStorage.setItem('last_chapter', guideBibleDataInfoByPassage.abbr)
      router.push(`/read/${abbrSplitted[0]}/${abbrSplitted[1]}`)

      toast.success('Panduan Baca Nonaktif', {
        style:
          theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
      })
    }
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

  useEffect(() => {
    if (!guideData?.date) {
      guideRefetch()
    } else if (typeof guideData?.date !== 'undefined' && guideDate !== '') {
      if (guideData?.date !== guideDate) {
        guideRefetch()
      }
    }

    bibleByDateRefetch()
  }, [router, bibleVersion])

  useEffect(() => {
    const handleScroll = () => {
      if (!passage.includes('pb') && !passage.includes('in')) return

      const currentScrollPos = window.pageYOffset
      if (bibleTypographyRef.current?.scrollHeight) {
        if (
          window.innerHeight -
            (document.body.scrollHeight - currentScrollPos) >=
            270 &&
          window.innerHeight -
            (document.body.scrollHeight - currentScrollPos) <=
            272.5
        ) {
          if (window) {
            const localStorageKey = `read-${
              guideDate || dayjs().format('DD-MM-YYYY')
            }`

            if (localStorage.getItem(localStorageKey) !== null) return

            localStorage.setItem(localStorageKey, 'true')
          }
        }
      }
    }

    const watchScroll = () => window.addEventListener('scroll', handleScroll)
    watchScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <>
      <Head>
        <title>Baca Firman Hari Ini | freedomlife</title>
      </Head>
      <NextSeo
        title="Baca Firman Hari Ini | freedomlife"
        description="Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca."
        openGraph={{
          url: 'https://freedomlife.id/read',
          title: 'Baca Firman Hari Ini | freedomlife',
          description:
            'Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca.',
          site_name: 'freedomlife',
          images: [
            {
              url: 'https://freedomlife.id/images/og-read.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Baca Firman Hari Ini'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <BibleNavbar
        inGuide={true}
        highlighted={highlighted}
        highlightedText={highlightedText}
        guideDate={guideDate}
        bibleVersion={bibleVersion}
        passageTitle={passageTitle}
        handleExitGuide={handleExitGuide}
        handleOpenTranslate={() => {
          document.body.style.overflow = 'hidden'
          setOpenTranslate(true)
        }}
        handleOpenPassage={handleOpenPassage}
        handleOpenSetting={() => {
          document.body.style.overflow = 'hidden'
          setOpenSetting(true)
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
          inGuide={true}
          passage={passage}
          maintenance={maintenance}
          verseFontSize={verseFontSize}
          highlightedText={highlightedText}
          isGuideByDateLoading={isGuideByDateLoading}
          isBibleByDateLoading={isBibleByDateLoading}
          bibleByDateData={bibleByDateData}
          highlightText={highlightText}
        />
      </PageTransition>

      <BibleNavigator
        // chevronRef={chevronRef}
        inGuide={true}
        isFirstPassageInGuide={passage === 'pl-1'}
        isLastPassageInGuide={
          bibleByDateData
            ? passage ===
              bibleByDateData.passage[bibleByDateData.passage.length - 1]
            : false
        }
        isBibleByDateLoading={isBibleByDateLoading}
        backPassage={backPassage}
        nextPassage={nextPassage}
      />

      <BibleTranslateDialog
        openTranslate={openTranslate}
        bibleVersion={bibleVersion}
        handleCloseTranslate={() => {
          document.body.style.overflow = 'visible'
          setOpenTranslate(false)
        }}
        changeVersion={changeVersion}
      />

      <BiblePassageDialog
        inGuide={true}
        openPassage={openPassage}
        guideBibleDataInfo={guideBibleDataInfo}
        passage={passage}
        changePassage={changePassage}
        handleClosePassage={() => {
          document.body.style.overflow = 'visible'
          setOpenPassage(false)
        }}
        handleExitGuide={handleExitGuide}
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

export default Read
