import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

// Components
import ReadNavbar from '@repo/app/features/read/components/read-navbar'
import ReadTypography from '@repo/app/features/read/components/read-typography'

// Contexts
import { FeatureFlagsProvider } from '@repo/app/providers/feature-flags'
import { useReadModalsWebContext } from '@repo/app/features/read/contexts/read-modals.context.web'

// Queries
import { useFlagQuery } from '@repo/app/hooks/use-flag-query'

// Lazy-load Components
const TranslateModal = dynamic(
  () => import('@repo/app/features/read/modals/translate'),
  { ssr: false },
)
const PassageModal = dynamic(
  () => import('@repo/app/features/read/modals/passage'),
  { ssr: false },
)
const SettingsModal = dynamic(
  () => import('@repo/app/features/read/modals/setting'),
  { ssr: false },
)
const SaverModal = dynamic(
  () => import('@repo/app/features/read/modals/saver'),
  { ssr: false },
)

export default function ReadPage() {
  const router = useRouter()
  const { setOpenPassage, setOpenPassageChapter, setOpenTranslate } =
    useReadModalsWebContext()

  // Queries
  const { data: tsiFlagData, isLoading: tsiFlagLoading } = useFlagQuery({
    name: 'feature_tsi_translation',
    enabled: true,
  })

  // Methods
  const redirectToPassageScreen = () => {
    setOpenPassage(true)
  }

  const redirectToTranslateScreen = () => {
    setOpenTranslate(true)
  }

  const redirectToBiblePassage = (passage: string) => {
    router.push(`/read/bible?chapter=${passage}`)
  }

  const redirectToPassageChapterScreen = () => {
    setOpenPassageChapter(true)
  }

  const handlePassageBack = (abbr?: string) => {
    setOpenPassage(false)

    if (abbr) {
      router.push(`/read/bible?chapter=${abbr}`)
    }
  }

  return (
    <>
      <Head>
        <title>Baca Firman Hari Ini — freedomlife</title>
      </Head>
      <NextSeo
        title="Baca Firman Hari Ini — freedomlife"
        description="Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca."
        openGraph={{
          url: 'https://freedomlife.id/read',
          title: 'Baca Firman Hari Ini — freedomlife',
          description:
            'Halaman untuk membaca Alkitab dengan maupun tanpa panduan. Anda dapat membaca dalam 8 terjemahan yang berbeda. Anda juga dapat menyalin dan membagikan ayat yang Anda baca.',
          site_name: 'freedomlife',
          images: [
            {
              url: 'https://freedomlife.id/images/og-read.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Baca Firman Hari Ini'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <ReadNavbar
        redirectToPassageScreen={redirectToPassageScreen}
        redirectToTranslateScreen={redirectToTranslateScreen}
      />

      <div className="mx-auto mt-16 flex w-full max-w-xl flex-col">
        <ReadTypography redirectToBiblePassage={redirectToBiblePassage} />
      </div>

      {/* Modals */}
      <FeatureFlagsProvider
        featureFlags={{
          feature_tsi_translation: {
            data: tsiFlagData,
            isLoading: tsiFlagLoading,
          },
        }}
      >
        <TranslateModal />
      </FeatureFlagsProvider>
      <PassageModal
        handlePassageBack={handlePassageBack}
        redirectToPassageChapterScreen={redirectToPassageChapterScreen}
      />
      <SettingsModal />
      <SaverModal />
    </>
  )
}
