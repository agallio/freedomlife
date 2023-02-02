import toast from 'react-hot-toast'

// Components
import OpenBookIcon from '~/components/Icons/OpenBookIcon'
import CheckIcon from '~/components/Icons/CheckIcon'

// Utils
import dayjs from '~/utils/dayjs'
import { checkTheme } from '~/utils/hooks/useDynamicTheme'

// Types
import type { GuideDataResponse } from '~/types/api'

interface GuideItemProps {
  item: GuideDataResponse
  index: number
  toBibleWithDate: (_: string) => void
}

export default function GuideItem({
  item,
  index,
  toBibleWithDate,
}: GuideItemProps) {
  const theme = checkTheme()

  const isToday = (date: string) => {
    return dayjs().format('DD-MM-YYYY') === date
  }

  return (
    <div
      key={index}
      className="flex flex-col shadow-md rounded-lg mt-4"
      style={{
        background: isToday(item.date as string)
          ? 'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)'
          : theme === 'light'
          ? '#ffffff'
          : '#4B5563',
      }}
    >
      <div
        className="flex items-center justify-between w-full px-4 py-2 rounded-t-lg"
        style={{
          backdropFilter: 'saturate(55%) blur(20px)',
          WebkitBackdropFilter: 'saturate(55%) blur(20px)',
          borderBottom: isToday(item.date as string)
            ? ''
            : theme === 'light'
            ? '1px solid #e2e2e2'
            : '1px solid #6B7280',
        }}
      >
        <div className="flex flex-col">
          <h2
            className={`text-lg font-bold sm:text-xl ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-gray-800 dark:text-white'
            }`}
          >
            {dayjs(item.date, 'DD-MM-YYYY').format('dddd')}
          </h2>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-gray-700 dark:text-white'
            }`}
          >
            {dayjs(item.date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
          </p>
        </div>

        <div className="flex">
          {window !== undefined &&
          localStorage.getItem(`read-${item.date}`) === 'true' ? (
            <button
              aria-label="Panduan Terbaca"
              className={`flex mr-2 items-center justify-center w-9 h-9 ${
                isToday(item.date as string)
                  ? 'bg-white bg-opacity-40 text-emerald-700 transition duration-300 hover:bg-opacity-70'
                  : 'bg-emerald-300 text-emerald-900 transition duration-300 hover:bg-emerald-400 dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-600'
              } rounded-full p-1 focus:outline-none`}
              style={{
                backdropFilter: 'saturate(100%) blur(20px)',
                WebkitBackdropFilter: 'saturate(100%) blur(20px)',
              }}
              onClick={() =>
                toast.success(`Panduan Telah Dibaca (${item.date})`, {
                  style:
                    theme === 'dark'
                      ? { background: '#111827', color: '#ffffff' }
                      : {},
                })
              }
            >
              <CheckIcon className="w-6" />
            </button>
          ) : null}

          <button
            aria-label="Baca Panduan"
            className={`flex items-center justify-center w-9 h-9 ${
              isToday(item.date as string)
                ? 'bg-white bg-opacity-40 text-emerald-700 transition duration-300 hover:bg-opacity-70'
                : 'bg-emerald-300 text-emerald-900 transition duration-300 hover:bg-emerald-400 dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-600'
            } rounded-full p-1 focus:outline-none`}
            style={{
              backdropFilter: 'saturate(100%) blur(20px)',
              WebkitBackdropFilter: 'saturate(100%) blur(20px)',
            }}
            onClick={() => toBibleWithDate(item.date as string)}
          >
            <OpenBookIcon className="w-6" />
          </button>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="flex flex-col mb-2">
          <h1
            className={`font-bold sm:text-lg ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-gray-800 dark:text-white'
            }`}
          >
            {item.pl_name || '-'}
          </h1>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-gray-600 dark:text-white'
            }`}
          >
            Perjanjian Lama
          </p>
        </div>
        <div className="flex flex-col mb-2">
          <h1
            className={`font-bold sm:text-lg ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-gray-800 dark:text-white'
            }`}
          >
            {item.pb_name || '-'}
          </h1>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-gray-600 dark:text-white'
            }`}
          >
            Perjanjian Baru
          </p>
        </div>
        {item.in_name ? (
          <div className="flex flex-col">
            <h1
              className={`font-bold sm:text-lg ${
                isToday(item.date as string)
                  ? 'text-white'
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              {item.in_name || '-'}
            </h1>
            <p
              className={`text-sm sm:text-md ${
                isToday(item.date as string)
                  ? 'text-white'
                  : 'text-gray-600 dark:text-white'
              }`}
            >
              Kitab Injil
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
