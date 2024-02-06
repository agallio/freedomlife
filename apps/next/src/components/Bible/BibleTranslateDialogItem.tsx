import { useMemo } from 'react'
import { Variants, motion } from 'framer-motion-10'
import clsx from 'clsx'
import toast from 'react-hot-toast'

// Icon Components
import CheckIcon from '../Icons/CheckIcon'
import LoadingIcon from '../Icons/LoadingIcon'

// Utils
import { useBibleLocalDatabase } from '~/contexts/BibleLocalDatabaseContext'
import { useBibleLocalMutation } from '~/utils/hooks/useBibleLocalMutation'
import { checkTheme } from '~/utils/hooks/useDynamicTheme'

const translationNames = {
  tb: 'Terjemahan Baru (TB)',
  bis: 'Bahasa Indonesia Sehari-Hari (BIS)',
  fayh: 'Firman Allah Yang Hidup (FAYH)',
  vmd: 'Versi Mudah Dibaca (VMD)',
  msg: 'The Message (MSG)',
  nkjv: 'New King James Version (NKJV)',
  amp: 'Amplified Bible (AMP)',
  niv: 'New International Version (NIV)',
}

export interface BibleTranslateDialogProps {
  inGuide: boolean
  openTranslate: boolean
  bibleVersion: string
  handleCloseTranslate: () => void
  changeVersion: (_: string) => void
}

export function BibleTranslateDialogItem({
  item,
  inGuide,
  bibleVersion,
  changeVersion,
}: {
  item: string
  inGuide: BibleTranslateDialogProps['inGuide']
  bibleVersion: BibleTranslateDialogProps['bibleVersion']
  changeVersion: BibleTranslateDialogProps['changeVersion']
}) {
  const theme = checkTheme()

  // Contexts
  const { downloadedData } = useBibleLocalDatabase()

  // Mutations
  const bibleLocalMutation = useBibleLocalMutation({
    version: item,
    versionTranslation: translationNames[item],
  })

  // Constants
  const isDownloaded = downloadedData[item]

  const variants: Variants = {
    initial: {
      width: '5rem',
    },
    pending: {
      width: '6.25rem',
    },
    success: {
      width: 36,
    },
  }

  // Memoized Variables
  const status = useMemo(() => {
    if (isDownloaded) {
      return 'success'
    }

    if (bibleLocalMutation.status === 'pending') {
      return 'pending'
    }

    if (bibleLocalMutation.status === 'success' || isDownloaded) {
      return 'success'
    }

    return 'initial'
  }, [bibleLocalMutation.status, isDownloaded])

  return (
    <div
      className={clsx(
        'mx-4 my-4 flex transform cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 font-medium shadow transition duration-300 sm:mx-1',
        bibleVersion === item
          ? 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
          : 'bg-white text-gray-600 dark:bg-gray-600 dark:text-white md:hover:bg-emerald-300 md:hover:text-emerald-900 dark:md:hover:bg-emerald-700',
      )}
      onClick={() => changeVersion(item)}
    >
      <span className="flex-1">{translationNames[item]}</span>

      {!inGuide && (
        <div className="flex w-[33%] flex-initial items-center justify-end">
          <motion.button
            className={clsx(
              'flex items-center justify-center rounded-full py-2 text-sm font-bold uppercase transition duration-300 focus:outline-none dark:bg-white dark:bg-opacity-20 md:hover:bg-opacity-30',

              // Active
              bibleVersion === item
                ? 'bg-emerald-700 text-white'
                : 'bg-gray-200',
              bibleVersion === item &&
                status === 'pending' &&
                'bg-opacity-20 text-opacity-60 dark:bg-opacity-10 dark:text-opacity-40',

              // Default
              bibleVersion !== item && status === 'pending' && 'bg-opacity-50',
            )}
            animate={status}
            variants={variants}
            onClick={(e) => {
              e.stopPropagation()

              if (status === 'success') {
                toast.success(
                  `Alkitab ${translationNames[item]} telah diunduh`,
                  {
                    style:
                      theme === 'dark'
                        ? { background: '#111827', color: '#ffffff' }
                        : {},
                  },
                )
                return
              }

              if (!isDownloaded) {
                bibleLocalMutation.mutate()

                // @ts-ignore
                if (window.umami) {
                  // @ts-ignore
                  window.umami.track(`download-bible-${item}`)
                }
              }
            }}
            disabled={status === 'pending'}
          >
            {status === 'success' ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <div className="flex items-center gap-1">
                <motion.p
                  key={`${status}-unduh`}
                  initial={{ x: 10 }}
                  animate={{ x: 0 }}
                  style={{
                    opacity:
                      bibleVersion !== item && status === 'pending' ? 0.3 : 1,
                  }}
                >
                  Unduh
                </motion.p>

                {status === 'pending' && (
                  <motion.span
                    key={`${status}-icon`}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: bibleVersion !== item ? 0.3 : 1 }}
                  >
                    <LoadingIcon className="h-4 w-4 animate-spin" />
                  </motion.span>
                )}
              </div>
            )}
          </motion.button>
        </div>
      )}
    </div>
  )
}
