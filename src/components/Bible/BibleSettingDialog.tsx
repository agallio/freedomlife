import { useMediaPredicate } from 'react-media-hook'
import Sheet from 'react-modal-sheet'

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
}: BibleSettingDialogProps): JSX.Element => {
  const mediaLandscape = useMediaPredicate('(orientation: landscape)')

  return (
    <Sheet isOpen={openSetting} onClose={handleCloseSetting}>
      <Sheet.Container
        style={{
          height: !mediaLandscape
            ? 'calc(100% - env(safe-area-inset-top) - 60%)'
            : 'calc(100% - env(safe-area-inset-top) - 30%)',
        }}
      >
        <Sheet.Header />
        <Sheet.Content>
          <h3 className="mx-4 mb-2 text-green-700 font-bold text-lg sm:mx-0 dark:text-white">
            Pengaturan
          </h3>
          <p className="mx-4 text-green-700 sm:mx-0 dark:text-white">
            Ukuran Teks
          </p>
          <div className="flex items-center justify-between mx-4 sm:mx-1">
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
            className="mx-4 text-sm underline text-green-700 cursor-pointer transition transform duration-300 hover:text-green-800 sm:mx-0 focus:outline-none dark:text-white"
            onClick={() => setVerseFontSize('base')}
          >
            Kembalikan Ke Setelan Awal
          </button>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  )
}

export default BibleSettingDialog
