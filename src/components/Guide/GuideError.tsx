// Utils
import dayjs from '~/utils/dayjs'
import { monthList } from '~/utils/constants'
import { checkTheme } from '~/utils/hooks/useDynamicTheme'

interface GuideErrorProps {
  monthNumber: string
}

export default function GuideError({ monthNumber }: GuideErrorProps) {
  const theme = checkTheme()

  return (
    <div className="flex flex-col shadow-md rounded-lg mt-4 bg-white dark:bg-[#4B5563]">
      <div
        className="flex items-center justify-between w-full px-4 py-2 rounded-t-lg"
        style={{
          backdropFilter: 'saturate(55%) blur(20px)',
          WebkitBackdropFilter: 'saturate(55%) blur(20px)',
          borderBottom:
            theme === 'light' ? '1px solid #e2e2e2' : '1px solid #6B7280',
        }}
      >
        <h2 className="text-lg font-bold sm:text-xl text-gray-800 dark:text-white">
          Panduan Tidak Tersedia
        </h2>
      </div>
      <div className="px-4 py-3">
        <p className="text-gray-600 dark:text-white">
          Panduan untuk bulan ini (
          {monthList.find((item) => item.value === monthNumber)?.name || ''}{' '}
          {dayjs().format('YYYY')}) tidak tersedia.
        </p>
      </div>
    </div>
  )
}
