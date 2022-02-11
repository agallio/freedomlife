import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import dayjs from '~/utils/dayjs'

import ExternalLink from './ExternalLink'

import VercelIcon from './Icons/VercelIcon'
import SupabaseIcon from './Icons/SupabaseIcon'

const Footer = (): JSX.Element => {
  const { resolvedTheme: theme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-full mx-auto items-center justify-center mt-12">
        <p className="tracking-wide mb-4">Didukung oleh</p>
        {mounted ? (
          <>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4"
            >
              <VercelIcon theme={theme} className="w-[81px] h-[18px]" />
            </a>
            <a
              href="https://supabase.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-2"
            >
              <SupabaseIcon theme={theme} className="w-[120px] h-[23px]" />
            </a>
          </>
        ) : (
          <>
            <div className="w-[81px] h-[18px] bg-gray-300 dark:bg-gray-600 animate-pulse mb-4 rounded" />
            <div className="w-[120px] h-[23px] bg-gray-300 dark:bg-gray-600 animate-pulse mb-2 rounded" />
          </>
        )}
      </div>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Lisensi MIT © {dayjs().format('YYYY')} — FreedomLife
      </p>
      <ExternalLink
        href="https://agallio.xyz"
        className="mt-2 text-xs text-gray-600 dark:text-gray-300"
      >
        @agallio ↗
      </ExternalLink>
    </div>
  )
}

export default Footer
