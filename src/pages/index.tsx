import { NextPage } from 'next'
import { useEffect } from 'react'
import Router from 'next/router'

// Components
import JumboHeader from '~/components/JumboHeader'
import HomeBox from '~/components/Home/HomeBox'
import HomeCard from '~/components/Home/HomeCard'
import NewUserBox from '~/components/Home/NewUserBox'
// import NewTranslationBox from '~/components/Home/NewTranslationBox'
import NoticeBox from '~/components/Home/NoticeBox'
import Footer from '~/components/Footer'

// Context
import { useGuide } from '~/contexts/GuideContext'

// Utils
import dayjs from '~/utils/dayjs'
import { useGuideByDate } from '~/utils/hooks/useFetchedGuide'
import { useFlagData } from '~/utils/hooks/useFetchedFlags'

const Home: NextPage = () => {
  // Context
  const { guideData, guideDate, setGuideDate } = useGuide()

  // Query
  const { data, isError, isGuideError, refetch } = useGuideByDate({
    home: true,
  })
  const { data: flagData, isLoading: isFlagDataLoading } =
    useFlagData('2023_notice')

  // Constant
  const showNotice = flagData?.enable && !flagData.context.no_data

  // Method
  const toBible = () => {
    setGuideDate('')
    if (isGuideError) {
      Router.push('/read/kej/1')
    } else {
      Router.push('/read')
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // Lifecycles —— Side Effects
  useEffect(() => {
    if (!data) {
      refetch()
      return
    }

    if (!guideData?.date) {
      refetch()
      return
    }

    if (guideDate !== '' && guideDate !== dayjs().format('DD-MM-YYYY')) {
      refetch()
    }
  }, [])

  if (isError && !isGuideError) {
    return (
      <div className="max-w-sm p-6 mx-auto mb-28 sm:max-w-md sm:py-6 landscape:mx-auto">
        <JumboHeader isHome />

        <main>
          <HomeCard
            top="6"
            className="bg-gradient-to-l from-purple-400 via-pink-500 to-red-500"
          >
            <p className="px-4 py-4 text-sm">
              <b>
                freedomlife sedang dalam masa perbaikan. Mohon tunggu beberapa
                saat lagi.
              </b>
            </p>
          </HomeCard>
        </main>
      </div>
    )
  }

  return (
    <div className="max-w-sm p-6 mx-auto mb-28 sm:max-w-md sm:py-6 landscape:mx-auto">
      <JumboHeader isHome />

      <main>
        {showNotice && <NoticeBox />}

        <HomeBox
          top={isFlagDataLoading ? '2' : showNotice ? '6' : '2'}
          data={data}
          isGuideError={isGuideError}
          toBible={toBible}
        />

        {isError && !isGuideError ? null : (
          <>
            <NewUserBox />
            {/* <FeedbackBox /> */}
            {/* <BirthdayDialog
              isOpen={isBirthdayOpen}
              handleClose={() => {
                setBirthdayOpen(false)
                setBirthdayViewed(true)
              }}
            /> */}
          </>
        )}
      </main>

      {isError && !isGuideError ? null : <Footer />}
    </div>
  )
}

export default Home
