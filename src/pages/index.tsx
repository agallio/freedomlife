// Core
import { useEffect, useState } from 'react'
import Router from 'next/router'

// Components
import JumboHeader from '~/components/JumboHeader'
import HomeBox from '~/components/Home/HomeBox'
import HomeCard from '~/components/Card/HomeCard'
import NewUserBox from '~/components/Home/NewUserBox'
import NewTranslationBox from '~/components/Home/NewTranslationBox'
import BirthdayDialog from '~/components/Dialog/BirthdayDialog'
// import FeedbackBox from '~/components/Home/FeedbackBox'
import Footer from '~/components/Footer'

// Context
import { useGuide } from '../store/Guide'

// Utils
import dayjs from '~/utils/dayjs'

// Utils —— Hooks
import { useGuideByDate } from '~/utils/hooks/useFetchedGuide'
import useLocalStorage from '~/utils/hooks/useLocalStorage'

const Home = (): JSX.Element => {
  // Context
  const {
    guideState: { guideData, guideDate },
    guideDispatch,
  } = useGuide()

  // State
  const [isBirthdayOpen, setBirthdayOpen] = useState(false)
  const [isBirthdayViewed, setBirthdayViewed] = useLocalStorage(
    'birthday-viewed',
    false
  )

  // Query
  const { data, isLoading, isError, isGuideError, refetch } = useGuideByDate({
    home: true,
  })

  // Method
  const toBible = () => {
    guideDispatch({ type: 'SET_GUIDE_DATE', data: '' })
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

    if (!guideData.date) {
      refetch()
      return
    }

    if (guideDate !== '' && guideDate !== dayjs().format('DD-MM-YYYY')) {
      refetch()
    }
  }, [])

  useEffect(() => {
    if (!isBirthdayViewed) {
      if (dayjs().format('DD-MM-YYYY') === '13-02-2022') {
        setBirthdayOpen(true)
      }
    }
  }, [isBirthdayViewed])

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
                FreedomLife sedang dalam masa perbaikan. Mohon tunggu beberapa
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
        {isError && !isGuideError ? null : <NewTranslationBox />}

        <HomeBox
          data={data}
          isLoading={isLoading}
          isGuideError={isGuideError}
          toBible={toBible}
        />

        {isError && !isGuideError ? null : (
          <>
            <NewUserBox />
            {/* <FeedbackBox /> */}
            <BirthdayDialog
              isOpen={isBirthdayOpen}
              handleClose={() => {
                setBirthdayOpen(false)
                setBirthdayViewed(true)
              }}
            />
          </>
        )}
      </main>

      {isError && !isGuideError ? null : <Footer />}
    </div>
  )
}

export default Home
