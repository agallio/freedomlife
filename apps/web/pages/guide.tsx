import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import * as Burnt from 'burnt'
import { CheckCircleIcon } from 'react-native-heroicons/outline'

// Components
import Drawer from '@repo/app/components/drawer'
import GuideList from '@repo/app/features/guide/components/guide-list'
import GuideMonthButton from '@repo/app/features/guide/components/guide-month-button'
import GuideMonthList from '@repo/app/features/guide/components/guide-month-list'
import { ToasterWebComponent } from '@repo/app/components/toaster-container.web'

// Icon Components
import FreedomlifeIcon from '@repo/app/components/icons/freedomlife-icon'

// Contexts
import {
  GuideModalsContextProvider,
  useGuideModalsContext,
} from '@repo/app/features/guide/contexts/guide-modals.context'
import {
  useReadPassageGeneralContext,
  useReadPassagePersistedContext,
} from '@repo/app/features/read/contexts/read-passage.context'

// Queries
import { useGuideByMonthQuery } from '@repo/app/hooks/use-guide-query'

// Utils
import dayjs from '@repo/app/utils/dayjs'

export default function GuidePage() {
  const router = useRouter()
  const { setGuidedEnabled } = useReadPassagePersistedContext()
  const selectedGuideMonth = useReadPassageGeneralContext(
    (state) => state.selectedGuideMonth,
  )
  const { setGuidedDate, setGuidedSelectedPassage, setSelectedBibleVersion } =
    useReadPassageGeneralContext((state) => state.actions)

  // Queries
  const queryData = useGuideByMonthQuery(selectedGuideMonth)

  // Methods
  const getGuideHasBeenRead = (date: string) => {
    return localStorage.getItem(`read-${date}`) !== null
  }

  const onGuideClick = (date: string) => {
    setGuidedEnabled(true)
    setGuidedDate(date)
    setGuidedSelectedPassage('pl-1')
    setSelectedBibleVersion('tb')
    router.push('/read')
  }

  const onCheckMarkClick = (date: string) => {
    Burnt.toast({
      preset: 'done',
      duration: 1.5,
      // @ts-ignore
      title: (
        <ToasterWebComponent
          icon={
            <CheckCircleIcon
              size={24}
              className="text-emerald-900 dark:text-white"
            />
          }
          title="Panduan Telah Dibaca"
          message={dayjs(date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
        />
      ),
    })
  }

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

      <GuideModalsContextProvider>
        <div className="mx-auto flex w-full max-w-sm flex-col px-6 pb-28 pt-4 sm:max-w-md">
          <div className="flex pb-4">
            <FreedomlifeIcon className="w-[230px]" />
          </div>

          <GuideMonthButtonWrapper />

          <GuideList
            queryData={queryData}
            getGuideHasBeenRead={getGuideHasBeenRead}
            onGuideClick={onGuideClick}
            onCheckMarkClick={onCheckMarkClick}
          />
        </div>

        <GuideMonthModal />
      </GuideModalsContextProvider>
    </>
  )
}

function GuideMonthButtonWrapper() {
  const { setOpenGuideMonth } = useGuideModalsContext()

  return (
    <GuideMonthButton
      redirectToGuideMonthScreen={() => setOpenGuideMonth(true)}
    />
  )
}

function GuideMonthModal() {
  const { openGuideMonth, setOpenGuideMonth } = useGuideModalsContext()
  const selectedGuideMonth = useReadPassageGeneralContext(
    (state) => state.selectedGuideMonth,
  )
  const { setSelectedGuideMonth } = useReadPassageGeneralContext(
    (state) => state.actions,
  )

  const onMonthClick = (monthString: string) => {
    setSelectedGuideMonth(monthString)
    setOpenGuideMonth(false)
  }

  return (
    <Drawer
      open={openGuideMonth}
      title="Pilih Bulan Panduan"
      setOpen={setOpenGuideMonth}
    >
      <GuideMonthList
        selectedGuideMonth={selectedGuideMonth}
        onMonthClick={onMonthClick}
      />
    </Drawer>
  )
}
