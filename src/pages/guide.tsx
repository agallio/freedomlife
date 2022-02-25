import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

// Components
import JumboHeader from '~/components/JumboHeader'
import GuideLoading from '~/components/Guide/GuideLoading'
import GuideItem from '~/components/Guide/GuideItem'
import GuideError from '~/components/Guide/GuideError'
import PageTransition from '~/components/PageTransition'

// Context
import { useGuide } from '~/contexts/GuideContext'

// Utils
import { useGuides } from '~/utils/hooks/useFetchedGuide'

const Guide: NextPage = () => {
  const { setGuideDate } = useGuide()

  const { data, isError } = useGuides()

  const toBibleWithDate = (date: string) => {
    setGuideDate(date)
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

      <div className="max-w-sm p-6 mx-auto mb-20 sm:max-w-md sm:py-6">
        <JumboHeader subtitle="Panduan Baca Bulan Ini" />

        <PageTransition>
          {isError ? (
            <GuideError />
          ) : !data ? (
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
