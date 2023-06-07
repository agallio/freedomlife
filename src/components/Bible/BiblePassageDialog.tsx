import { useState } from 'react'
import { motion } from 'framer-motion'
import Sheet from 'react-modal-sheet'

// Icon Components
import ChevronLeftIcon from '../Icons/ChevronLeftIcon'
import CloseIcon from '../Icons/CloseIcon'
import SearchIcon from '../Icons/SearchIcon'

// Utils
import dayjs from '~/utils/dayjs'
import { bibleList } from '~/utils/constants'

// Context
import { useGuide } from '~/contexts/GuideContext'

// Types
import type { BibleList } from '~/types/utils'
import type { GuideBibleData } from '~/types/api'

interface BiblePassageDialogProps {
  openPassage: boolean
  inGuide: boolean
  guideBibleDataInfo?: GuideBibleData[]
  passage?: string
  changePassage?: (_: string) => void
  changeChapter?: (_: string) => void
  handleClosePassage: () => void
  handleExitGuide?: () => void
}

export default function BiblePassageDialog({
  openPassage,
  inGuide,
  guideBibleDataInfo,
  passage,
  changePassage,
  changeChapter,
  handleClosePassage,
  handleExitGuide,
}: BiblePassageDialogProps) {
  // Context
  const { guideDate } = useGuide()

  // States
  const [searchChapter, setSearchChapter] = useState('')
  const [chapterSelected, setChapterSelected] = useState({
    name: '',
    abbr: '',
    passage: 0,
  })

  // Methods
  const handleSelectChapter = (item: BibleList) => {
    const modalPassageContent = document.getElementById('modalPassageContent')
    modalPassageContent!.scrollIntoView()
    setChapterSelected({ ...item })
  }

  const handleClose = () => {
    setSearchChapter('')
    setChapterSelected({ name: '', abbr: '', passage: 0 })
    handleClosePassage()
  }

  return (
    <Sheet isOpen={openPassage} onClose={handleClose}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="react-modal-sheet-header">
            <motion.span className="react-modal-sheet-drag-indicator" />
          </div>
          <h3
            className={`mx-4 ${
              inGuide ? '' : 'mb-2'
            } text-xl font-bold text-gray-800 dark:text-white sm:mx-auto sm:max-w-md`}
          >
            {inGuide ? 'Pilih Panduan Baca' : 'Pilih Kitab & Pasal'}
          </h3>
          {inGuide && (
            <p className="mx-4 mb-2 text-gray-500 dark:text-white sm:mx-auto sm:max-w-md">
              {guideDate
                ? dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY')
                : dayjs().format('DD MMMM YYYY')}
            </p>
          )}
        </Sheet.Header>
        <Sheet.Content>
          <div id="modalPassageContent" className="overflow-auto font-sans">
            {inGuide ? (
              <>
                <div className="mx-4 my-4 rounded-lg bg-emerald-700 shadow-md shadow-emerald-400/60 dark:bg-gray-800 dark:shadow-inherit sm:mx-1">
                  <p className="p-4 text-sm text-white dark:text-white">
                    Anda sedang membaca menggunakan panduan. Jika Anda ingin
                    membaca pasal diluar panduan silakan tekan tombol keluar
                    dibawah ini.
                  </p>
                  <div
                    className="rounded-b-lg bg-emerald-200/80 px-4 py-2 dark:bg-gray-500/60"
                    style={{
                      backdropFilter: 'saturate(80%) blur(20px)',
                      WebkitBackdropFilter: 'saturate(80%) blur(20px)',
                    }}
                  >
                    <button
                      aria-label="Keluar Dari Panduan Baca"
                      className="w-full rounded-full bg-emerald-800/80 py-2 text-sm font-bold uppercase text-white transition duration-300 hover:bg-opacity-30 focus:outline-none dark:bg-white dark:bg-opacity-20 sm:w-full"
                      style={{
                        backdropFilter: 'saturate(100%) blur(20px)',
                        WebkitBackdropFilter: 'saturate(100%) blur(20px)',
                      }}
                      onClick={() =>
                        typeof handleExitGuide === 'function'
                          ? handleExitGuide()
                          : null
                      }
                    >
                      Keluar Dari Panduan Baca
                    </button>
                  </div>
                </div>
                {guideBibleDataInfo?.map((guideData) => (
                  <div
                    key={guideData.abbr}
                    className={`mx-4 my-4 transform cursor-pointer rounded-lg p-4 font-medium shadow transition duration-300 ${
                      guideData.value === passage
                        ? 'bg-emerald-300 text-emerald-900 hover:bg-emerald-400 dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-800'
                        : 'bg-white text-gray-700 hover:bg-emerald-300 hover:text-emerald-900 dark:bg-gray-600 dark:text-white dark:hover:bg-emerald-700 dark:hover:text-white'
                    } sm:mx-1`}
                    onClick={() =>
                      typeof changePassage === 'function'
                        ? changePassage(guideData.value)
                        : null
                    }
                  >
                    <h3 className="text-lg font-semibold">{guideData.title}</h3>
                    <p
                      className={`text-sm tracking-wide ${
                        guideData.value !== passage
                          ? 'text-gray-500 dark:text-white'
                          : ''
                      }`}
                    >
                      {guideData.subtitle}
                    </p>
                  </div>
                ))}
              </>
            ) : chapterSelected.name &&
              chapterSelected.abbr &&
              chapterSelected.passage ? (
              <div>
                <button
                  aria-label="Kembali"
                  className="mt-2 flex items-center justify-center px-4 py-2 text-emerald-700 focus:outline-none dark:text-white sm:px-0"
                  onClick={() =>
                    setChapterSelected({ name: '', abbr: '', passage: 0 })
                  }
                >
                  <ChevronLeftIcon className="mr-2 w-4" />
                  Kembali
                </button>
                <div className="mx-4 my-2 rounded-lg bg-white shadow dark:bg-gray-600 sm:mx-1">
                  <div>
                    <div className="p-3 dark:text-white">
                      <h3>{chapterSelected.name}</h3>
                    </div>
                  </div>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t-2 border-gray-100 p-3 dark:border-gray-500">
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
                        {Array.from(
                          { length: chapterSelected.passage },
                          (_, i) => i + 1
                        ).map((item) => (
                          <div
                            key={item}
                            className="flex h-14 w-full transform cursor-pointer items-center justify-center rounded border-2 border-gray-300 transition duration-300 hover:border-emerald-400 hover:bg-emerald-300 hover:text-emerald-900 dark:border-gray-400 dark:text-white dark:hover:border-emerald-600 dark:hover:bg-emerald-700"
                            onClick={() => {
                              if (typeof changeChapter === 'function') {
                                changeChapter(`${chapterSelected.abbr}-${item}`)
                              }
                              setSearchChapter('')
                              setChapterSelected({
                                name: '',
                                abbr: '',
                                passage: 0,
                              })
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mx-4 mt-2 flex rounded-lg shadow-md sm:mx-1">
                  <SearchIcon className="h-12 w-12 rounded-l-lg bg-white px-3 text-gray-500 dark:bg-gray-600 dark:text-white" />
                  <input
                    name="search"
                    type="text"
                    placeholder="Cari Kitab"
                    className={`h-12 w-full border-none focus:border-none focus:outline-none focus:ring-0 dark:bg-gray-600 dark:text-white dark:placeholder-gray-300 ${
                      searchChapter === ''
                        ? 'rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none'
                        : 'rounded-none'
                    }`}
                    value={searchChapter}
                    onChange={(e) => {
                      setSearchChapter(e.target.value)
                      setChapterSelected({ name: '', abbr: '', passage: 0 })
                    }}
                  />
                  {searchChapter && (
                    <CloseIcon
                      aria-label="Bersihkan Pencarian"
                      className="h-12 w-8 rounded-r-lg bg-white pr-3 text-gray-500 hover:text-opacity-50 dark:bg-gray-600 dark:text-white"
                      onClick={() => {
                        setSearchChapter('')
                        setChapterSelected({ name: '', abbr: '', passage: 0 })
                      }}
                    />
                  )}
                </div>
                <motion.ul layout transition={{ duration: 0.2 }}>
                  {searchChapter.length > 0
                    ? bibleList
                        .filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(searchChapter.toLowerCase())
                        )
                        .map((item) => (
                          <motion.li
                            layout
                            key={item.name}
                            onClick={() => handleSelectChapter({ ...item })}
                            initial={{ borderRadius: '0.5rem' }}
                            transition={{ duration: 0.2 }}
                            className="m-4 rounded-lg bg-white text-gray-700 shadow dark:bg-gray-600 dark:text-white sm:mx-1"
                          >
                            <motion.div transition={{ duration: 0.2 }}>
                              <motion.div
                                layout
                                transition={{ duration: 0.2 }}
                                className="p-3"
                              >
                                <h3>{item.name}</h3>
                              </motion.div>
                            </motion.div>
                          </motion.li>
                        ))
                    : bibleList.map((item) => (
                        <motion.li
                          layout
                          key={item.name}
                          onClick={() => handleSelectChapter({ ...item })}
                          transition={{ duration: 0.2 }}
                          className="m-4 transform cursor-pointer rounded-lg bg-white text-gray-700 shadow transition duration-300 hover:bg-emerald-300 hover:text-emerald-900 dark:bg-gray-600 dark:text-white dark:hover:bg-emerald-700 sm:mx-1"
                        >
                          <motion.div transition={{ duration: 0.2 }}>
                            <motion.div
                              layout
                              transition={{ duration: 0.2 }}
                              className="p-3"
                            >
                              <h3>{item.name}</h3>
                            </motion.div>
                          </motion.div>
                        </motion.li>
                      ))}
                </motion.ul>
              </motion.div>
            )}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={handleClose} />
    </Sheet>
  )
}
