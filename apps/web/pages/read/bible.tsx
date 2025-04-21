import { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

// Components
import ReadNavbar from '@repo/app/features/read/components/read-navbar'
import ReadTypography from '@repo/app/features/read/components/read-typography'

// Contexts
import { ReadLocalDatabaseWebProvider } from '@repo/app/features/read/local-databases/web/index.web'
import { FeatureFlagsProvider } from '@repo/app/providers/feature-flags'
import { useReadModalsContext } from '@repo/app/features/read/contexts/read-modals.context'

// Queries
import { useFlagQuery } from '@repo/app/hooks/use-flag-query'

// Utils
import { passageData } from '@repo/app/utils/constants'

// Lazy-load Modals
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

export default function ReadPage() {
  const router = useRouter()
  const { setOpenPassage, setOpenPassageChapter, setOpenTranslate } =
    useReadModalsContext()

  // Queries
  const { data: tsiFlagData, isLoading: tsiFlagLoading } = useFlagQuery({
    name: 'feature_tsi_translation',
    enabled: true,
  })

  // Constants
  const chapterQuery = router.query.chapter as string
  const abbrQuery = chapterQuery?.split('-')[0] || ''
  const chapterNumberQuery = chapterQuery?.split('-')[1] || ''

  // Memoized Values
  const bibleDetail = useMemo(() => {
    return passageData.slice(1).find((i) => i.abbr === abbrQuery)
  }, [abbrQuery])

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

  const handlePassageBack = (abbr?: string) => {
    setOpenPassage(false)

    if (abbr) {
      router.push(`/read/bible?chapter=${abbr}`)
    }
  }

  const redirectToPassageChapterScreen = () => {
    setOpenPassageChapter(true)
  }

  const handlePassageChapterBack = (passage: string) => {
    setOpenPassage(false)
    setOpenPassageChapter(false)
    router.push(`/read/bible?chapter=${passage}`)
  }

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
      <ReadNavbar
        redirectToPassageScreen={redirectToPassageScreen}
        redirectToTranslateScreen={redirectToTranslateScreen}
      />

      <Head>
        <title>
          {bibleDetail
            ? `${bibleDetail.name} ${chapterNumberQuery} — freedomlife`
            : 'freedomlife'}
        </title>
      </Head>
      <NextSeo noindex />

      <ReadLocalDatabaseWebProvider>
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
          handlePassageChapterBack={handlePassageChapterBack}
        />
        <SettingsModal />
      </ReadLocalDatabaseWebProvider>
    </>
  )
}
