import Router from 'next/router'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import splitbee from '@splitbee/web'

import JumboHeader from '@/components/JumboHeader'
import GuideLoading from '@/components/Guide/GuideLoading'
import GuideItem from '@/components/Guide/GuideItem'

import useRequest from '@/utils/hooks/useRequest'
import dayjs from '@/utils/dayjs'

import { useDispatchGuide } from '../store'

import type { ApiResponse, GuideDataResponse } from '@/types/api'

const Guide: React.FC = () => {
  const guideDispatch = useDispatchGuide()

  const { data } = useRequest<ApiResponse<GuideDataResponse[]>>({
    url: `/api/guide/month/${dayjs().format('MM')}`,
  })

  const toBibleWithDate = (date: string) => {
    splitbee.track(`Navigate To Bible (${date})`)
    guideDispatch({ type: 'SET_GUIDE_DATE', data: date })
    Router.push('/read?guide=true')
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      <Head>
        <title>Panduan Baca | FreedomLife</title>
      </Head>
      <NextSeo
        title="Panduan Baca | FreedomLife"
        description="Panduan Baca Bulan Ini"
        openGraph={{
          url: 'https://freedomlife.id/guide',
          title: 'Panduan Baca | FreedomLife',
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

      <div className="max-w-sm p-6 mx-auto sm:max-w-md sm:py-6">
        <JumboHeader title="Panduan Baca" subtitle="Panduan Baca Bulan Ini" />

        {!data ? (
          <GuideLoading />
        ) : (
          data.data.map((item, index) => (
            <GuideItem
              key={index}
              item={item}
              index={index}
              toBibleWithDate={toBibleWithDate}
            />
          ))
        )}
      </div>
    </>
  )
}

export default Guide
