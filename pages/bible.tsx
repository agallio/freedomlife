import { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Fade } from '@material-ui/core'
import { NextSeo } from 'next-seo'

import { useGuide } from '../src/store'
import { gtag, dayjs, useRequest, useFetchedGuide } from '../src/utils'

// Components
import BibleAppBar from '../src/components/Bible/BibleAppBar'
import BibleBottomBar from '../src/components/Bible/BibleBottomBar'
import BibleTypography from '../src/components/Bible/BibleTypography'
import BibleVersionDialog from '../src/components/Bible/BibleVersionDialog'
import BiblePassageDialog from '../src/components/Bible/BiblePassageDialog'

// Types
import type {
  ApiResponse,
  BibleDataResponse,
  HighlightedText,
  VerseData,
} from '../src/types'

export const Bible: React.FC = () => {
  const [passageModal, setPassageModal] = useState(false)
  const [versionModal, setVersionModal] = useState(false)
  const [bibleVersion, setBibleVersion] = useState('tb')
  const [passage, setPassage] = useState('pl-1')
  const [highlighted, setHighlighted] = useState(false)
  const [highlitedText, setHighlightedText] = useState([] as HighlightedText[])

  const { error, revalidate: guideRevalidate } = useFetchedGuide()
  const { guideData, guideDate } = useGuide()

  const { data, revalidate } = useRequest<ApiResponse<BibleDataResponse>>({
    url: `/api/bible/${
      guideDate || dayjs().format('DD-MM-YYYY')
    }?version=${bibleVersion}`,
  })

  useEffect(() => {
    if (error) {
      console.error(error)
      Router.push('/maintenance')
    }
  }, [error])

  const scrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const nextPassage = () => {
    const currChapter = data?.data.passage
    const currPassage = currChapter?.find((i) => i === passage)
    const currPassageIndex = currChapter?.findIndex((i) => i === passage)

    if (currPassage) {
      scrollToTop()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPassage(currChapter![currPassageIndex! + 1])
    }

    // Google Analytics
    gtag.event({
      action: 'next_bible',
      category: 'Bible',
      label: 'Bible - Next',
      value: `Next Bible in ${dayjs().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  const backPassage = () => {
    const currChapter = data?.data.passage
    const currPassage = currChapter?.find((i) => i === passage)
    const currPassageIndex = currChapter?.findIndex((i) => i === passage)

    if (currPassage) {
      scrollToTop()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPassage(currChapter![currPassageIndex! - 1])
    }

    // Google Analytics
    gtag.event({
      action: 'back_bible',
      category: 'Bible',
      label: 'Bible - Back',
      value: `Back Bible in ${dayjs().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  const changePassage = (name: string, code: string) => {
    setPassage(name)
    setPassageModal(false)
    scrollToTop()

    // Google Analytics
    gtag.event({
      action: `to_passage_${code}`,
      category: 'Bible',
      label: `Bible - To ${name.toUpperCase()}`,
      value: `Read Bible (${name.toUpperCase()}) in ${dayjs().format(
        'DD-MM-YYYY HH:mm:ss'
      )}`,
    })
  }

  const changeVersion = async (version: string) => {
    revalidate()
    guideRevalidate()
    setBibleVersion(version)
    setVersionModal(false)
    scrollToTop()
  }

  let passageArray: VerseData[]
  if (passage.includes('pl')) {
    passageArray =
      data?.data.pl.find((item) => item.passagePlace === passage)?.data || []
  } else if (passage.includes('pb')) {
    passageArray =
      data?.data.pb.find((item) => item.passagePlace === passage)?.data || []
  } else {
    passageArray =
      data?.data.in.find((item) => item.passagePlace === passage)?.data || []
  }

  const plSpaceSplit = guideData?.pl_name?.split(' ')
  const inSpaceSplit = guideData?.in_name?.split(' ')

  let plDashSplit: string[]
  const plList: number[] = []
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

  let inDashSplit: string[]
  const inList: number[] = []
  if (inSpaceSplit) {
    inDashSplit =
      inSpaceSplit.length !== 0
        ? inSpaceSplit[1] !== undefined
          ? inSpaceSplit[1].split('-')
          : []
        : []
    for (let i = Number(inDashSplit[0]); i <= Number(inDashSplit[1]); i++) {
      inList.push(i)
    }
  }

  const appBarTitle = (): string | undefined => {
    if (!data || !guideData) {
      return 'Memuat'
    }

    if (plSpaceSplit || inSpaceSplit) {
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
          if (inSpaceSplit) {
            return inList.length > 1
              ? `${inSpaceSplit[0]} ${inList[0]}`
              : inSpaceSplit.length > 3
              ? `${inSpaceSplit[0]} ${inSpaceSplit[1]} ${inSpaceSplit[2]} ${inSpaceSplit[3]}`
              : inSpaceSplit.length > 2
              ? `${inSpaceSplit[0]} ${inSpaceSplit[1]} ${inSpaceSplit[2]}`
              : `${inSpaceSplit[0]} ${inSpaceSplit[1]}`
          }
          return 'Memuat'
        case 'in-2':
          if (inSpaceSplit) {
            return inList.length > 1
              ? `${inSpaceSplit[0]} ${inList[1]}`
              : `${inSpaceSplit[0]} ${inSpaceSplit[1]}`
          }
          return 'Memuat'
        default:
          return 'Memuat'
      }
    }
  }

  return (
    <>
      <Head>
        <title>🎄 Pembacaan Firman | FreedomLife</title>
      </Head>
      <NextSeo
        title="🎄 Pembacaan Firman | FreedomLife"
        description="Pembacaan Firman Hari Ini"
        openGraph={{
          url: 'https://freedomlife.id/bible',
          title: '🎄 Pembacaan Firman | FreedomLife',
          description: 'Pembacaan Firman Hari Ini',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'http://freedomlife.id/images/og-bible.png',
              alt: 'Pembacaan Firman - FreedomLife',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <Fade in>
        <div className="bible">
          <BibleAppBar
            data={data}
            appBarTitle={`${
              bibleVersion !== 'tb' && data && guideData
                ? `(${bibleVersion.toUpperCase()})`
                : ''
            } ${appBarTitle()}`}
            bibleVersion={bibleVersion}
            highlighted={highlighted}
            highlightedText={highlitedText}
            setHighlighted={setHighlighted}
            setHighlightedText={setHighlightedText}
            goBack={() => Router.push('/')}
            openTranslate={() => setVersionModal(true)}
          />

          <BibleTypography
            data={data}
            passageArray={passageArray}
            highlightedText={highlitedText}
            setHighlighted={setHighlighted}
            setHighlightedText={setHighlightedText}
          />

          <BibleBottomBar
            data={data}
            passage={passage}
            inList={inList}
            backPassage={backPassage}
            nextPassage={nextPassage}
            openPassageModal={() => setPassageModal(true)}
          />

          {data && guideData && (
            <>
              <BiblePassageDialog
                passageModal={passageModal}
                plSpaceSplit={plSpaceSplit as string[]}
                inSpaceSplit={inSpaceSplit as string[]}
                plList={plList}
                inList={inList}
                changePassage={changePassage}
                closePassageModal={() => setPassageModal(false)}
              />

              <BibleVersionDialog
                versionModal={versionModal}
                changeVersion={changeVersion}
                closeVersionModal={() => setVersionModal(false)}
              />
            </>
          )}
        </div>
      </Fade>
    </>
  )
}

export default Bible
