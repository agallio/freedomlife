import { motion } from 'framer-motion-10'
import { useMediaPredicate } from 'react-media-hook'
import Sheet from 'react-modal-sheet'

// Components
import {
  BibleTranslateDialogItem,
  type BibleTranslateDialogProps,
} from './BibleTranslateDialogItem'

export default function BibleTranslateDialog({
  inGuide,
  openTranslate,
  bibleVersion,
  handleCloseTranslate,
  changeVersion,
}: BibleTranslateDialogProps) {
  const mediaLandscape = useMediaPredicate('(orientation: landscape)')

  return (
    <Sheet
      isOpen={openTranslate}
      onClose={handleCloseTranslate}
      tweenConfig={{ ease: [0.61, 1, 0.88, 1], duration: 0.3 }}
      style={{ zIndex: 9998 }}
    >
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
          <div className="overflow-auto pb-20">
            <h4 className="mt-4 px-4 font-medium tracking-wide text-gray-500 dark:text-white">
              Bahasa Indonesia
            </h4>
            {['tb', 'bis', 'fayh', 'vmd'].map((item) => (
              <BibleTranslateDialogItem
                key={item}
                item={item}
                inGuide={inGuide}
                bibleVersion={bibleVersion}
                changeVersion={changeVersion}
              />
            ))}

            <h4 className="mt-6 px-4 font-medium tracking-wide text-gray-500 dark:text-white">
              Bahasa Inggris
            </h4>
            {['msg', 'nkjv', 'amp', 'niv'].map((item) => (
              <BibleTranslateDialogItem
                key={item}
                item={item}
                inGuide={inGuide}
                bibleVersion={bibleVersion}
                changeVersion={changeVersion}
              />
            ))}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={handleCloseTranslate} />
    </Sheet>
  )
}
