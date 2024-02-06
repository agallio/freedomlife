import { useRouter } from 'next/router'
import { motion } from 'framer-motion-10'
import clsx from 'clsx'

// Icon Components
import BookIcon from './Icons/BookIcon'
import HomeIcon from './Icons/HomeIcon'
import OpenBookIcon from './Icons/OpenBookIcon'

export default function BottomTabBar() {
  const router = useRouter()

  const motionVariants = { open: { width: 140 }, close: { width: 55 } }

  const handleChangeRoute = (route: string) => {
    router.push(route)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <footer
      className="fixed bottom-0 left-0 z-10 flex w-full p-6"
      style={{ transition: 'bottom 0.3s' }}
    >
      <div className="mx-auto flex w-full items-center justify-center sm:max-w-md">
        <motion.button
          aria-label="Beranda"
          initial={{ width: router.pathname === '/' ? 140 : 55 }}
          animate={router.pathname === '/' ? 'open' : 'close'}
          variants={motionVariants}
          className={clsx(
            'mr-4 flex items-center justify-center rounded-full p-4 shadow-md focus:outline-none',
            router.pathname === '/'
              ? 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
              : 'bg-white text-emerald-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
          )}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/')}
        >
          <HomeIcon className="w-6" />
          <motion.p
            initial={router.pathname === '/' ? 'open' : 'close'}
            animate={router.pathname === '/' ? 'open' : 'close'}
            variants={{
              open: { display: 'flex', opacity: 1 },
              close: { display: 'none', opacity: 0 },
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="ml-2 tracking-wider"
          >
            Beranda
          </motion.p>
        </motion.button>
        <motion.button
          aria-label="Baca"
          initial={{ width: router.pathname.includes('read') ? 140 : 55 }}
          animate={router.pathname.includes('read') ? 'open' : 'close'}
          variants={motionVariants}
          className={clsx(
            'mr-4 flex items-center justify-center rounded-full p-4 shadow-md focus:outline-none',
            router.pathname.includes('read')
              ? 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
              : 'bg-white text-emerald-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
          )}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => {
            if (!router.pathname.includes('read')) {
              const inGuide = localStorage.getItem('in_guide')
                ? JSON.parse(localStorage.getItem('in_guide')!)
                : false

              if (inGuide) {
                handleChangeRoute('/read')
              } else {
                const getLastChapterRead = localStorage.getItem('last_chapter')
                if (getLastChapterRead) {
                  const [passage, chapter] = getLastChapterRead.split('-')
                  handleChangeRoute(`/read/bible?chapter=${passage}-${chapter}`)
                } else {
                  handleChangeRoute('/read/bible?chapter=kej-1')
                }
              }
            }
          }}
        >
          <OpenBookIcon className="w-6" />
          <motion.p
            initial={router.pathname.includes('read') ? 'open' : 'close'}
            animate={router.pathname.includes('read') ? 'open' : 'close'}
            variants={{
              open: { display: 'flex', opacity: 1 },
              close: { display: 'none', opacity: 0 },
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="ml-2 tracking-wider"
          >
            Baca
          </motion.p>
        </motion.button>
        <motion.button
          aria-label="Panduan"
          initial={{ width: router.pathname === '/guide' ? 140 : 55 }}
          animate={router.pathname === '/guide' ? 'open' : 'close'}
          variants={motionVariants}
          className={clsx(
            'flex items-center justify-center rounded-full p-4 shadow-md focus:outline-none',
            router.pathname === '/guide'
              ? 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
              : 'bg-white text-emerald-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
          )}
          style={{ transition: 'var(--transition-default)' }}
          onClick={() => handleChangeRoute('/guide')}
        >
          <BookIcon className="w-6" />
          <motion.p
            initial={router.pathname === '/guide' ? 'open' : 'close'}
            animate={router.pathname === '/guide' ? 'open' : 'close'}
            variants={{
              open: { display: 'flex', opacity: 1 },
              close: { display: 'none', opacity: 0 },
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="ml-2 tracking-wider"
          >
            Panduan
          </motion.p>
        </motion.button>
      </div>
    </footer>
  )
}
