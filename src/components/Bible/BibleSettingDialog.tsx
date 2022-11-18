import { useMediaPredicate } from 'react-media-hook'
import Sheet from 'react-modal-sheet'

// Icon Components
import MinusIcon from '../Icons/MinusIcon'
import PlusIcon from '../Icons/PlusIcon'

// Utils
import {
  fontSizeName,
  handleMinusFontSize,
  handlePlusFontSize,
} from '~/utils/bible'

interface BibleSettingDialogProps {
  openSetting: boolean
  verseFontSize: string
  setVerseFontSize: (_: string) => void
  handleCloseSetting: () => void
}

export default function BibleSettingDialog({
  openSetting,
  verseFontSize,
  setVerseFontSize,
  handleCloseSetting,
}: BibleSettingDialogProps) {
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
          <h3 className="mx-4 mb-2 text-gray-800 font-bold text-xl sm:mx-0 dark:text-white">
            Pengaturan
          </h3>
          <p className="mx-4 text-gray-500 tracking-wide sm:mx-0 dark:text-white">
            Ukuran Teks
          </p>
          <div className="flex items-center justify-between mx-4 sm:mx-1">
            <button
              aria-label="Kecilkan"
              className="text-gray-600 transition transform duration-300 hover:text-gray-700 focus:outline-none disabled:opacity-50 dark:text-white dark:disabled:opacity-50"
              onClick={() =>
                handleMinusFontSize(verseFontSize, setVerseFontSize)
              }
              disabled={verseFontSize === 'sm'}
            >
              <MinusIcon className="w-6" />
            </button>
            <div className="w-full text-center border-2 border-gray-600 py-2 mx-2 my-2 rounded-lg text-gray-600 font-bold tracking-widest dark:text-white dark:border-white">
              {fontSizeName[verseFontSize]}
            </div>
            <button
              aria-label="Besarkan"
              className="text-gray-600 transition transform duration-300 hover:text-gray-700 focus:outline-none disabled:opacity-50 dark:text-white dark:disabled:opacity-50"
              onClick={() =>
                handlePlusFontSize(verseFontSize, setVerseFontSize)
              }
              disabled={verseFontSize === '3xl'}
            >
              <PlusIcon className="w-6" />
            </button>
          </div>
          <button
            className="mx-4 text-sm underline text-emerald-700 cursor-pointer transition transform duration-300 hover:text-emerald-800 sm:mx-0 focus:outline-none dark:text-white"
            onClick={() => setVerseFontSize('base')}
          >
            Kembalikan Ke Setelan Awal
          </button>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={handleCloseSetting} />
    </Sheet>
  )
}
