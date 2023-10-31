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
    <Sheet
      isOpen={openSetting}
      onClose={handleCloseSetting}
      detent="content-height"
      tweenConfig={{ ease: [0.61, 1, 0.88, 1], duration: 0.3 }}
    >
      <Sheet.Container
        style={{
          height: !mediaLandscape
            ? 'calc(100% - env(safe-area-inset-top) - 60%)'
            : 'calc(100% - env(safe-area-inset-top) - 30%)',
        }}
      >
        <Sheet.Header />
        <Sheet.Content>
          <h3 className="mx-4 mb-2 text-xl font-bold text-gray-800 dark:text-white sm:mx-0">
            Pengaturan
          </h3>
          <p className="mx-4 tracking-wide text-gray-500 dark:text-white sm:mx-0">
            Ukuran Teks
          </p>
          <div className="mx-4 flex items-center justify-between sm:mx-1">
            <button
              aria-label="Kecilkan"
              className="transform text-gray-600 transition duration-300 hover:text-gray-700 focus:outline-none disabled:opacity-50 dark:text-white dark:disabled:opacity-50"
              onClick={() =>
                handleMinusFontSize(verseFontSize, setVerseFontSize)
              }
              disabled={verseFontSize === 'sm'}
            >
              <MinusIcon className="w-6" />
            </button>
            <div className="mx-2 my-2 w-full rounded-lg border-2 border-gray-600 py-2 text-center font-bold tracking-widest text-gray-600 dark:border-white dark:text-white">
              {fontSizeName[verseFontSize]}
            </div>
            <button
              aria-label="Besarkan"
              className="transform text-gray-600 transition duration-300 hover:text-gray-700 focus:outline-none disabled:opacity-50 dark:text-white dark:disabled:opacity-50"
              onClick={() =>
                handlePlusFontSize(verseFontSize, setVerseFontSize)
              }
              disabled={verseFontSize === '2xl'}
            >
              <PlusIcon className="w-6" />
            </button>
          </div>
          <button
            className="mx-4 transform cursor-pointer text-sm text-emerald-700 underline transition duration-300 hover:text-emerald-800 focus:outline-none dark:text-white sm:mx-0"
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
