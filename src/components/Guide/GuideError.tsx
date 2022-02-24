import { useTheme } from 'next-themes'

// Utils
import dayjs from '~/utils/dayjs'

export default function GuideError() {
  const { resolvedTheme: theme } = useTheme()

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
        <h2 className="text-lg font-bold sm:text-xl text-emerald-700 dark:text-white">
          Panduan Tidak Tersedia
        </h2>
      </div>
      <div className="px-4 py-3">
        <p>
          Panduan untuk bulan ini ({dayjs().format('MMMM')}{' '}
          {dayjs().format('YYYY')}) tidak tersedia.
        </p>
      </div>
    </div>
  )
}
