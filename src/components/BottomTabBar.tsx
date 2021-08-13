import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import BookIcon from './Icons/BookIcon'
import HomeIcon from './Icons/HomeIcon'
import OpenBookIcon from './Icons/OpenBookIcon'

const BottomTabBar = (): JSX.Element => {
  const router = useRouter()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const footerRef = useRef<HTMLElement>(null)

  const motionVariants = { open: { width: 140 }, close: { width: 55 } }

  const handleChangeRoute = (route: string) => {
    router.push(route)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    if (prevScrollPos >= 0 && currentScrollPos >= 0) {
      if (prevScrollPos > currentScrollPos) {
        footerRef.current!.style.bottom = 'env(safe-area-inset-bottom)'
      } else {
        footerRef.current!.style.bottom = '-100px'
      }
    } else {
      footerRef.current!.style.bottom = 'env(safe-area-inset-bottom)'
    }
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    const watchScroll = () => window.addEventListener('scroll', handleScroll)
    watchScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <footer
      ref={footerRef}
      className="fixed flex left-0 bottom-0 w-full p-6 z-10"
      style={{ transition: 'bottom 0.3s' }}
    >
      <div className="flex items-center justify-center w-full mx-auto sm:max-w-md">
        <motion.button
          aria-label="Beranda"
          animate={router.pathname === '/' ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname === '/'
              ? 'bg-green-500 dark:bg-green-500 text-white'
              : 'bg-white text-green-700 transition transform duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 mr-4 items-center justify-center rounded-full focus:outline-none`}
          onClick={() => handleChangeRoute('/')}
        >
          <HomeIcon className="w-6" />
          {router.pathname === '/' && <p className="ml-2">Beranda</p>}
        </motion.button>
        <motion.button
          aria-label="Baca"
          animate={router.pathname === '/read' ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname === '/read'
              ? 'bg-green-500 dark:bg-green-500 text-white'
              : 'bg-white text-green-700 transition transform duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 mr-4 items-center justify-center rounded-full focus:outline-none`}
          onClick={() => handleChangeRoute('/read')}
        >
          <OpenBookIcon className="w-6" />
          {router.pathname === '/read' && <p className="ml-2">Baca</p>}
        </motion.button>
        <motion.button
          aria-label="Panduan"
          animate={router.pathname === '/guide' ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname === '/guide'
              ? 'bg-green-500 dark:bg-green-500 text-white'
              : 'bg-white text-green-700 transition transform duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 items-center justify-center rounded-full focus:outline-none`}
          onClick={() => handleChangeRoute('/guide')}
        >
          <BookIcon className="w-6" />
          {router.pathname === '/guide' && <p className="ml-2">Panduan</p>}
        </motion.button>
      </div>
    </footer>
  )
}

export default BottomTabBar
