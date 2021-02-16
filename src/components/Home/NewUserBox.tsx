import Router from 'next/router'
import splitbee from '@splitbee/web'

import NewUserIcon from '@/components/Icons/NewUserIcon'

const NewUserBox: React.FC = () => {
  const toLearn = () => {
    splitbee.track('Navigate To Learn')
    Router.push('/learn')
  }

  return (
    <div className="flex flex-col shadow-md rounded-lg mt-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <div
        className="flex items-center justify-between w-full px-4 py-2 rounded-t-lg"
        style={{
          backdropFilter: 'saturate(55%) blur(20px)',
          WebkitBackdropFilter: 'saturate(55%) blur(20px)',
        }}
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-bold sm:text-xl text-white">
            Baru Pertama Kali?
          </h2>
        </div>
      </div>

      <div className="px-4 py-3 flex flex-col items-center justify-center mb-4">
        <NewUserIcon className="w-44 h-44 sm:w-36" />
        <h1 className="text-white text-center">
          Baru pertama kali buka FreedomLife? <br /> Yuk belajar cara pakainya!
        </h1>
      </div>

      <div
        className="flex items-center justify-end w-full px-4 py-2 rounded-b-lg"
        style={{
          backdropFilter: 'saturate(70%) blur(80px)',
          WebkitBackdropFilter: 'saturate(70%) blur(80px)',
        }}
      >
        <button
          aria-label="Buka Dialog Tahun Baru"
          className="w-full h-10 bg-white bg-opacity-20 text-white py-1 uppercase rounded-full font-bold transition duration-300 focus:outline-none hover:bg-opacity-30 sm:w-60"
          style={{
            backdropFilter: 'saturate(100%) blur(20px)',
            WebkitBackdropFilter: 'saturate(100%) blur(20px)',
          }}
          onClick={toLearn}
        >
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  )
}

export default NewUserBox
