import { motion } from 'framer-motion'

import NYIcon from '../Icons/NYIcon'

const NewYearBox = ({
  handleOpen,
}: {
  handleOpen: () => void
}): JSX.Element => {
  return (
    <motion.div
      className="flex flex-col shadow-md rounded-lg mt-4"
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
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col items-center justify-center px-4 py-5"
        layoutId="card-content"
      >
        <NYIcon className="w-44 sm:w-36" />

        <div className="mt-5">
          <p className="text-white text-center leading-tight">
            Nikmati aplikasi FreedomLife yang baru!
          </p>
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
          aria-label="Buka Dialog Tahun Baru"
          className="w-full h-10 bg-white bg-opacity-20 text-white py-1 uppercase rounded-full font-bold transition duration-300 focus:outline-none hover:bg-opacity-30 sm:w-52"
          style={{
            backdropFilter: 'saturate(100%) blur(20px)',
            WebkitBackdropFilter: 'saturate(100%) blur(20px)',
          }}
          onClick={handleOpen}
        >
          Lihat Selengkapnya
        </button>
      </motion.div>
    </motion.div>
  )
}

export default NewYearBox
