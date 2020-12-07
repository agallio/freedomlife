import Head from 'next/head'
import { Fade, LinearProgress } from '@material-ui/core'

import { useRequest, dayjs } from '../src/utils'

// Components
import GuideList from '../src/components/Guide/GuideList'

// Types
import type { ApiResponse, GuideDataResponse } from '../src/types'

export const Guide: React.FC = () => {
  const { data } = useRequest<ApiResponse<GuideDataResponse[]>>({
    url: `/api/guide/month/${dayjs().format('MM')}`,
  })

  return (
    <>
      <Head>
        <title>🎄 Panduan Baca | FreedomLife</title>
      </Head>

      {!data && <LinearProgress color="secondary" />}
      <Fade in>
        <>
          <div className="container" style={{ paddingBottom: 25 }}>
            <h2
              className="header__title"
              data-testid="headerTitle"
              style={{ marginTop: 65 }}
            >
              Panduan Baca 🎁
            </h2>
            <p className="header__subtitle" data-testid="headerSubtitle">
              Panduan Baca Bulan Ini
            </p>
          </div>

          <GuideList data={data} />
        </>
      </Fade>
    </>
  )
}

export default Guide
