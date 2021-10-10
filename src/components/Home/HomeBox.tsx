// Utils
import dayjs from '@/utils/dayjs'

// Types
import type { HomeBoxProps } from '@/types/components'

const HomeBox = ({
  data,
  isError,
  isLoading,
  toBible,
}: HomeBoxProps): JSX.Element => {
  if (isError) {
    return (
      <div
        className="flex flex-col shadow-md rounded-lg mt-2"
        style={{
          background:
            'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)',
        }}
      >
        <p className="px-4 py-4 text-sm">
          <b>
            FreedomLife sedang dalam masa perbaikan. Mohon tunggu beberapa saat
            lagi.
          </b>
        </p>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col shadow-md rounded-lg mt-6"
      style={{
        background:
          'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)',
      }}
    >
      <div
        className="flex items-center justify-between w-full px-4 py-2 rounded-t-lg"
        style={{
          backdropFilter: 'saturate(55%) blur(20px)',
          WebkitBackdropFilter: 'saturate(55%) blur(20px)',
        }}
      >
        <div className="flex flex-col">
          <h2 className={`text-lg font-bold sm:text-xl text-white`}>
            Panduan Baca Hari Ini
          </h2>
          <p className={`text-sm sm:text-md text-white`}>
            {dayjs().format('dddd, DD MMMM YYYY')}
          </p>
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="px-4 py-3 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div
                  className="h-4 w-1/2 bg-white bg-opacity-50 rounded-lg"
                  style={{
                    backdropFilter: 'saturate(70%) blur(80px)',
                    WebkitBackdropFilter: 'saturate(70%) blur(80px)',
                  }}
                />
                <div
                  className="my-3 h-3 w-7/12 bg-white bg-opacity-50 rounded-lg"
                  style={{
                    backdropFilter: 'saturate(70%) blur(80px)',
                    WebkitBackdropFilter: 'saturate(70%) blur(80px)',
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-end w-full px-4 py-2 rounded-b-lg"
            style={{
              backdropFilter: 'saturate(70%) blur(80px)',
              WebkitBackdropFilter: 'saturate(70%) blur(80px)',
            }}
          >
            <div
              className="w-24 h-10 bg-white bg-opacity-20 text-white py-1 uppercase rounded-full font-bold transition duration-300 focus:outline-none hover:bg-opacity-30 animate-pulse"
              style={{
                backdropFilter: 'saturate(100%) blur(20px)',
                WebkitBackdropFilter: 'saturate(100%) blur(20px)',
              }}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div className="px-4 py-3">
            {['PL', 'PB', 'IN'].map((item) => (
              <div key={item} className="flex flex-col mb-2">
                <h1 className="font-bold text-white sm:text-lg">
                  {item === 'PL'
                    ? data?.pl_name
                    : item === 'PB'
                    ? data?.pb_name
                    : item === 'IN'
                    ? data?.in_name
                    : 'Tidak ada data'}
                </h1>
                <p className="text-sm text-white sm:text-md">
                  {item === 'PL'
                    ? 'Perjanjian Lama'
                    : item === 'PB'
                    ? 'Perjanjian Baru'
                    : item === 'IN'
                    ? 'Kitab Injil'
                    : ''}
                </p>
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-end w-full px-4 py-2 rounded-b-lg"
            style={{
              backdropFilter: 'saturate(70%) blur(80px)',
              WebkitBackdropFilter: 'saturate(70%) blur(80px)',
            }}
          >
            <button
              aria-label="Baca Panduan"
              className="w-full h-10 bg-green-800 bg-opacity-80 text-sm text-white py-1 uppercase rounded-full font-bold transition duration-300 tracking-wider sm:text-md sm:w-24 focus:outline-none hover:bg-opacity-30 dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 umami--click--to-bible"
              style={{
                backdropFilter: 'saturate(100%) blur(20px)',
                WebkitBackdropFilter: 'saturate(100%) blur(20px)',
              }}
              onClick={toBible}
            >
              Baca
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default HomeBox
