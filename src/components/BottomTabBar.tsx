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
              ? 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
              : 'bg-white text-green-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 mr-4 items-center justify-center rounded-full focus:outline-none`}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/')}
        >
          <HomeIcon className="w-6" />
          {router.pathname === '/' && (
            <p className="ml-2 tracking-wider">Beranda</p>
          )}
        </motion.button>
        <motion.button
          aria-label="Baca"
          animate={router.pathname === '/read' ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname === '/read'
              ? 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
              : 'bg-white text-green-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 mr-4 items-center justify-center rounded-full focus:outline-none`}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/read')}
        >
          <OpenBookIcon className="w-6" />
          {router.pathname === '/read' && (
            <p className="ml-2 tracking-wider">Baca</p>
          )}
        </motion.button>
        <motion.button
          aria-label="Panduan"
          animate={router.pathname === '/guide' ? 'open' : 'close'}
          variants={motionVariants}
          className={`flex ${
            router.pathname === '/guide'
              ? 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
              : 'bg-white text-green-900 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-white'
          } shadow-md p-4 items-center justify-center rounded-full focus:outline-none`}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/guide')}
        >
          <BookIcon className="w-6" />
          {router.pathname === '/guide' && (
            <p className="ml-2 tracking-wider">Panduan</p>
          )}
        </motion.button>
      </div>
    </footer>
  )
}

export default BottomTabBar
