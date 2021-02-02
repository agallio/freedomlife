import { useEffect, useState } from 'react'
import Router from 'next/router'
import { AnimatePresence } from 'framer-motion'

import JumboHeader from '@/components/JumboHeader'
import HomeBox from '@/components/Home/HomeBox'
import NewYearBox from '@/components/Home/NewYearBox'
import NewYearDialog from '@/components/Home/NewYearDialog'

import { useDispatchGuide } from '../store'

import dayjs from '@/utils/dayjs'
import useRequest from '@/utils/hooks/useRequest'

import type { ApiResponse, GuideDataResponse } from '@/types/api'
import NewUserBox from '@/components/Home/NewUserBox'

const Home: React.FC = () => {
  const guideDispatch = useDispatchGuide()
  const [open, setOpen] = useState(false)

  const { data } = useRequest<ApiResponse<GuideDataResponse>>({
    url: `/api/guide/${dayjs().format('DD-MM-YYYY')}`,
  })

  const toBible = () => {
    guideDispatch({ type: 'SET_GUIDE_DATE', data: '' })
    guideDispatch({ type: 'SET_GUIDE_PASSAGE', data: '' })
    Router.push('/read?guide=true')
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <div className="max-w-sm p-6 mx-auto mb-20 sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
      <JumboHeader
        isHome
        title="FreedomLife"
        subtitle="Panduan Baca Alkitab Setahun"
      />

      <main>
        <HomeBox data={data} toBible={toBible} />

        <NewUserBox />

        <NewYearBox handleOpen={() => setOpen(true)} />

        <AnimatePresence>
          {open && <NewYearDialog handleClose={() => setOpen(false)} />}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Home
