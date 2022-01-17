// Core
import { createRef } from 'react'
import { useTheme } from 'next-themes'

// 3rd Party Libs
import { useScreenshot, createFileName } from 'use-react-screenshot'

// Components
import Screenshot from '../Screenshot'

// Icon Components
import CloseIcon from '../Icons/CloseIcon'
import CopyIcon from '../Icons/CopyIcon'
import SettingIcon from '../Icons/SettingIcon'
import TranslateIcon from '../Icons/TranslateIcon'
import ImageIcon from '../Icons/ImageIcon'

// Utils
import dayjs from '@/utils/dayjs'

// Types
import type { BibleNavbarProps } from '@/types/components'

const BibleNavbar = ({
  highlighted,
  highlightedText,
  inGuide,
  bibleVersion,
  guideDate,
  passageTitle,
  handleExitGuide,
  removeHighlight,
  copyText,
  handleOpenTranslate,
  handleOpenPassage,
  handleOpenSetting,
}: BibleNavbarProps): JSX.Element => {
  // Core
  const { resolvedTheme: theme } = useTheme()

  // Refs
  const screenshotRef = createRef<HTMLDivElement>()

  // Hooks
  const [, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
    letterRendering: true,
    useCORS: true,
  })

  // Methods
  const download = (
    image: string,
    {
      name = `freedomlife.id_${passageTitle()}_${bibleVersion}_${highlightedText
        .map((i) => i.verse)
        .join('_')}`,
      extension = 'jpg',
    } = {}
  ) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }

  const handleScreenshot = () =>
    takeScreenShot(screenshotRef.current).then(download)

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full border-b bg-opacity-60 z-40 ${
          highlighted
            ? 'bg-emerald-600 border-emerald-600 text-white'
            : 'bg-white border-gray-100 dark:bg-gray-700 dark:border-gray-800 dark:bg-opacity-70'
        } ${inGuide ? 'h-25' : 'h-12 sm:h-14'}`}
        style={{
          backdropFilter: 'saturate(180%) blur(12px)',
          WebkitBackdropFilter: 'saturate(180%) blur(12px)',
        }}
      >
        {inGuide && (
          <div className="bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white px-4">
            <div className="flex items-center justify-between max-w-sm sm:max-w-md sm:mx-auto">
              <p className="py-1">
                Panduan Baca Aktif{' '}
                {guideDate
                  ? `(${dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY')})`
                  : ''}
              </p>
              <button
                aria-label="Tutup"
                className="focus:outline-none"
                onClick={handleExitGuide}
              >
                <CloseIcon className="w-4" />
              </button>
            </div>
          </div>
        )}
        <div
          className={`flex items-center justify-between max-w-sm mx-6 ${
            inGuide ? 'py-3' : 'h-full'
          } sm:max-w-md sm:mx-auto landscape:mx-auto`}
        >
          {highlighted ? (
            <>
              <button
                aria-label="Tutup"
                className="w-5 h-5 focus:text-emerald-600 sm:w-6 sm:h-6 focus:outline-none"
                onClick={removeHighlight}
              >
                <CloseIcon />
              </button>
              <div className="py-1">{highlightedText.length} Ayat Disorot</div>
              <div className="flex">
                {highlightedText.length <= 2 && (
                  <button
                    aria-label="Ekspor Gambar"
                    className="mr-4 w-5 h-5 focus:text-emerald-600 sm:w-6 sm:h-6 focus:outline-none"
                    onClick={handleScreenshot}
                  >
                    <ImageIcon outline />
                  </button>
                )}
                <button
                  aria-label="Salin Ayat"
                  className="w-5 h-5 focus:text-emerald-600 sm:w-6 sm:h-6 focus:outline-none"
                  onClick={copyText}
                >
                  <CopyIcon outline />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                aria-label="Buka Dialog Versi"
                className="w-5 h-5 transition transform duration-300 hover:text-emerald-600 sm:w-6 sm:h-6 focus:outline-none dark:text-white dark:hover:text-gray-400"
                onClick={handleOpenTranslate}
              >
                <TranslateIcon />
              </button>
              <button
                aria-label="Buka Dialog Kitab"
                className="bg-emerald-300 text-emerald-900 py-1 px-5 rounded-full shadow-sm transition transform duration-300 hover:bg-emerald-400 dark:bg-emerald-700 dark:text-white focus:outline-none sm:py-2 sm:px-6"
                onClick={handleOpenPassage}
                style={{ minWidth: '8rem' }}
              >
                {passageTitle()}
                {passageTitle() !== 'Memuat'
                  ? bibleVersion !== 'tb'
                    ? ` (${bibleVersion.toUpperCase()})`
                    : ''
                  : ''}
              </button>
              <button
                aria-label="Buka Dialog Pengaturan"
                className="w-5 h-5 transition transform duration-300 hover:text-emerald-600 sm:w-6 sm:h-6 focus:outline-none dark:text-white dark:hover:text-gray-400"
                onClick={handleOpenSetting}
              >
                <SettingIcon />
              </button>
            </>
          )}
        </div>
      </header>

      <Screenshot
        ref={screenshotRef}
        theme={theme}
        passageTitle={passageTitle()}
        bibleVersion={bibleVersion}
        highlightedText={highlightedText}
      />
    </>
  )
}

export default BibleNavbar
