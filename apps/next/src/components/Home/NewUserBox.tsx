import Router from 'next/router'

// Components
import HomeCard from './HomeCard'
import NewUserIcon from '../Icons/NewUserIcon'

export default function NewUserBox() {
  return (
    <HomeCard
      top="6"
      title="Baru Pertama Kali?"
      footer={
        <button
          aria-label="Buka Halaman Panduan Penggunaan"
          className="h-10 w-full rounded-full bg-blue-900 bg-opacity-80 py-1 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-opacity-30 focus:outline-none dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 sm:w-60"
          style={{
            backdropFilter: 'saturate(100%) blur(20px)',
            WebkitBackdropFilter: 'saturate(100%) blur(20px)',
          }}
          onClick={() => Router.push('/learn')}
        >
          Pelajari Lebih Lanjut
        </button>
      }
      className="bg-gradient-to-l from-purple-500 via-indigo-500 to-blue-500"
    >
      <div className="mb-4 flex flex-col items-center justify-center px-4 py-3">
        <NewUserIcon className="h-44 w-44 sm:w-36" />
        <h1 className="text-center text-sm text-white">
          Baru pertama kali buka freedomlife? <br /> Yuk belajar cara pakainya!
        </h1>
      </div>
    </HomeCard>
  )
}
