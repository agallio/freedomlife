import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

// Components
import JumboHeader from '~/components/JumboHeader'
import PageTransition from '~/components/PageTransition'
import GuideLoading from '~/components/Guide/GuideLoading'
import GuideItem from '~/components/Guide/GuideItem'
const GuideError = dynamic(() => import('~/components/Guide/GuideError'))
const GuideMonthDialog = dynamic(
  () => import('~/components/Guide/GuideMonthDialog'),
)

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
    Router.push('/read')
    localStorage.setItem('in_guide', 'true')
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    refetch()
  }, [monthNumber])

  return (
    <>
      <Head>
        <title>Panduan Baca — freedomlife</title>
      </Head>
      <NextSeo
        title="Panduan Baca — freedomlife"
        description="Halaman daftar panduan baca bulan ini. Anda dapat melihat panduan baca dan membaca panduan langsung dari aplikasi."
        openGraph={{
          url: 'https://freedomlife.id/guide',
          title: 'Panduan Baca — freedomlife',
          description:
            'Halaman daftar panduan baca bulan ini. Anda dapat melihat panduan baca dan membaca panduan langsung dari aplikasi.',
          site_name: 'freedomlife',
          images: [
            {
              url: 'https://freedomlife.id/images/og-guide.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Panduan Baca Bulan Ini'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="mx-auto mb-20 max-w-sm p-6 sm:max-w-md sm:py-6">
        <JumboHeader />

        <button
          className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-lg border bg-white px-4 py-2 shadow-md focus:ring-1 focus:ring-gray-400 dark:border-0 dark:bg-gray-600 lg:focus:ring-0"
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

        <GuideMonthDialog
          open={openMonthDialog}
          monthNumber={monthNumber}
          setMonthNumber={setMonthNumber}
          onClose={() => {
            document.body.style.overflow = 'visible'
            setOpenMonthDialog(false)
          }}
        />
      </div>
    </>
  )
}

export default Guide
