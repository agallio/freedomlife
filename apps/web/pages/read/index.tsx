import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

// Screen
import { ReadScreen } from '@repo/app/features/read'

// Contexts
import { FeatureFlagsProvider } from '@repo/app/providers/feature-flags'

// Queries
import { useFlagQuery } from '@repo/app/hooks/use-flag-query'

// Components
import ReadNavbar from '@repo/app/features/read/components/read-navbar'

// Lazy-load Modals
const TranslateScreen = dynamic(
  () => import('@repo/app/features/read/modals/translate'),
  { ssr: false },
)
const PassageScreen = dynamic(
  () => import('@repo/app/features/read/modals/passage'),
  { ssr: false },
)
const SettingScreen = dynamic(
  () => import('@repo/app/features/read/modals/setting'),
  { ssr: false },
)

export default function ReadPage() {
  const { data: tsiFlagData, isLoading: tsiFlagLoading } = useFlagQuery({
    name: 'feature_tsi_translation',
    enabled: true,
  })

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

      <ReadNavbar />

      <div className="mx-auto mt-16 flex w-full max-w-sm flex-col sm:max-w-xl">
        <ReadScreen />
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
        <TranslateScreen />
      </FeatureFlagsProvider>
      <PassageScreen />
      <SettingScreen />
    </>
  )
}
