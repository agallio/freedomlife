import type { ReactNode } from 'react'
import clsx from 'clsx'

// Components
import HomeCard from './HomeCard'

// Utils
import dayjs from '~/utils/dayjs'

// Types
import type { GuideDataResponse } from '~/types/api'

interface HomeBoxProps {
  top?: string
  data?: GuideDataResponse
  isError?: boolean
  isGuideError?: boolean
  toBible: () => void
}

export default function HomeBox({
  top = '2',
  data,
  isGuideError,
  toBible,
}: HomeBoxProps) {
  let children: ReactNode

  if (!data && !isGuideError) {
    children = (
      <div className="animate-pulse px-4 py-3">
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <div
              className="h-[16px] w-1/2 rounded-lg bg-white bg-opacity-50 sm:h-[20px]"
              style={{
                backdropFilter: 'saturate(70%) blur(80px)',
                WebkitBackdropFilter: 'saturate(70%) blur(80px)',
              }}
            />
            <div
              className="my-3 h-3 w-7/12 rounded-lg bg-white bg-opacity-50"
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
          <div key={item} className="mb-2 flex flex-col">
            <h1 className="font-bold text-white sm:text-lg">
              {item === 'PL'
                ? data?.pl_name
                : item === 'PB'
                  ? data?.pb_name
                  : item === 'IN'
                    ? data?.in_name
                    : 'Tidak ada data'}
            </h1>
            <p className="text-sm text-white">
              {item === 'PL'
                ? 'Perjanjian Lama'
                : item === 'PB'
                  ? 'Kitab Injil'
                  : data?.in_name
                    ? item === 'IN'
                      ? 'Kitab Rasuli'
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
      top={top}
      title={!isGuideError ? 'Panduan Baca Hari Ini' : undefined}
      subtitle={
        !isGuideError ? dayjs().format('dddd, DD MMMM YYYY') : undefined
      }
      footer={
        <button
          aria-label="Baca Panduan"
          className={clsx(
            'h-10 w-full rounded-full bg-emerald-800 bg-opacity-80 py-1 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-opacity-30 focus:outline-none dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30',
            !isGuideError ? 'sm:w-24' : 'sm:w-full',
          )}
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
