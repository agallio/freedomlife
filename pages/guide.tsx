import React, { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { Fade, LinearProgress } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/id'

// Redux
import { RootState } from '../src/reducers'
import { fetchGuideByMonth } from '../src/actions/guide'

// Components
import GuideList from '../src/components/Guide/GuideList'

const Guide = (): JSX.Element => {
  // Redux Store
  const dispatch = useDispatch()
  const guide = useSelector((state: RootState) => state.guide)

  // Redux Deconstructor
  const { isFetching, guideData, guideByMonth } = guide

  // Component Lifecycle
  useEffect(() => {
    if (
      moment(guideData.date, 'DD-MM-YYYY').format('MM') !==
        moment().format('MM') ||
      guideByMonth.length === 0
    ) {
      dispatch(fetchGuideByMonth(moment().format('MM')))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Panduan Baca | FreedomLife</title>
      </Head>

      {isFetching && <LinearProgress color="secondary" />}
      <Fade in>
        <div>
          <div className="container" style={{ paddingBottom: 30 }}>
            <h2 className="header-title" style={{ marginTop: 70 }}>
              Panduan Baca
            </h2>
            <p className="header-subtitle">Panduan Baca Bulan Ini</p>
          </div>

          <GuideList />
        </div>
      </Fade>
    </>
  )
}

export default Guide
