import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

// Screen
import GuideScreen from '@repo/app/features/guide'

// Icon Components
import FreedomlifeIcon from '@repo/app/components/icons/freedomlife-icon'

// Contexts
import { GuideModalsContextProvider } from '@repo/app/features/guide/contexts/guide-modals.context'

// Lazy-load Modals
const GuideMonthScreen = dynamic(
  () => import('@repo/app/features/guide/modals/guide-month'),
  { ssr: false },
)

export default function GuidePage() {
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
        <div className="mx-auto flex w-full max-w-sm flex-col px-6 pt-4 sm:max-w-md">
          <div className="flex pb-4">
            <FreedomlifeIcon className="w-[230px]" />
          </div>

          <GuideScreen />
        </div>

        {/* Modals */}
        <GuideMonthScreen />
      </GuideModalsContextProvider>
    </>
  )
}
