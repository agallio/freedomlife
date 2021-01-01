import Router from 'next/router'
import {
  Card,
  CardContent,
  Fab,
  Fade,
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { gtag, dayjs, useRequest } from '../src/utils'
import { useDispatchGuide } from '../src/store'

// Types
import type { ApiResponse, GuideDataResponse } from '../src/types'

export const Home: React.FC = () => {
  const guideDispatch = useDispatchGuide()

  const { data } = useRequest<ApiResponse<GuideDataResponse>>({
    url: `/api/guide/${dayjs().format('DD-MM-YYYY')}`,
  })

  const toBible = () => {
    guideDispatch({ type: 'SET_GUIDE_DATE', data: '' })
    Router.push('/bible')

    // Google Analytics
    gtag.event({
      action: 'to_bible',
      category: 'Bible',
      label: 'Bible - Read',
      value: `Read Bible in ${dayjs().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  return (
    <>
      {!data && <LinearProgress color="secondary" />}
      <Fade in>
        <div className="container" style={{ paddingBottom: 90 }}>
          <h2 className="header__title" style={{ marginTop: 65 }}>
            FreedomLife 🎄
          </h2>
          <p className="header__subtitle">
            Aplikasi Panduan Baca Alkitab Setahun
          </p>

          <div style={{ marginTop: 40 }}>
            <Card className="homecard">
              <CardContent>
                <Typography
                  className="homecard__title"
                  style={{ fontSize: 22 }}
                >
                  Panduan Hari Ini
                </Typography>
                <Typography className="homecard__subtitle">
                  {dayjs().format('dddd, DD MMMM YYYY')}
                </Typography>

                {['PL', 'PB', 'IN'].map((item) => (
                  <Grid
                    key={item}
                    container
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    style={{ marginTop: 5 }}
                  >
                    <Grid item xs={3} sm={2} md={2}>
                      <div className="homecard__pbox">
                        <p className="homecard__pbox__text">{item}</p>
                      </div>
                    </Grid>
                    <Grid item xs={9} sm={10} md={10}>
                      {!data ? (
                        <Skeleton variant="text" animation="wave" height={25} />
                      ) : (
                        <Typography
                          className="homecard__title"
                          style={{ fontSize: 17 }}
                        >
                          {item === 'PL'
                            ? data.data?.pl_name
                            : item === 'PB'
                            ? data.data?.pb_name
                            : item === 'IN'
                            ? data.data?.in_name
                            : 'Tidak ada data'}
                        </Typography>
                      )}
                      <Typography className="homecard__subtitle">
                        {item === 'PL'
                          ? 'Perjanjian Lama'
                          : item === 'PB'
                          ? 'Perjanjian Baru'
                          : item === 'IN'
                          ? 'Kitab Injil'
                          : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}

                <br />
                <Fab
                  className="homecard__button"
                  size="small"
                  variant="extended"
                  color="primary"
                  onClick={toBible}
                  disabled={!data}
                >
                  Baca
                </Fab>
              </CardContent>
            </Card>
          </div>
        </div>
      </Fade>
    </>
  )
}

export default Home
