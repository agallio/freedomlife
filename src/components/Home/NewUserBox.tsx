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
          aria-label="Buka Dialog Tahun Baru"
          className="w-full h-10 bg-blue-900 bg-opacity-80 text-sm text-white py-1 uppercase rounded-full font-bold transition duration-300 tracking-wider sm:text-md focus:outline-none hover:bg-opacity-30 sm:w-60 dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 umami--click--to-learn"
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
      <div className="px-4 py-3 flex flex-col items-center justify-center mb-4">
        <NewUserIcon className="w-44 h-44 sm:w-36" />
        <h1 className="text-white text-center text-sm">
          Baru pertama kali buka FreedomLife? <br /> Yuk belajar cara pakainya!
        </h1>
      </div>
    </HomeCard>
  )
}
