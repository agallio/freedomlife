import { BottomSheet } from 'react-spring-bottom-sheet'

import MinusIcon from '../Icons/MinusIcon'
import PlusIcon from '../Icons/PlusIcon'

import type { BibleSettingDialogProps } from '@/types/components'

const BibleSettingDialog = ({
  openSetting,
  verseFontSize,
  getFontSizeName,
  handleMinusFontSize,
  handlePlusFontSize,
  setVerseFontSize,
  handleCloseSetting,
}: BibleSettingDialogProps): JSX.Element => (
  <BottomSheet
    open={openSetting}
    onDismiss={handleCloseSetting}
    snapPoints={({ minHeight }) => minHeight}
    style={{ position: 'fixed', zIndex: 40 }}
  >
    <div className="pb-4">
      <div className="pb-3 border-b border-gray-200 text-center dark:border-gray-600">
        <h3 className="text-green-700 font-bold text-xl sm:mx-0 dark:text-white">
          Pengaturan
        </h3>
      </div>

      <div className="p-4">
        <p className="text-green-700 dark:text-white">Ukuran Teks</p>

        <div className="flex items-center justify-between">
          <button
            aria-label="Kecilkan"
            className="text-green-600 transition transform duration-300 hover:text-green-700 focus:outline-none disabled:opacity-50 dark:text-white dark:disabled:opacity-50"
            onClick={handleMinusFontSize}
            disabled={verseFontSize === 'sm'}
          >
            <MinusIcon className="w-6" />
          </button>
          <div className="w-full text-center border-2 border-green-600 py-2 mx-2 my-2 rounded-lg text-green-600 font-bold tracking-widest dark:text-white dark:border-white">
            {getFontSizeName}
          </div>
          <button
            aria-label="Besarkan"
            className="text-green-600 transition transform duration-300 hover:text-green-700 focus:outline-none disabled:opacity-50 dark:text-white dark:disabled:opacity-50"
            onClick={handlePlusFontSize}
            disabled={verseFontSize === '3xl'}
          >
            <PlusIcon className="w-6" />
          </button>
        </div>
        <button
          className="text-sm underline text-green-700 cursor-pointer transition transform duration-300 hover:text-green-800 focus:outline-none dark:text-white"
          onClick={() => setVerseFontSize('base')}
        >
          Kembalikan Ke Setelan Awal
        </button>
      </div>
    </div>
  </BottomSheet>
)

export default BibleSettingDialog
