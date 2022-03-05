import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

// Components
import JumboHeader from '~/components/JumboHeader'
import GuideLoading from '~/components/Guide/GuideLoading'
import GuideItem from '~/components/Guide/GuideItem'
import GuideError from '~/components/Guide/GuideError'
import GuideMonthDialog from '~/components/Guide/GuideMonthDialog'
import PageTransition from '~/components/PageTransition'

// Icon Components
import ChevronDownIcon from '~/components/Icons/ChevronDownIcon'

// Context
import { useGuide } from '~/contexts/GuideContext'

// Utils
import { useGuides } from '~/utils/hooks/useFetchedGuide'
import { monthList } from '~/utils/constants'
import dayjs from '~/utils/dayjs'

const Guide: NextPage = () => {
  const [openMonthDialog, setOpenMonthDialog] = useState(false)
  const [monthNumber, setMonthNumber] = useState(dayjs().format('MM'))

  const { setGuideDate } = useGuide()

  const { data, isLoading, isError, refetch } = useGuides({
    month: monthNumber,
  })

  const toBibleWithDate = (date: string) => {
    setGuideDate(date)
    Router.push('/read?guide=true')
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    refetch()
  }, [monthNumber])

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
        <JumboHeader subtitle="Panduan Baca Bulan:" />

        <button
          className="w-full flex items-center justify-between px-4 py-2 mt-2 shadow-md rounded-lg border cursor-pointer bg-white dark:bg-gray-600 dark:border-0 focus:ring-1 focus:ring-gray-400 lg:focus:ring-0"
          onClick={() => {
            document.body.style.overflow = 'hidden'
            setOpenMonthDialog(true)
          }}
        >
          <span>
            {monthList.find((item) => item.value === monthNumber)?.name || ''}
          </span>
          <ChevronDownIcon className="w-6 text-gray-500 dark:bg-gray-600 dark:text-white sm:hover:text-opacity-50" />
        </button>

        <GuideMonthDialog
          open={openMonthDialog}
          monthNumber={monthNumber}
          setMonthNumber={setMonthNumber}
          onClose={() => {
            document.body.style.overflow = 'visible'
            setOpenMonthDialog(false)
          }}
        />

        <PageTransition>
          {isError ? (
            <GuideError monthNumber={monthNumber} />
          ) : !data || isLoading ? (
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
