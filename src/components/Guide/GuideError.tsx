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
    <div className="mt-4 flex flex-col rounded-lg bg-white shadow-md dark:bg-[#4B5563]">
      <div
        className="flex w-full items-center justify-between rounded-t-lg px-4 py-2"
        style={{
          backdropFilter: 'saturate(55%) blur(20px)',
          WebkitBackdropFilter: 'saturate(55%) blur(20px)',
          borderBottom:
            theme === 'light' ? '1px solid #e2e2e2' : '1px solid #6B7280',
        }}
      >
        <h2 className="text-lg font-bold text-gray-800 dark:text-white sm:text-xl">
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
