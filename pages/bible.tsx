import { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Fade } from '@material-ui/core'

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
      data?.data.alt.find((item) => item.passagePlace === passage)?.data || []
  }

  const plSpaceSplit = guideData?.pl_name?.split(' ')
  const altSpaceSplit = guideData?.alt_name?.split(' ')

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

  let altDashSplit: string[]
  const altList: number[] = []
  if (altSpaceSplit) {
    altDashSplit =
      altSpaceSplit.length !== 0
        ? altSpaceSplit[1] !== undefined
          ? altSpaceSplit[1].split('-')
          : []
        : []
    for (let i = Number(altDashSplit[0]); i <= Number(altDashSplit[1]); i++) {
      altList.push(i)
    }
  }

  const appBarTitle = (): string | undefined => {
    if (!data || !guideData) {
      return 'Memuat'
    }

    if (plSpaceSplit && altSpaceSplit) {
      switch (passage) {
        case 'pl-1':
          return plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                plList.length === 0 ? plSpaceSplit[2] : plList[0]
              }`
            : `${plSpaceSplit[0]} ${
                plList.length === 0 ? plSpaceSplit[1] : plList[0]
              }`
        case 'pl-2':
          return plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
            : `${plSpaceSplit[0]} ${plList[1]}`
        case 'pl-3':
          return plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]} `
            : `${plSpaceSplit[0]} ${plList[2]} `
        case 'pb':
          return guideData.pb_name as string
        case 'alt-1':
          return altList.length > 1
            ? `${altSpaceSplit[0]} ${altList[0]}`
            : altSpaceSplit.length > 3
            ? `${altSpaceSplit[0]} ${altSpaceSplit[1]} ${altSpaceSplit[2]} ${altSpaceSplit[3]}`
            : altSpaceSplit.length > 2
            ? `${altSpaceSplit[0]} ${altSpaceSplit[1]} ${altSpaceSplit[2]}`
            : `${altSpaceSplit[0]} ${altSpaceSplit[1]}`
        case 'alt-2':
          return altList.length > 1
            ? `${altSpaceSplit[0]} ${altList[1]}`
            : `${altSpaceSplit[0]} ${altSpaceSplit[1]}`
        default:
          return 'Memuat'
      }
    }
  }

  return (
    <>
      <Head>
        <title>Pembacaan Firman | FreedomLife</title>
      </Head>

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
            altList={altList}
            backPassage={backPassage}
            nextPassage={nextPassage}
            openPassageModal={() => setPassageModal(true)}
          />

          {data && guideData && (
            <>
              <BiblePassageDialog
                passageModal={passageModal}
                plSpaceSplit={plSpaceSplit as string[]}
                altSpaceSplit={altSpaceSplit as string[]}
                plList={plList}
                altList={altList}
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
