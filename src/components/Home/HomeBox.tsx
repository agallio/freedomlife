import { ReactNode } from 'react'

// Components
import HomeCard from './HomeCard'

// Utils
import dayjs from '~/utils/dayjs'

// Types
import type { GuideDataResponse } from '~/types/api'

interface HomeBoxProps {
  data?: GuideDataResponse
  isError?: boolean
  isGuideError?: boolean
  toBible: () => void
}

export default function HomeBox({ data, isGuideError, toBible }: HomeBoxProps) {
  let children: ReactNode

  if (!data && !isGuideError) {
    children = (
      <div className="px-4 py-3 animate-pulse">
        {[1, 2].map((item) => (
          <div key={item}>
            <div
              className="h-[20px] w-1/2 bg-white bg-opacity-50 rounded-lg sm:h-[24px]"
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
    )
  } else if (data && !isGuideError) {
    children = (
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
                : data?.in_name
                ? item === 'IN'
                  ? 'Kitab Injil'
                  : ''
                : ''}
            </p>
          </div>
        ))}
      </div>
    )
  } else {
    children = (
      <div className="px-4 py-3">
        <p>
          <b>Panduan Baca Tidak Tersedia</b>
        </p>
        <span className="text-sm">{dayjs().format('DD MMMM YYYY')}</span>
      </div>
    )
  }

  return (
    <HomeCard
      title={!isGuideError ? 'Panduan Baca Hari Ini' : undefined}
      subtitle={
        !isGuideError ? dayjs().format('dddd, DD MMMM YYYY') : undefined
      }
      footer={
        <button
          aria-label="Baca Panduan"
          className={`w-full h-10 bg-emerald-800 bg-opacity-80 text-sm text-white py-1 uppercase rounded-full font-bold transition duration-300 tracking-wider sm:text-md ${
            !isGuideError ? 'sm:w-24' : 'sm:w-full'
          } focus:outline-none hover:bg-opacity-30 dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30`}
          style={{
            backdropFilter: 'saturate(100%) blur(20px)',
            WebkitBackdropFilter: 'saturate(100%) blur(20px)',
          }}
          onClick={!data && !isGuideError ? () => null : toBible}
        >
          {!data && !isGuideError
            ? ''
            : data && !isGuideError
            ? 'Baca'
            : 'Baca Tanpa Panduan'}
        </button>
      }
      style={{
        background:
          'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)',
      }}
    >
      {children}
    </HomeCard>
  )
}
