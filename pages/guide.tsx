import Head from 'next/head'
import { Fade, LinearProgress } from '@material-ui/core'
import { NextSeo } from 'next-seo'

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
      <NextSeo
        title="🎄 Panduan Baca | FreedomLife"
        description="Panduan Baca Bulan Ini"
        openGraph={{
          url: 'https://freedomlife.id/guide',
          title: '🎄 Panduan Baca | FreedomLife',
          description: 'Panduan Baca Bulan Ini',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'http://freedomlife.id/images/og-guide.png',
              alt: 'Panduan Baca - FreedomLife',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      {!data && <LinearProgress color="secondary" />}
      <Fade in>
        <>
          <div className="container" style={{ paddingBottom: 25 }}>
            <h2 className="header__title" style={{ marginTop: 65 }}>
              Panduan Baca 🎁
            </h2>
            <p className="header__subtitle">Panduan Baca Bulan Ini</p>
          </div>

          <GuideList data={data} />
        </>
      </Fade>
    </>
  )
}

export default Guide
