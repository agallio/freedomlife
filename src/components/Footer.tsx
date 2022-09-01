import { useEffect, useState } from 'react'
import Image from 'next/image'

// Components
import ExternalLink from './ExternalLink'

// Icon Components
import VercelIcon from './Icons/VercelIcon'
import SupabaseIcon from './Icons/SupabaseIcon'

// Utils
import dayjs from '~/utils/dayjs'

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-full mx-auto items-center justify-center mt-12">
        <p className="tracking-wide mb-4">Ditenagai oleh</p>
        {mounted ? (
          <>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4"
              aria-label="Vercel Logo"
            >
              <VercelIcon className="w-[81px] h-[18px]" />
            </a>
            <a
              href="https://supabase.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-2"
              aria-label="Supabase Logo"
            >
              <SupabaseIcon className="w-[120px] h-[23px]" />
            </a>
          </>
        ) : (
          <>
            <div className="w-[81px] h-[18px] bg-gray-300 dark:bg-gray-600 animate-pulse mb-4 rounded" />
            <div className="w-[120px] h-[23px] bg-gray-300 dark:bg-gray-600 animate-pulse mb-2 rounded" />
          </>
        )}
      </div>
      <hr className="my-6 border-gray-400 w-[80px] dark:border-white" />

      <div className="flex flex-col w-full mx-auto items-center justify-center">
        <p className="tracking-wide mb-3">Disponsori oleh</p>
        <div className="flex justify-center flex-wrap">
          {['sonnylazuardi', 'jackyef', 'sozonome', 'nipeharefa'].map(
            (item) => (
              <a
                key={item}
                href={`https://github.com/${item}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1"
              >
                <Image
                  src={`https://github.com/${item}.png`}
                  width={30}
                  height={30}
                  alt={`${item}'s GitHub Profile Image`}
                  className="rounded-full cursor-pointer"
                />
              </a>
            )
          )}
        </div>
      </div>
      <hr className="my-6 border-gray-400 w-[80px] dark:border-white" />

      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Lisensi MIT © {dayjs().format('YYYY')} — FreedomLife
      </p>
      <span className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Memiliki kritik &amp; saran?{' '}
        <a href="mailto:agallio@freedomlife.id" className="hover:underline">
          Klik disini ↗
        </a>
      </span>
      <span className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Dibuat oleh{' '}
        <ExternalLink href="https://agallio.xyz">@agallio ↗</ExternalLink>
      </span>
    </div>
  )
}
