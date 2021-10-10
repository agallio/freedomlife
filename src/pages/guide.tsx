// Core
import Router from 'next/router'
import Head from 'next/head'

// 3rd Party Libs
import { NextSeo } from 'next-seo'

// Components
import JumboHeader from '@/components/JumboHeader'
import GuideLoading from '@/components/Guide/GuideLoading'
import GuideItem from '@/components/Guide/GuideItem'
import PageTransition from '@/components/PageTransition'

// Context
import { useGuide } from '../store/Guide'

// Utils —— Hooks
import { useGuides } from '@/utils/hooks/useFetchedGuide'

const Guide = (): JSX.Element => {
  const { guideDispatch } = useGuide()

  const { data } = useGuides()

  const toBibleWithDate = (date: string) => {
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
        description="Halaman daftar panduan baca bulan ini. Anda dapat melihat panduan baca dan membaca panduan langsung dari aplikasi."
        openGraph={{
          url: 'https://freedomlife.id/guide',
          title: 'Panduan Baca | FreedomLife',
          description:
            'Halaman daftar panduan baca bulan ini. Anda dapat melihat panduan baca dan membaca panduan langsung dari aplikasi.',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'http://freedomlife.id/images/og-guide.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Panduan Baca Bulan Ini'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="max-w-sm p-6 mx-auto mb-20 sm:max-w-md sm:py-6 md:mb-16">
        <JumboHeader subtitle="Panduan Baca Bulan Ini" />

        <PageTransition>
          {!data ? (
            <GuideLoading />
          ) : (
            data.map((item, index) => (
              <GuideItem
                key={index}
                item={item}
                index={index}
                toBibleWithDate={toBibleWithDate}
              />
            ))
          )}
        </PageTransition>
      </div>
    </>
  )
}

export default Guide
