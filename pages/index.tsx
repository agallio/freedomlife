import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Fab,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import 'moment/locale/id'

// Redux
import { RootState } from '../src/reducers'
import { fetchGuideToday } from '../src/actions/guide'

// Google Tag Manager
import * as gtag from '../src/utils/gtag'

export const Home = (): JSX.Element => {
  // Redux Store
  const dispatch = useDispatch()
  const guide = useSelector((state: RootState) => state.guide)

  // Redux Deconstructor
  const { isFetching, guideToday } = guide

  // Component Lifecycle
  useEffect(() => {
    if (guideToday.date !== moment().format('DD-MM-YYYY')) {
      dispatch(fetchGuideToday())
    }
  }, [])

  // Component Methods
  const toBible = () => {
    gtag.event({
      action: 'to_bible',
      category: 'Bible',
      label: 'User Read The Bible',
      value: `Read Bible in ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    })
    Router.push('/bible')
  }

  return (
    <div>
      <Head>
        <title>FreedomLife</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isFetching && <LinearProgress color="secondary" />}
      <div className="container" style={{ paddingBottom: 90 }}>
        <h2 className="header-title" style={{ marginTop: 70 }}>
          Freedom Life
        </h2>
        <p className="header-subtitle">Aplikasi Panduan Baca Alkitab Setahun</p>

        <div style={{ marginTop: 40 }}>
          <Card className="styled-card">
            <CardContent>
              <Typography className="bold-text primary" variant="h5">
                Panduan Hari Ini
              </Typography>
              <Typography className="light-text primary" variant="subtitle1">
                {moment().format('dddd, LL')}
              </Typography>

              {['PL', 'PB', 'ALT'].map((item) => (
                <Grid
                  key={item}
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  style={{ marginTop: 5 }}
                >
                  <Grid item xs={3} sm={2} md={2}>
                    <div className="guide-passage-box">
                      <h5 className="guide-passage-box-text">{item}</h5>
                    </div>
                  </Grid>
                  <Grid item xs={9} sm={10} md={10}>
                    {isFetching ? (
                      <Skeleton variant="text" animation="wave" height={25} />
                    ) : (
                      <Typography
                        className="bold-text primary"
                        variant="h6"
                        style={{ fontSize: 17 }}
                      >
                        {item === 'PL'
                          ? guideToday.pl_name
                          : item === 'PB'
                          ? guideToday.pb_name
                          : item === 'ALT'
                          ? guideToday.alt_name
                          : 'Tidak ada data'}
                      </Typography>
                    )}
                    <Typography
                      className="light-text primary"
                      variant="subtitle1"
                    >
                      {item === 'PL'
                        ? 'Perjanjian Lama'
                        : item === 'PB'
                        ? 'Perjanjian Baru'
                        : item === 'ALT'
                        ? 'Tambahan'
                        : ''}
                    </Typography>
                  </Grid>
                </Grid>
              ))}

              <br />
              <Fab
                className="guide-passage-box-fab"
                size="small"
                variant="extended"
                color="primary"
                onClick={toBible}
                disabled={isFetching}
              >
                Baca
              </Fab>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
