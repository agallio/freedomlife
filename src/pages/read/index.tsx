import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NextSeo } from 'next-seo'
import { useTheme } from 'next-themes'
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

// Contexts
import { useGuide } from '~/contexts/GuideContext'
import { useBible } from '~/contexts/BibleContext'

const Read: NextPage = () => {
  // Core Configs
  const router = useRouter()
  const { resolvedTheme: theme } = useTheme()

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
  const plSpaceSplit = useMemo(
    () => guideData?.pl_name?.split(' '),
    [guideData]
  )

  const plDashSplit = useMemo(() => {
    if (plSpaceSplit) {
      return plSpaceSplit.length === 3
        ? plSpaceSplit[2] !== undefined
          ? plSpaceSplit[2].split('-')
          : []
        : plSpaceSplit[1] !== undefined
        ? plSpaceSplit[1].split('-')
        : []
    }
    return []
  }, [plSpaceSplit])

  const plList = useMemo(() => {
    const arr = []
    for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
      arr.push(i)
    }
    return arr
  }, [plDashSplit])

  // Methods
  const passageTitle = (): string | undefined => {
    if (isGuideByDateLoading || isBibleByDateLoading) {
      return 'Memuat'
    }

    if (plSpaceSplit) {
      switch (passage) {
        case 'pl-1':
          if (plSpaceSplit) {
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                  plList.length === 0 ? plSpaceSplit[2] : plList[0]
                }`
              : `${plSpaceSplit[0]} ${
                  plList.length === 0 ? plSpaceSplit[1] : plList[0]
                }`
          }
          return 'Memuat'
        case 'pl-2':
          if (plSpaceSplit) {
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
              : `${plSpaceSplit[0]} ${plList[1]}`
          }
          return 'Memuat'
        case 'pl-3':
          if (plSpaceSplit) {
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]} `
              : `${plSpaceSplit[0]} ${plList[2]} `
          }
          return 'Memuat'
        case 'pb':
          return guideData?.pb_name as string
        case 'in-1':
          return guideData?.in_name as string
        default:
          return 'Memuat'
      }
    }
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
    if (guideData) {
      const plAbbrSpaceSplit = guideData.pl!.split(' ')
      const pbAbbrSpaceSplit = guideData.pb!.split(' ')
      const inAbbrSpaceSplit = guideData.in ? guideData.in.split(' ') : []
      const pbSpaceSplit = guideData.pb!.split(' ')
      const pbDashSplit = pbSpaceSplit[1]?.split(':')

      document.body.style.overflow = 'visible'
      setOpenPassage(false)

      switch (passage) {
        case 'pl-1':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${
              plList.length === 0 ? plAbbrSpaceSplit[1] : plList[0]
            }`
          )
          router.push(
            `/read/${plAbbrSpaceSplit[0]}/${
              plList.length === 0 ? plAbbrSpaceSplit[1] : plList[0]
            }`
          )
          break
        case 'pl-2':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${plList[1]}`
          )
          router.push(`/read/${plAbbrSpaceSplit[0]}/${plList[1]}`)
          break
        case 'pl-3':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${plList[2]}`
          )
          router.push(`/read/${plAbbrSpaceSplit[0]}/${plList[2]}`)
          break
        case 'pl-4':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${plList[3]}`
          )
          router.push(`/read/${plAbbrSpaceSplit[0]}/${plList[3]}`)
          break
        case 'pb':
          if (pbDashSplit.length > 0) {
            localStorage.setItem(
              'last_chapter',
              `${pbSpaceSplit[0]}-${pbDashSplit[0]}`
            )
            router.push(`/read/${pbSpaceSplit[0]}/${pbDashSplit[0]}`)
          } else {
            localStorage.setItem('last_chapter', pbAbbrSpaceSplit.join('-'))
            router.push(`/read/${pbAbbrSpaceSplit[0]}/${pbAbbrSpaceSplit[1]}`)
          }
          break
        case 'in-1':
          localStorage.setItem('last_chapter', inAbbrSpaceSplit.join('-'))
          router.push(`/read/${inAbbrSpaceSplit[0]}/${inAbbrSpaceSplit[1]}`)
          break

        default:
          return
      }

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
    } else if (typeof guideData?.date !== undefined && guideDate !== '') {
      if (guideData?.date !== guideDate) {
        guideRefetch()
      }
    }

    bibleByDateRefetch()
  }, [router, bibleVersion])

  useEffect(() => {
    const handleScroll = () => {
      if (passage !== 'pb') return

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
        <title>Baca Firman Hari Ini | FreedomLife</title>
      </Head>
      <NextSeo
        title="Baca Firman Hari Ini | FreedomLife"
        description="Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca."
        openGraph={{
          url: 'https://freedomlife.id/read',
          title: 'Baca Firman Hari Ini | FreedomLife',
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
        passage={passage}
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
        passage={passage}
        plSpaceSplit={plSpaceSplit}
        plList={plList}
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
