// Core
import Router from 'next/router'
import { useEffect } from 'react'

// 3rd Party Libs
// import { AnimatePresence } from 'framer-motion'

// Components
import JumboHeader from '@/components/JumboHeader'
import HomeBox from '@/components/Home/HomeBox'
import NewUserBox from '@/components/Home/NewUserBox'
import NewTranslationBox from '@/components/Home/NewTranslationBox'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
// import NewYearDialog from '@/components/Home/NewYearDialog'

// Context
import { useGuide } from '../store/Guide'

// Utils —— Hooks
import { useGuideByDate } from '@/utils/hooks/useFetchedGuide'

const Home = (): JSX.Element => {
  // Context
  const { guideDispatch } = useGuide()

  // State
  // const [open, setOpen] = useState(false)

  // Query
  const { data, isLoading, isError, refetch } = useGuideByDate()

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
    refetch()
  }, [])

  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'unset'
  //   }
  // }, [open])

  return (
    <div className="max-w-sm p-6 mx-auto mb-28 sm:max-w-md sm:py-6 md:mb-28 landscape:mx-auto">
      <JumboHeader isHome />

      <PageTransition>
        <main>
          {!isError ? <NewTranslationBox /> : null}

          <HomeBox
            data={data}
            isLoading={isLoading}
            isError={isError}
            toBible={toBible}
          />

          {!isError ? <NewUserBox /> : null}

          {/* <AnimatePresence>
            {open && <NewYearDialog handleClose={() => setOpen(false)} />}
          </AnimatePresence> */}
        </main>

        {!isError ? <Footer /> : null}
      </PageTransition>
    </div>
  )
}

export default Home
