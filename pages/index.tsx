import Router from 'next/router'
import {
  Card,
  CardContent,
  Fab,
  Fade,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { dayjs, useRequest } from '../src/utils'
import { useDispatchGuide } from '../src/store'

// Types
import type { ApiResponse, GuideDataResponse } from '../src/types'

export const Home: React.FC = () => {
  const guideDispatch = useDispatchGuide()

  const { data } = useRequest<ApiResponse<GuideDataResponse>>({
    url: '/api/guide/today',
  })

  const toBible = () => {
    guideDispatch({ type: 'SET_GUIDE_DATE', data: '' })
    Router.push('/bible')
  }

  return (
    <>
      {!data && <LinearProgress color="secondary" />}
      <Fade in>
        <div className="container" style={{ paddingBottom: 90 }}>
          <h2
            className="header__title"
            data-testid="headerTitle"
            style={{ marginTop: 65 }}
          >
            FreedomLife
          </h2>
          <p className="header__subtitle" data-testid="headerSubtitle">
            Aplikasi Panduan Baca Alkitab Setahun
          </p>

          <div style={{ marginTop: 40 }}>
            <Card className="homecard">
              <CardContent>
                <Typography
                  className="homecard__title"
                  data-testid="homecardTitle"
                  style={{ fontSize: '1.5rem !important', lineHeight: 1 }}
                >
                  Panduan Hari Ini
                </Typography>
                <Typography
                  className="homecard__subtitle"
                  data-testid="homecardSubtitle"
                  variant="subtitle1"
                >
                  {dayjs().format('dddd, DD MMMM YYYY')}
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
                      <div className="homecard__pbox">
                        <p
                          className="homecard__pbox__text"
                          data-testid={`homecardPBox_${item}`}
                        >
                          {item}
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={9} sm={10} md={10}>
                      {!data ? (
                        <Skeleton variant="text" animation="wave" height={25} />
                      ) : (
                        <Typography
                          className="homecard__title"
                          variant="h6"
                          style={{ fontSize: 17 }}
                        >
                          {item === 'PL'
                            ? data.data?.pl_name
                            : item === 'PB'
                            ? data.data?.pb_name
                            : item === 'ALT'
                            ? data.data?.alt_name
                            : 'Tidak ada data'}
                        </Typography>
                      )}
                      <Typography
                        className="homecard__subtitle"
                        variant="subtitle1"
                        data-testid={`homecardPSub_${item}`}
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
                  className="homecard__button"
                  size="small"
                  variant="extended"
                  color="primary"
                  onClick={toBible}
                  disabled={!data}
                  data-testid="homecardButton"
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
