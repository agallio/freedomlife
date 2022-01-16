// Core
import { useRouter } from 'next/router'

// 3rd Party Libs
import { motion } from 'framer-motion'

// Icon Components
import BookIcon from './Icons/BookIcon'
import HomeIcon from './Icons/HomeIcon'
import OpenBookIcon from './Icons/OpenBookIcon'

const BottomTabBar = (): JSX.Element => {
  const router = useRouter()

  const motionVariants = { open: { width: 140 }, close: { width: 55 } }

  const handleChangeRoute = (route: string) => {
    router.push(route)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <footer
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
              ? 'bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-white'
              : 'bg-white text-emerald-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 mr-4 items-center justify-center rounded-full focus:outline-none`}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/')}
        >
          <HomeIcon className="w-6" />
          <motion.p
            animate={router.pathname === '/' ? 'open' : 'close'}
            variants={{
              open: { display: 'flex', opacity: 1 },
              close: { display: 'none', opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="ml-2 tracking-wider"
          >
            Beranda
          </motion.p>
        </motion.button>
        <motion.button
          aria-label="Baca"
          animate={router.pathname.includes('read') ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname.includes('read')
              ? 'bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-white'
              : 'bg-white text-emerald-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 mr-4 items-center justify-center rounded-full focus:outline-none`}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => {
            const getLastChapterRead = localStorage.getItem('last_chapter')
            if (getLastChapterRead) {
              const [passage, chapter] = getLastChapterRead.split('-')
              handleChangeRoute(`/read/${passage}/${chapter}`)
            } else {
              handleChangeRoute('/read/kej/1')
            }
          }}
        >
          <OpenBookIcon className="w-6" />
          <motion.p
            animate={router.pathname.includes('read') ? 'open' : 'close'}
            variants={{
              open: { display: 'flex', opacity: 1 },
              close: { display: 'none', opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="ml-2 tracking-wider"
          >
            Baca
          </motion.p>
        </motion.button>
        <motion.button
          aria-label="Panduan"
          animate={router.pathname === '/guide' ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname === '/guide'
              ? 'bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-white'
              : 'bg-white text-emerald-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 items-center justify-center rounded-full focus:outline-none`}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/guide')}
        >
          <BookIcon className="w-6" />
          <motion.p
            animate={router.pathname === '/guide' ? 'open' : 'close'}
            variants={{
              open: { display: 'flex', opacity: 1 },
              close: { display: 'none', opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="ml-2 tracking-wider"
          >
            Panduan
          </motion.p>
        </motion.button>
      </div>
    </footer>
  )
}

export default BottomTabBar
