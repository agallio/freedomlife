import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Fade } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/id'

// Redux
import { RootState } from '../src/reducers'
import { fetchGuideToday, fetchGuideByDate } from '../src/actions/guide'
import { fetchTodayChapter, fetchChapterByDate } from '../src/actions/bible'

// Google Tag Manager
import * as gtag from '../src/utils/gtag'

// Components
import BibleAppBar from '../src/components/Bible/BibleAppBar'
import BibleTypography from '../src/components/Bible/BibleTypography'
import BibleBottomBar from '../src/components/Bible/BibleBottomBar'
import BiblePassageDialog from '../src/components/Bible/BiblePassageDialog'
import BibleVersionDialog from '../src/components/Bible/BibleVersionDialog'

// Types
export interface HighlightedText {
  verse: number
  content: string
}

const Bible = (): JSX.Element => {
  // Local State
  const [passageModal, setPassageModal] = useState(false)
  const [versionModal, setVersionModal] = useState(false)
  const [bibleVersion, setBibleVersion] = useState('tb')
  const [passage, setPassage] = useState('pl-1')
  const [highlighted, setHighlighted] = useState(false)
  const [highlitedText, setHighlightedText] = useState([] as HighlightedText[])

  // Redux Store
  const dispatch = useDispatch()
  const guide = useSelector((state: RootState) => state.guide)
  const bible = useSelector((state: RootState) => state.bible)

  // Redux Deconstructor
  const { guideData, guideDate } = guide
  const { isFetching, chapters } = bible

  // Component Lifecycle
  useEffect(() => {
    if (guideDate !== '') {
      dispatch(fetchGuideByDate(guideDate))
      dispatch(fetchChapterByDate('tb', guideDate))
    } else {
      dispatch(fetchGuideToday())
      dispatch(fetchTodayChapter('tb'))
    }
  }, [])

  // Component Methods
  const topFunction = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const nextPassage = () => {
    const currChapter = chapters.passage
    const currPassage = currChapter.find((i) => i === passage)
    const currPassageIndex = currChapter.findIndex((i) => i === passage)

    if (currPassage) {
      topFunction()
      setPassage(currChapter[currPassageIndex + 1])
    }

    // Google Analytics
    gtag.event({
      action: 'next_bible',
      category: 'Bible',
      label: 'Bible - Next',
      value: `Next Bible in ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  const backPassage = () => {
    const currChapter = chapters.passage
    const currPassage = currChapter.find((i) => i === passage)
    const currPassageIndex = currChapter.findIndex((i) => i === passage)

    if (currPassage) {
      topFunction()
      setPassage(currChapter[currPassageIndex - 1])
    }

    // Google Analytics
    gtag.event({
      action: 'back_bible',
      category: 'Bible',
      label: 'Bible - Back',
      value: `Back Bible in ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  const changePassage = (name: string, code: string) => {
    setPassage(name)
    setPassageModal(false)
    topFunction()
    // Google Analytics
    gtag.event({
      action: `to_passage_${code}`,
      category: 'Bible',
      label: `Bible - To ${name.toUpperCase()}`,
      value: `Read Bible (${name.toUpperCase()}) in ${moment().format(
        'DD-MM-YYYY HH:mm:ss'
      )}`,
    })
  }

  const changeVersion = (version: string) => {
    if (guideDate) {
      dispatch(fetchChapterByDate(version, guideDate))
    } else {
      dispatch(fetchTodayChapter(version))
    }
    setBibleVersion(version)
    setVersionModal(false)
    topFunction()
  }

  // Realtime Update Passage Array
  let passageArray = []
  if (passage.includes('pl')) {
    passageArray = chapters.pl.find((item) => item.passagePlace === passage)
      ? chapters.pl.find((item) => item.passagePlace === passage)!.data
      : []
  } else if (passage.includes('pb')) {
    passageArray = chapters.pb.find((item) => item.passagePlace === passage)
      ? chapters.pb.find((item) => item.passagePlace === passage)!.data
      : []
  } else {
    passageArray = chapters.alt.find((item) => item.passagePlace === passage)
      ? chapters.alt.find((item) => item.passagePlace === passage)!.data
      : []
  }

  const plSpaceSplit = guideData.pl_name.split(' ')
  const altSpaceSplit = guideData.alt_name.split(' ')

  const plDashSplit =
    plSpaceSplit.length === 3
      ? plSpaceSplit[2] !== undefined
        ? plSpaceSplit[2].split('-')
        : []
      : plSpaceSplit[1] !== undefined
      ? plSpaceSplit[1].split('-')
      : []
  let plList: number[] = []
  for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
    plList.push(i)
  }

  const altDashSplit =
    altSpaceSplit.length !== 0
      ? altSpaceSplit[1] !== undefined
        ? altSpaceSplit[1].split('-')
        : []
      : []
  let altList: number[] = []
  for (let i = Number(altDashSplit[0]); i <= Number(altDashSplit[1]); i++) {
    altList.push(i)
  }

  // Passage Title
  const appBarTitle = (): string => {
    if (isFetching) {
      return 'Memuat'
    } else {
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
          return guideData.pb_name
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
    <Fade in>
      <div className="bible-container">
        <Head>
          <title>Pembacaan Firman | FreedomLife</title>
        </Head>

        <BibleAppBar
          isFetching={isFetching}
          appBarTitle={`${
            bibleVersion !== 'tb' && !isFetching
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
          isFetching={isFetching}
          passageArray={passageArray}
          highlightedText={highlitedText}
          setHighlighted={setHighlighted}
          setHighlightedText={setHighlightedText}
        />

        <BibleBottomBar
          isFetching={isFetching}
          passage={passage}
          altList={altList}
          backPassage={backPassage}
          nextPassage={nextPassage}
          openPassageModal={() => setPassageModal(true)}
        />

        <BiblePassageDialog
          passageModal={passageModal}
          plSpaceSplit={plSpaceSplit}
          altSpaceSplit={altSpaceSplit}
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
      </div>
    </Fade>
  )
}

export default Bible
