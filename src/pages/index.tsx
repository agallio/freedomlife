// Core
import Router from 'next/router'

// Components
import JumboHeader from '@/components/JumboHeader'
import HomeBox from '@/components/Home/HomeBox'
import NewUserBox from '@/components/Home/NewUserBox'
import NewTranslationBox from '@/components/Home/NewTranslationBox'
// import FeedbackBox from '@/components/Home/FeedbackBox'
import Footer from '@/components/Footer'

// Context
import { useGuide } from '../store/Guide'

import dayjs from '@/utils/dayjs'

// Utils —— Hooks
import { useGuideByDate } from '@/utils/hooks/useFetchedGuide'
import { useEffect } from 'react'

const Home = (): JSX.Element => {
  // Context
  const {
    guideState: { guideData, guideDate },
    guideDispatch,
  } = useGuide()

  // Query
  const { data, isLoading, isError, refetch } = useGuideByDate({ home: true })

  // Method
  const toBible = () => {
    guideDispatch({ type: 'SET_GUIDE_DATE', data: '' })
    guideDispatch({ type: 'SET_GUIDE_PASSAGE', data: '' })
    Router.push('/read?guide=true')
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // Lifecycles —— Side Effects
  useEffect(() => {
    if (!guideData.date) {
      refetch()
      return
    }

    if (guideDate !== '' && guideDate !== dayjs().format('DD-MM-YYYY')) {
      refetch()
    }
  }, [])

  return (
    <div className="max-w-sm p-6 mx-auto mb-28 sm:max-w-md sm:py-6 md:mb-28 landscape:mx-auto">
      <JumboHeader isHome />

      <main>
        {!isError ? <NewTranslationBox /> : null}

        <HomeBox
          data={data}
          isLoading={isLoading}
          isError={isError}
          toBible={toBible}
        />

        {!isError ? (
          <>
            <NewUserBox />
            {/* <FeedbackBox /> */}
          </>
        ) : null}
      </main>

      {!isError ? <Footer /> : null}
    </div>
  )
}

export default Home
