import { BottomSheet } from 'react-spring-bottom-sheet'

import type { BibleTranslateDialogProps } from '@/types/components'

const BibleTranslateDialog = ({
  openTranslate,
  bibleVersion,
  handleCloseTranslate,
  changeVersion,
}: BibleTranslateDialogProps): JSX.Element => (
  <BottomSheet
    open={openTranslate}
    onDismiss={handleCloseTranslate}
    snapPoints={({ minHeight }) => minHeight}
    style={{ position: 'fixed', zIndex: 40 }}
  >
    <div>
      <div className="pb-3 border-b border-gray-200 text-center dark:border-gray-600">
        <h3 className="text-green-700 font-bold text-xl sm:mx-0 dark:text-white">
          Pilih Terjemahan
        </h3>
      </div>

      <div className="sm:px-4">
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
      </div>
    </div>
  </BottomSheet>
)

export default BibleTranslateDialog
