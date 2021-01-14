import { motion } from 'framer-motion'

import CloseIcon from '../Icons/CloseIcon'
import NYIcon from '../Icons/NYIcon'

const NewYearDialog: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: 'auto' }}
        className="fixed top-0 left-0 w-full h-full overflow-y-scroll bg-black z-20 bg-opacity-20"
        onClick={handleClose}
      ></motion.div>
      <div className="fixed top-0 left-0 z-30 w-full max-h-full overflow-y-scroll">
        <motion.div
          className="flex flex-col shadow-md max-w-md mx-auto sm:rounded-lg sm:my-6 landscape:rounded-lg landscape:my-6"
          style={{
            background:
              'linear-gradient(-60deg, rgba(250,124,187,1) 5%, rgba(241,70,88,1) 100%)',
          }}
          layoutId="card"
        >
          <motion.div
            className="flex w-full px-4 py-2 rounded-t-lg"
            style={{
              backdropFilter: 'saturate(80%) blur(20px)',
              WebkitBackdropFilter: 'saturate(80%) blur(20px)',
            }}
            layoutId="card-header"
          >
            <div className={`flex items-center justify-between w-full`}>
              <div className="flex flex-col">
                <h2
                  className={`text-lg font-bold sm:text-xl text-white leading-tight`}
                >
                  Selamat Tahun Baru 2021!
                </h2>
              </div>
              <button
                aria-label="Tutup Dialog"
                className={`flex items-center justify-center w-7 h-7 rounded-full p-1 focus:outline-none bg-white bg-opacity-20 text-white hover:bg-opacity-30`}
                style={{
                  backdropFilter: 'saturate(100%) blur(20px)',
                  WebkitBackdropFilter: 'saturate(100%) blur(20px)',
                }}
                onClick={handleClose}
              >
                <CloseIcon className="w-5" />
              </button>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center"
            layoutId="card-content"
          >
            <NYIcon className="w-52 pt-5" />

            <div className="my-5 mx-2">
              <p className="text-white text-center leading-tight">
                Nikmati aplikasi FreedomLife yang baru!
              </p>
            </div>
            <div className="px-4 text-white">
              <h3 className="text-lg font-bold">Hallo! Apa kabar?</h3>
              <p className="my-4">
                Tidak terasa sudah satu tahun FreedomLife menemani perjalanan
                rohani Anda. Seiring dengan tahun yang baru, FreedomLife juga
                mengalami perubahan yang <i>fresh</i>. Dengan adanya perubahan
                ini kami berharap dapat menjadi pendamping yang lebih baik bagi
                perjalanan rohani Anda.
              </p>
              <h3 className="text-lg font-bold">
                Fitur-fitur baru FreedomLife
              </h3>
              <ul className="my-4 list-outside list-disc pl-5">
                <li className="my-2">
                  Sekarang, aplikasi FreedomLife adalah 100% Alkitab! Jadi Anda
                  bisa membaca pasal &amp; ayat apa saja dengan mengunjungi
                  halaman &quot;Baca&quot;!
                </li>
                <li className="my-2">
                  Ukuran teks terlalu kecil? Atau terlalu besar? Saat ini Anda
                  bisa mengaturnya sesuai dengan kebutuhan Anda.
                </li>
                <li className="my-2">
                  Ingin membaca di malam hari? Tak perlu khawatir, aktifkan saja
                  mode gelap (dark mode).
                </li>
              </ul>
              <p className="my-4">
                Kami mengucapkan terima kasih atas dukungan yang Anda berikan
                lewat donasi, tenaga, maupun doa selama satu tahun ini. Kami
                tidak akan sampai di titik ini tanpa bantuan dan dukungan Anda.
              </p>
              <p className="my-4">
                Semoga tahun-tahun yang akan datang, penyertaan Tuhan semakin
                nyata, membawa sukacita, damai sejahtera, juga pengharapan di
                dalam Yesus Kristus.
              </p>
              <p className="my-4">Tuhan Yesus Memberkati.</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-end w-full px-4 py-2 rounded-b-lg"
            style={{
              backdropFilter: 'saturate(70%) blur(80px)',
              WebkitBackdropFilter: 'saturate(70%) blur(80px)',
            }}
            layoutId="card-footer"
          >
            <button
              aria-label="Tutup Dialog"
              className="w-full bg-white bg-opacity-20 text-white py-1 uppercase rounded-full text-sm font-bold transition duration-300 focus:outline-none hover:bg-opacity-30 sm:w-52"
              style={{
                backdropFilter: 'saturate(100%) blur(20px)',
                WebkitBackdropFilter: 'saturate(100%) blur(20px)',
              }}
              onClick={handleClose}
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default NewYearDialog
