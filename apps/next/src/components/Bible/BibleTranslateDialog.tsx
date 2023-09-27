import { motion } from 'framer-motion-10'
import { useMediaPredicate } from 'react-media-hook'
import Sheet from 'react-modal-sheet'

interface BibleTranslateDialogProps {
  openTranslate: boolean
  bibleVersion: string
  handleCloseTranslate: () => void
  changeVersion: (_: string) => void
}

export default function BibleTranslateDialog({
  openTranslate,
  bibleVersion,
  handleCloseTranslate,
  changeVersion,
}: BibleTranslateDialogProps) {
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
          <h3 className="mx-4 mb-2 text-xl font-bold text-gray-800 dark:text-white sm:mx-auto sm:max-w-md">
            Pilih Terjemahan
          </h3>
        </Sheet.Header>
        <Sheet.Content>
          <div className="overflow-auto">
            <h4 className="mt-4 px-4 font-medium tracking-wide text-gray-500 dark:text-white">
              Bahasa Indonesia
            </h4>
            {['tb', 'bis', 'fayh', 'vmd'].map((item) => (
              <div
                key={item}
                className={`mx-4 my-4 transform cursor-pointer rounded-lg p-4 font-medium shadow transition duration-300 ${
                  bibleVersion === item
                    ? 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
                    : 'bg-white text-gray-600 hover:bg-emerald-300 hover:text-emerald-900 dark:bg-gray-600 dark:text-white dark:hover:bg-emerald-700'
                } ${
                  // Commented for future use
                  // item === 'vmd' && 'flex items-center justify-between'
                  ''
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
                {/* Commented for future use */}
                {/* {item === 'vmd' && (
                  <span
                    className={`rounded py-1 px-2 text-sm tracking-wide ${
                      bibleVersion === item
                        ? 'bg-white text-emerald-700'
                        : 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
                    }`}
                  >
                    BARU!
                  </span>
                )} */}
              </div>
            ))}
            <h4 className="mt-6 px-4 font-medium tracking-wide text-gray-500 dark:text-white">
              Bahasa Inggris
            </h4>
            {['msg', 'nkjv', 'amp', 'niv'].map((item) => (
              <div
                key={item}
                className={`mx-4 my-4 transform cursor-pointer rounded-lg p-4 font-medium shadow transition duration-300 ${
                  bibleVersion === item
                    ? 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
                    : 'bg-white text-gray-600 hover:bg-emerald-300 hover:text-emerald-900 dark:bg-gray-600 dark:text-white dark:hover:bg-emerald-700'
                } ${
                  // Commented for future use
                  // (item === 'amp' || item === 'niv') &&
                  // 'flex items-center justify-between'
                  ''
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
                {/* Commented for future use */}
                {/* {(item === 'amp' || item === 'niv') && (
                  <span
                    className={`rounded py-1 px-2 text-sm tracking-wide ${
                      bibleVersion === item
                        ? 'bg-white text-emerald-700'
                        : 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
                    }`}
                  >
                    BARU!
                  </span>
                )} */}
              </div>
            ))}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={handleCloseTranslate} />
    </Sheet>
  )
}
