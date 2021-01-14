import { motion } from 'framer-motion'
import Sheet from 'react-modal-sheet'

import ChevronLeftIcon from '../Icons/ChevronLeftIcon'
import CloseIcon from '../Icons/CloseIcon'
import SearchIcon from '../Icons/SearchIcon'

import dayjs from '@/utils/dayjs'
import { bibleList } from '@/utils/constants'

import { useGuide } from '@/store/index'

import type { BiblePassageDialogProps } from '@/types/components'

const BiblePassageDialog: React.FC<BiblePassageDialogProps> = ({
  openPassage,
  inGuide,
  passage,
  plSpaceSplit,
  plList,
  chapterSelected,
  searchChapter,
  setSearchChapter,
  handleSelectChapter,
  setChapterSelected,
  changePassage,
  changeChapter,
  handleClosePassage,
  handleExitGuide,
}) => {
  const { guideData, guideDate } = useGuide()

  return (
    <Sheet isOpen={openPassage} onClose={handleClosePassage}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="react-modal-sheet-header">
            <motion.span className="react-modal-sheet-drag-indicator" />
          </div>
          <h3
            className={`mx-4 ${
              inGuide ? '' : 'mb-2'
            } text-green-700 font-bold text-xl sm:max-w-md sm:mx-auto dark:text-white`}
          >
            {inGuide ? 'Pilih Panduan Baca' : 'Pilih Kitab & Pasal'}
          </h3>
          {inGuide && (
            <p className="mx-4 mb-2 text-green-700 sm:max-w-md sm:mx-auto dark:text-white">
              {guideDate
                ? dayjs(guideDate, 'DD-MM-YYYY').format('DD MMMM YYYY')
                : dayjs().format('DD MMMM YYYY')}
            </p>
          )}
        </Sheet.Header>
        <Sheet.Content>
          <div id="modalPassageContent" className="overflow-auto">
            {inGuide ? (
              <>
                <div className="rounded-lg shadow-md mx-4 my-4 bg-green-500 sm:mx-1 dark:bg-gray-800">
                  <p className="p-4 text-white text-sm">
                    Anda sedang membaca menggunakan panduan. Jika Anda ingin
                    membaca pasal diluar panduan silakan tekan tombol keluar
                    dibawah ini.
                  </p>
                  <div
                    className="rounded-b-lg px-4 py-2 dark:bg-gray-500 dark:bg-opacity-60"
                    style={{
                      backdropFilter: 'saturate(80%) blur(20px)',
                      WebkitBackdropFilter: 'saturate(80%) blur(20px)',
                    }}
                  >
                    <button
                      aria-label="Keluar Dari Panduan Baca"
                      className="w-full bg-white bg-opacity-20 text-white py-1 uppercase rounded-full text-sm font-bold transition duration-300 focus:outline-none hover:bg-opacity-30 sm:w-full"
                      style={{
                        backdropFilter: 'saturate(100%) blur(20px)',
                        WebkitBackdropFilter: 'saturate(100%) blur(20px)',
                      }}
                      onClick={handleExitGuide}
                    >
                      Keluar Dari Panduan Baca
                    </button>
                  </div>
                </div>
                <div
                  className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                    passage === 'pl-1'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500 dark:hover:text-white'
                  } sm:mx-1`}
                  onClick={() => changePassage('pl-1', 'pl_1')}
                >
                  <h3 className="text-lg">
                    {plSpaceSplit
                      ? plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                            plList.length === 0 ? plSpaceSplit[2] : plList[0]
                          }`
                        : `${plSpaceSplit[0]} ${
                            plList.length === 0 ? plSpaceSplit[1] : plList[0]
                          }`
                      : ''}
                  </h3>
                  <p className="text-sm font-light">Perjanjian Lama 1</p>
                </div>
                {plList.length > 1 && (
                  <div
                    className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                      passage === 'pl-2'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500 dark:hover:text-white'
                    } sm:mx-1`}
                    onClick={() => changePassage('pl-2', 'pl_2')}
                  >
                    <h3 className="text-lg">
                      {plSpaceSplit
                        ? plSpaceSplit.length === 3
                          ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
                          : `${plSpaceSplit[0]} ${plList[1]}`
                        : ''}
                    </h3>
                    <p className="text-sm font-light">Perjanjian Lama 2</p>
                  </div>
                )}
                {plList.length > 2 && (
                  <div
                    className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                      passage === 'pl-3'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500 dark:hover:text-white'
                    } sm:mx-1`}
                    onClick={() => changePassage('pl-3', 'pl_3')}
                  >
                    <h3 className="text-lg">
                      {plSpaceSplit
                        ? plSpaceSplit.length === 3
                          ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]}`
                          : `${plSpaceSplit[0]} ${plList[2]}`
                        : ''}
                    </h3>
                    <p className="text-sm font-light">Perjanjian Lama 3</p>
                  </div>
                )}
                {plList.length > 3 && (
                  <div
                    className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                      passage === 'pl-4'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500 dark:hover:text-white'
                    } sm:mx-1`}
                    onClick={() => changePassage('pl-4', 'pl_4')}
                  >
                    <h3 className="text-lg">
                      {plSpaceSplit
                        ? plSpaceSplit.length === 3
                          ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[3]}`
                          : `${plSpaceSplit[0]} ${plList[3]}`
                        : ''}
                    </h3>
                    <p className="text-sm font-light">Perjanjian Lama 4</p>
                  </div>
                )}
                <div
                  className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                    passage === 'pb'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500 dark:hover:text-white'
                  } sm:mx-1`}
                  onClick={() => changePassage('pb', 'pb')}
                >
                  <h3 className="text-lg">{guideData?.pb_name || ''}</h3>
                  <p className="text-sm font-light">Perjanjian Baru</p>
                </div>
                <div
                  className={`rounded-lg shadow-md p-4 mx-4 my-4 font-medium transition transform duration-300 cursor-pointer ${
                    passage === 'in-1'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-white text-green-700 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-green-500 dark:hover:text-white'
                  } sm:mx-1`}
                  onClick={() => changePassage('in-1', 'in_1')}
                >
                  <h3 className="text-lg">{guideData?.in_name || ''}</h3>
                  <p className="text-sm font-light">Kitab Injil</p>
                </div>
              </>
            ) : chapterSelected.name &&
              chapterSelected.abbr &&
              chapterSelected.passage ? (
              <div>
                <button
                  aria-label="Kembali"
                  className="px-4 py-2 mt-2 flex items-center justify-center text-green-700 focus:outline-none sm:px-0 dark:text-white"
                  onClick={() =>
                    setChapterSelected({ name: '', abbr: '', passage: 0 })
                  }
                >
                  <ChevronLeftIcon className="w-4 mr-2" />
                  Kembali
                </button>
                <div className="bg-white rounded-lg shadow mx-4 my-2 sm:mx-1 dark:bg-gray-600">
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
                      <div className="grid gap-4 grid-cols-4 sm:grid-cols-6">
                        {Array.from(
                          { length: chapterSelected.passage },
                          (_, i) => i + 1
                        ).map((item) => (
                          <div
                            key={item}
                            className="w-full h-14 border-2 border-gray-300 rounded flex items-center justify-center transition transform duration-300 cursor-pointer hover:bg-green-500 hover:text-white hover:border-green-700 dark:border-gray-400 dark:text-white dark:hover:border-white"
                            onClick={() =>
                              changeChapter(`${chapterSelected.abbr}-${item}`)
                            }
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
                <div className="flex mt-2 mx-4 shadow-md rounded-lg sm:mx-1">
                  <SearchIcon className="w-8 h-12 bg-white rounded-l-lg pl-3 text-gray-500 dark:bg-gray-600 dark:text-white" />
                  <input
                    name="search"
                    type="text"
                    placeholder="Cari Kitab"
                    className={`w-full h-12 border-none focus:outline-none focus:border-none focus:ring-0 dark:bg-gray-600 dark:text-white dark:placeholder-gray-300 ${
                      searchChapter === '' ? 'rounded-r-lg' : ''
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
                      className="w-8 h-12 bg-white rounded-r-lg pr-3 text-gray-500 dark:bg-gray-600 dark:text-white hover:text-opacity-50"
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
                            className="bg-white text-green-700 rounded-lg shadow m-4 sm:mx-1 dark:bg-gray-600 dark:text-white"
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
                          className="bg-white text-green-700 rounded-lg shadow m-4 transition transform duration-300 cursor-pointer sm:mx-1 hover:bg-green-500 hover:text-white dark:bg-gray-600 dark:text-white"
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

      <Sheet.Backdrop />
    </Sheet>
  )
}

export default BiblePassageDialog
