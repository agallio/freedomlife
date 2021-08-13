import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'

import BibleNavbar from '../components/Bible/BibleNavbar'
import BibleTypography from '../components/Bible/BibleTypography'
import BibleNavigator from '../components/Bible/BibleNavigator'
import BibleTranslateDialog from '../components/Bible/BibleTranslateDialog'
import BiblePassageDialog from '../components/Bible/BiblePassageDialog'
import BibleSettingDialog from '../components/Bible/BibleSettingDialog'

import { bibleList } from '../utils/constants'
import useLocalStorage from '../utils/hooks/useLocalStorage'
import useFetchedGuide from '../utils/hooks/useFetchedGuide'
import useRequest from '../utils/hooks/useRequest'
import dayjs from '../utils/dayjs'

import { useDispatchGuide, useGuide } from '../store'

import type { BibleList } from '../types/utils'
import type { HighlightedText } from '../types/components'
import type {
  ApiResponse,
  BibleDataResponse,
  BibleGuideDataResponse,
  VerseData,
} from '../types/api'

const Read = (): JSX.Element => {
  const guideDispatch = useDispatchGuide()
  const router = useRouter()
  const { resolvedTheme: theme } = useTheme()

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [chapterSelected, setChapterSelected] = useState({
    name: '',
    abbr: '',
    passage: 0,
  })
  const [searchChapter, setSearchChapter] = useState('')
  const [verseFontSize, setVerseFontSize] = useLocalStorage(
    'verse_font_size',
    'base'
  )
  const [inGuide, setInGuide] = useState(false)
  const [openTranslate, setOpenTranslate] = useState(false)
  const [openPassage, setOpenPassage] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const [highlightedText, setHighlightedText] = useState(
    [] as HighlightedText[]
  )
  const [bibleVersion, setBibleVersion] = useState('tb')
  const [passage, setPassage] = useState('pl-1')
  const [maintenance, setMaintenance] = useState(false)
  const chevronRef = useRef<HTMLElement>(null)

  const { error, revalidate: guideRevalidate } = useFetchedGuide()
  const { guideData, guideDate, guidePassage } = useGuide()
  const { data, revalidate } = useRequest<ApiResponse<BibleGuideDataResponse>>({
    url: `/api/bible/${
      guideDate || dayjs().format('DD-MM-YYYY')
    }/${bibleVersion}`,
  })
  const { data: bibleData, revalidate: bibleRevalidate } = useRequest<
    ApiResponse<BibleDataResponse>
  >({
    url: `/api/bible?passage=${
      guidePassage || 'kej-1'
    }&version=${bibleVersion}`,
  })

  let passageArray: VerseData[] | undefined
  let plDashSplit: string[]
  const plList: number[] = []
  const plSpaceSplit = inGuide && guideData?.pl_name?.split(' ')
  if (inGuide) {
    if (passage.includes('pl')) {
      passageArray =
        data?.data?.pl?.find((item) => item.passagePlace === passage)?.data ||
        []
    } else if (passage.includes('pb')) {
      passageArray =
        data?.data?.pb?.find((item) => item.passagePlace === passage)?.data ||
        []
    } else {
      passageArray =
        data?.data?.in?.find((item) => item.passagePlace === passage)?.data ||
        []
    }

    if (plSpaceSplit) {
      plDashSplit =
        plSpaceSplit.length === 3
          ? plSpaceSplit[2] !== undefined
            ? plSpaceSplit[2].split('-')
            : []
          : plSpaceSplit[1] !== undefined
          ? plSpaceSplit[1].split('-')
          : []
      for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
        plList.push(i)
      }
    }
  } else {
    passageArray = bibleData?.data?.data
  }

  const handleMinusFontSize = () => {
    switch (verseFontSize) {
      case 'base':
        setVerseFontSize('sm')
        break
      case 'lg':
        setVerseFontSize('base')
        break
      case 'xl':
        setVerseFontSize('lg')
        break
      case '2xl':
        setVerseFontSize('xl')
        break
      case '3xl':
        setVerseFontSize('2xl')
        break
      default:
        return
    }
  }

  const handlePlusFontSize = () => {
    switch (verseFontSize) {
      case 'sm':
        setVerseFontSize('base')
        break
      case 'base':
        setVerseFontSize('lg')
        break
      case 'lg':
        setVerseFontSize('xl')
        break
      case 'xl':
        setVerseFontSize('2xl')
        break
      case '2xl':
        setVerseFontSize('3xl')
        break
      default:
        return
    }
  }

  const getFontSizeName = () => {
    switch (verseFontSize) {
      case 'sm':
        return 'Kecil'
      case 'base':
        return 'Normal'
      case 'lg':
        return 'Sedang'
      case 'xl':
        return 'Besar'
      case '2xl':
        return 'Lebih Besar'
      case '3xl':
        return 'Sangat Besar'
      default:
        return 'Normal'
    }
  }

  const getHeaderFontSize = () => {
    switch (verseFontSize) {
      case 'sm':
        return 'base'
      case 'base':
        return 'lg'
      case 'lg':
        return 'xl'
      case 'xl':
        return '2xl'
      case '2xl':
        return '3xl'
      case '3xl':
        return '4xl'
      default:
        return 'lg'
    }
  }

  const handleSelectChapter = (item: BibleList) => {
    const modalPassageContent = document.getElementById('modalPassageContent')
    modalPassageContent!.scrollIntoView()
    setChapterSelected({ ...item })
  }

  const passageTitle = (): string | undefined => {
    if (!data || !guideData || !bibleData) {
      return 'Memuat'
    }

    if (inGuide) {
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
            return guideData.pb_name as string
          case 'in-1':
            return guideData.in_name as string
          default:
            return 'Memuat'
        }
      }
    } else {
      return bibleList.find((item) =>
        item.abbr === guidePassage ? guidePassage.split('-')[0] : 'kej-1'
      )
        ? `${
            bibleList.find(
              (item) =>
                item.abbr ===
                (guidePassage ? guidePassage.split('-')[0] : 'kej')
            )?.name
          } ${guidePassage ? guidePassage.split('-')[1] : '1'}`
        : ''
    }
  }

  const handleOpenPassage = () => {
    if (data && guideData && bibleData) {
      document.body.style.overflow = 'hidden'
      setOpenPassage(true)
      setChapterSelected({ name: '', abbr: '', passage: 0 })
    }
  }

  const scrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const nextPassage = () => {
    removeHighlight()

    if (inGuide) {
      const currChapter = data?.data?.passage
      const currPassage = currChapter?.find((i) => i === passage)
      const currPassageIndex = currChapter?.findIndex((i) => i === passage)

      if (currPassage) {
        scrollToTop()
        setPassage(currChapter![currPassageIndex! + 1])
      }
    } else {
      if (!guidePassage) {
        localStorage.setItem('last_chapter', 'kej-2')
        guideDispatch({
          type: 'SET_GUIDE_PASSAGE',
          data: 'kej-2',
        })
        bibleRevalidate()
        scrollToTop()
        return
      }

      if (guidePassage !== 'why-22') {
        const chapterIndex = bibleList.findIndex(
          (item) => item.abbr === guidePassage.split('-')[0]
        )
        const maxChapter = bibleList.find(
          (item) => item.abbr === guidePassage.split('-')[0]
        )?.passage

        const nowAbbr = guidePassage.split('-')[0]
        const nowChapter = Number(guidePassage.split('-')[1])

        if (nowChapter !== maxChapter) {
          localStorage.setItem('last_chapter', `${nowAbbr}-${nowChapter + 1}`)
          guideDispatch({
            type: 'SET_GUIDE_PASSAGE',
            data: `${nowAbbr}-${nowChapter + 1}`,
          })
          bibleRevalidate()
          scrollToTop()
        } else {
          const nextChapter = bibleList[chapterIndex + 1]
          localStorage.setItem('last_chapter', `${nextChapter.abbr}-1`)
          guideDispatch({
            type: 'SET_GUIDE_PASSAGE',
            data: `${nextChapter.abbr}-1`,
          })
          bibleRevalidate()
          scrollToTop()
        }
      }
    }
  }

  const backPassage = () => {
    removeHighlight()

    if (inGuide) {
      const currChapter = data?.data?.passage
      const currPassage = currChapter?.find((i) => i === passage)
      const currPassageIndex = currChapter?.findIndex((i) => i === passage)

      if (currPassage) {
        scrollToTop()
        setPassage(currChapter![currPassageIndex! - 1])
      }
    } else {
      if (guidePassage !== 'kej-1') {
        const chapterIndex = bibleList.findIndex(
          (item) => item.abbr === guidePassage.split('-')[0]
        )
        const minChapter = 1

        const nowAbbr = guidePassage.split('-')[0]
        const nowChapter = Number(guidePassage.split('-')[1])

        if (nowChapter !== minChapter) {
          localStorage.setItem('last_chapter', `${nowAbbr}-${nowChapter - 1}`)
          guideDispatch({
            type: 'SET_GUIDE_PASSAGE',
            data: `${nowAbbr}-${nowChapter - 1}`,
          })
          bibleRevalidate()
          scrollToTop()
        } else {
          const prevChapter = bibleList[chapterIndex - 1]
          const prevChapterLastPassage = prevChapter.passage
          localStorage.setItem(
            'last_chapter',
            `${prevChapter.abbr}-${prevChapterLastPassage}`
          )
          guideDispatch({
            type: 'SET_GUIDE_PASSAGE',
            data: `${prevChapter.abbr}-${prevChapterLastPassage}`,
          })
          bibleRevalidate()
          scrollToTop()
        }
      }
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
    revalidate()
    guideRevalidate()
    setBibleVersion(version)
    setOpenTranslate(false)
    scrollToTop()
  }

  const changeChapter = (chapter: string) => {
    document.body.style.overflow = 'visible'
    localStorage.setItem('last_chapter', chapter)
    guideDispatch({ type: 'SET_GUIDE_PASSAGE', data: chapter })
    bibleRevalidate()
    setOpenPassage(false)
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

  const fallbackCopyText = async (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text

    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      await document.execCommand('copy')
      textArea.style.display = 'none'
      setHighlighted(false)
      setHighlightedText([])
      toast.success('Ayat Tersalin!', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    } catch (e) {
      console.error(e)
      toast.error('Terjadi kesalahan! Coba beberapa saat lagi.', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    }
  }

  const copyText = async () => {
    let mapHighlightedContent
    let mapHighlightedVerse

    const sortedHighlightedText = highlightedText.sort(
      (a, b) => a.verse - b.verse
    )

    const highlightedContent = sortedHighlightedText.map((item) => item.content)
    const highlightedVerse = sortedHighlightedText.map((item) => item.verse)
    const checkDiffVerse = highlightedVerse
      .slice(1)
      .map((n, i) => n - highlightedVerse[i])
    const isIncreasingSequence = checkDiffVerse.every((value) => value === 1)

    if (highlightedVerse.length > 1) {
      if (isIncreasingSequence) {
        mapHighlightedVerse = `${highlightedVerse[0]}-${
          highlightedVerse[highlightedVerse.length - 1]
        }`
        mapHighlightedContent = highlightedContent.join(' ')
      } else {
        mapHighlightedVerse = highlightedVerse.join(', ')
        mapHighlightedContent = highlightedContent.join('\n\n')
      }
    } else {
      mapHighlightedVerse = highlightedVerse[0]
      mapHighlightedContent = highlightedContent[0]
    }

    if (!navigator.clipboard) {
      fallbackCopyText(
        `"${mapHighlightedContent}" - ${passageTitle()}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
      )
      return
    }

    try {
      await navigator.clipboard.writeText(
        `"${mapHighlightedContent}" - ${passageTitle()}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
      )
      toast.success('Ayat Tersalin!', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
      setHighlighted(false)
      setHighlightedText([])
    } catch (err) {
      console.error('Failed to copy: ', err)
      toast.error('Terjadi kesalahan! Coba beberapa saat lagi.', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    }
  }

  const handleExitGuide = () => {
    if (guideData) {
      const plAbbrSpaceSplit = guideData.pl!.split(' ')
      const pbAbbrSpaceSplit = guideData.pb!.split(' ')
      const inAbbrSpaceSplit = guideData.in!.split(' ')
      const pbSpaceSplit = guideData.pb!.split(' ')
      const pbDashSplit = pbSpaceSplit[1]?.split(':')

      switch (passage) {
        case 'pl-1':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${
              plList.length === 0 ? plAbbrSpaceSplit[1] : plList[0]
            }`
          )
          break
        case 'pl-2':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${plList[1]}`
          )
          break
        case 'pl-3':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${plList[2]}`
          )
          break
        case 'pl-4':
          localStorage.setItem(
            'last_chapter',
            `${plAbbrSpaceSplit[0]}-${plList[3]}`
          )
          break
        case 'pb':
          if (pbDashSplit.length > 0) {
            localStorage.setItem(
              'last_chapter',
              `${pbSpaceSplit[0]}-${pbDashSplit[0]}`
            )
          } else {
            localStorage.setItem('last_chapter', pbAbbrSpaceSplit.join('-'))
          }
          break
        case 'in-1':
          localStorage.setItem('last_chapter', inAbbrSpaceSplit.join('-'))
          break

        default:
          return
      }

      document.body.style.overflow = 'visible'
      setOpenPassage(false)
      router.push('/read')
      toast.success('Panduan Baca Nonaktif', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    }
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    if (prevScrollPos >= 0 && currentScrollPos >= 0) {
      if (
        prevScrollPos > currentScrollPos ||
        prevScrollPos === currentScrollPos
      ) {
        chevronRef.current!.style.bottom =
          'calc(6rem + env(safe-area-inset-bottom))'
      } else {
        chevronRef.current!.style.bottom = '1.25rem'
      }
    } else {
      chevronRef.current!.style.bottom =
        'calc(6rem + env(safe-area-inset-bottom))'
    }
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    const watchScroll = () => window.addEventListener('scroll', handleScroll)
    watchScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

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
    bibleRevalidate()
  }, [guidePassage])

  useEffect(() => {
    setInGuide(router.query.guide === 'true' ? true : false)

    if (!router.query.guide) {
      guideDispatch({
        type: 'SET_GUIDE_PASSAGE',
        data: localStorage.getItem('last_chapter'),
      })
      bibleRevalidate()
    }
  }, [router.query.guide])

  return (
    <>
      <Head>
        <title>Pembacaan Firman | FreedomLife</title>
      </Head>
      <NextSeo
        title="Pembacaan Firman | FreedomLife"
        description="Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 5 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca."
        openGraph={{
          url: 'https://freedomlife.id/read',
          title: 'Pembacaan Firman | FreedomLife',
          description:
            'Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 5 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca.',
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
        highlighted={highlighted}
        highlightedText={highlightedText}
        inGuide={inGuide}
        guideDate={guideDate}
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
        copyText={copyText}
        passageTitle={`${passageTitle()} 
              ${
                data && guideData && bibleData && bibleVersion !== 'tb'
                  ? `(${bibleVersion.toUpperCase()})`
                  : ''
              }`}
      />

      <BibleTypography
        inGuide={inGuide}
        verseFontSize={verseFontSize}
        maintenance={maintenance}
        data={data}
        bibleData={bibleData}
        passageArray={passageArray}
        highlightedText={highlightedText}
        getHeaderFontSize={getHeaderFontSize}
        highlightText={highlightText}
      />

      <BibleNavigator
        chevronRef={chevronRef}
        data={data}
        bibleData={bibleData}
        inGuide={inGuide}
        passage={passage}
        guidePassage={guidePassage}
        backPassage={backPassage}
        nextPassage={nextPassage}
      />

      <BibleTranslateDialog
        openTranslate={openTranslate}
        inGuide={inGuide}
        bibleVersion={bibleVersion}
        handleCloseTranslate={() => {
          document.body.style.overflow = 'visible'
          setOpenTranslate(false)
        }}
        changeVersion={changeVersion}
      />

      <BiblePassageDialog
        openPassage={openPassage}
        inGuide={inGuide}
        passage={passage}
        plSpaceSplit={plSpaceSplit}
        plList={plList}
        chapterSelected={chapterSelected}
        searchChapter={searchChapter}
        setSearchChapter={setSearchChapter}
        handleSelectChapter={handleSelectChapter}
        setChapterSelected={setChapterSelected}
        changePassage={changePassage}
        changeChapter={changeChapter}
        handleClosePassage={() => {
          document.body.style.overflow = 'visible'
          setOpenPassage(false)
        }}
        handleExitGuide={handleExitGuide}
      />

      <BibleSettingDialog
        openSetting={openSetting}
        verseFontSize={verseFontSize}
        getFontSizeName={getFontSizeName()}
        handleMinusFontSize={handleMinusFontSize}
        handlePlusFontSize={handlePlusFontSize}
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
