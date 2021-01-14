import { useTheme } from 'next-themes'

import OpenBookIcon from '@/components/Icons/OpenBookIcon'
import dayjs from '@/utils/dayjs'

import type { GuideItemProps } from '@/types/components'

const GuideItem: React.FC<GuideItemProps> = ({
  item,
  index,
  toBibleWithDate,
}) => {
  const { theme } = useTheme()

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
                : 'text-green-700 dark:text-white'
            }`}
          >
            {dayjs(item.date, 'DD-MM-YYYY').format('dddd')}
          </h2>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-green-700 dark:text-white'
            }`}
          >
            {dayjs(item.date, 'DD-MM-YYYY').format('DD MMMM YYYY')}
          </p>
        </div>

        <button
          aria-label="Baca Panduan"
          className={`flex items-center justify-center w-9 h-9 ${
            isToday(item.date as string)
              ? 'bg-white bg-opacity-40 text-green-700 transition duration-300 hover:bg-opacity-70'
              : 'bg-green-600 text-white transition duration-300 hover:bg-green-700'
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
      <div className="px-4 py-3">
        <div className="flex flex-col mb-2">
          <h1
            className={`font-bold sm:text-lg ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-green-700 dark:text-white'
            }`}
          >
            {item.pl_name || '-'}
          </h1>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-green-700 dark:text-white'
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
                : 'text-green-700 dark:text-white'
            }`}
          >
            {item.pb_name || '-'}
          </h1>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-green-700 dark:text-white'
            }`}
          >
            Perjanjian Baru
          </p>
        </div>
        <div className="flex flex-col">
          <h1
            className={`font-bold sm:text-lg ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-green-700 dark:text-white'
            }`}
          >
            {item.in_name || '-'}
          </h1>
          <p
            className={`text-sm sm:text-md ${
              isToday(item.date as string)
                ? 'text-white'
                : 'text-green-700 dark:text-white'
            }`}
          >
            Kitab Injil
          </p>
        </div>
      </div>
    </div>
  )
}

export default GuideItem
