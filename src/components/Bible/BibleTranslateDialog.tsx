import { motion } from 'framer-motion'
import { useMediaPredicate } from 'react-media-hook'
import Sheet from 'react-modal-sheet'

import type { BibleTranslateDialogProps } from '@/types/components'

const BibleTranslateDialog = ({
  openTranslate,
  inGuide,
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
            ? 'calc(100% - env(safe-area-inset-top) - 30%)'
            : 'calc(100% - env(safe-area-inset-top) - 32px)',
        }}
      >
        <Sheet.Header>
          <div className="react-modal-sheet-header">
            <motion.span className="react-modal-sheet-drag-indicator" />
          </div>
          <h3
            className={`mx-4 ${
              inGuide ? '' : 'mb-2'
            } text-green-700 font-bold text-xl sm:max-w-md sm:mx-auto dark:text-white`}
          >
            Pilih Terjemahan
          </h3>
        </Sheet.Header>
        <Sheet.Content>
          <div className="overflow-auto">
            {['tb', 'bis', 'fayh', 'msg', 'nkjv'].map((item) => (
              <div
                key={item}
                className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                  bibleVersion === item
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500'
                } sm:mx-1`}
                onClick={() => changeVersion(item)}
              >
                {item === 'tb'
                  ? 'Terjemahan Baru (TB)'
                  : item === 'bis'
                  ? 'Bahasa Indonesia Sehari-Hari (BIS)'
                  : item === 'fayh'
                  ? 'Firman Allah Yang Hidup (FAYH)'
                  : item === 'msg'
                  ? 'The Message (MSG)'
                  : 'New King James Version (NKJV)'}
              </div>
            ))}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  )
}

export default BibleTranslateDialog
