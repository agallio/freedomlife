// 3rd Party Libs
import { motion } from 'framer-motion'
import { useMediaPredicate } from 'react-media-hook'
import Sheet from 'react-modal-sheet'

// Types
import type { BibleTranslateDialogProps } from '@/types/components'

const BibleTranslateDialog = ({
  openTranslate,
  bibleVersion,
  handleCloseTranslate,
  changeVersion,
}: BibleTranslateDialogProps): JSX.Element => {
  const mediaLandscape = useMediaPredicate('(orientation: landscape)')

  return (
    <Sheet isOpen={openTranslate} onClose={handleCloseTranslate}>
      <Sheet.Container
        style={{
          height: !mediaLandscape
            ? 'calc(100% - env(safe-area-inset-top) - 5%)'
            : 'calc(100% - env(safe-area-inset-top) - 32px)',
        }}
      >
        <Sheet.Header>
          <div className="react-modal-sheet-header">
            <motion.span className="react-modal-sheet-drag-indicator" />
          </div>
          <h3 className="mx-4 mb-2 text-green-700 font-bold text-xl sm:max-w-md sm:mx-auto dark:text-white">
            Pilih Terjemahan
          </h3>
        </Sheet.Header>
        <Sheet.Content>
          <div className="overflow-auto">
            <h4 className="px-4 mt-4 tracking-wide text-green-700 dark:text-white">
              Bahasa Indonesia
            </h4>
            {['tb', 'bis', 'fayh', 'vmd'].map((item) => (
              <div
                key={item}
                className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                  bibleVersion === item
                    ? 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
                    : 'bg-white text-green-700 hover:bg-green-300 hover:text-green-900 dark:bg-gray-600 dark:text-white dark:hover:bg-green-700'
                } ${
                  item === 'vmd' && 'flex justify-between items-center'
                } sm:mx-1`}
                onClick={() => changeVersion(item)}
              >
                <span>
                  {item === 'tb'
                    ? 'Terjemahan Baru (TB)'
                    : item === 'bis'
                    ? 'Bahasa Indonesia Sehari-Hari (BIS)'
                    : item === 'fayh'
                    ? 'Firman Allah Yang Hidup (FAYH)'
                    : 'Versi Mudah Dibaca (VMD)'}
                </span>
                {item === 'vmd' && (
                  <span
                    className={`py-1 px-2 text-sm rounded tracking-wide ${
                      bibleVersion === item
                        ? 'bg-white text-green-700'
                        : 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
                    }`}
                  >
                    BARU!
                  </span>
                )}
              </div>
            ))}
            <h4 className="px-4 mt-6 tracking-wide text-green-700 dark:text-white">
              Bahasa Inggris
            </h4>
            {['msg', 'nkjv', 'amp', 'niv'].map((item) => (
              <div
                key={item}
                className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                  bibleVersion === item
                    ? 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
                    : 'bg-white text-green-700 hover:bg-green-300 hover:text-green-900 dark:bg-gray-600 dark:text-white dark:hover:bg-green-700'
                } ${
                  (item === 'amp' || item === 'niv') &&
                  'flex justify-between items-center'
                } sm:mx-1`}
                onClick={() => changeVersion(item)}
              >
                <span>
                  {item === 'msg'
                    ? 'The Message (MSG)'
                    : item === 'nkjv'
                    ? 'New King James Version (NKJV)'
                    : item === 'amp'
                    ? 'Amplified Bible (AMP)'
                    : 'New International Version (NIV)'}
                </span>
                {(item === 'amp' || item === 'niv') && (
                  <span
                    className={`py-1 px-2 text-sm rounded tracking-wide ${
                      bibleVersion === item
                        ? 'bg-white text-green-700'
                        : 'bg-green-300 dark:bg-green-700 text-green-900 dark:text-white'
                    }`}
                  >
                    BARU!
                  </span>
                )}
              </div>
            ))}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={handleCloseTranslate} />
    </Sheet>
  )
}

export default BibleTranslateDialog
