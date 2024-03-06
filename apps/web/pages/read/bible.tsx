import { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

// Screen
import { ReadScreen } from '@repo/app/features/read'

// Components
import ReadNavbar from '@repo/app/features/read/components/read-navbar'

// Contexts
import { ReadLocalDatabaseWebProvider } from '@repo/app/features/read/local-databases/web/index.web'

// Utils
import { passageData } from '@repo/app/utils/constants'

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
  const router = useRouter()

  // Constants
  const chapterQuery = router.query.chapter as string
  const abbrQuery = chapterQuery?.split('-')[0] || ''
  const chapterNumberQuery = chapterQuery?.split('-')[1] || ''

  // Memoized Values
  const bibleDetail = useMemo(() => {
    return passageData.slice(1).find((i) => i.abbr === abbrQuery)
  }, [abbrQuery])

  // Effects
  useEffect(() => {
    // Handle if the required chapter query is missing,
    // when users refresh the page or directly accessing this page.
    if (router.isReady) {
      if (!chapterQuery) {
        router.push(`${router.pathname}?chapter=kej-1`)
      }
    }
  }, [router.isReady, chapterQuery])

  return (
    <>
      <ReadNavbar />
      <Head>
        <title>
          {bibleDetail
            ? `${bibleDetail.name} ${chapterNumberQuery} — freedomlife`
            : 'freedomlife'}
        </title>
      </Head>
      <NextSeo noindex />

      <ReadLocalDatabaseWebProvider>
        <div className="mx-auto mt-16 flex w-full max-w-sm flex-col sm:max-w-xl">
          <ReadScreen />
        </div>

        {/* Modals */}
        <TranslateScreen />
        <PassageScreen />
        <SettingScreen />
      </ReadLocalDatabaseWebProvider>
    </>
  )
}
