// import { useEffect, useState } from 'react'
// import Image from 'next/image'

// Components
import ExternalLink from './ExternalLink'

// Icon Components
// import VercelIcon from './Icons/VercelIcon'
// import SupabaseIcon from './Icons/SupabaseIcon'

// Utils
import dayjs from '~/utils/dayjs'

export default function Footer() {
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => setMounted(true), [])

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div className="mx-auto mt-12 flex w-full flex-col items-center justify-center">
        <p className="mb-4 tracking-wide">Ditenagai oleh</p>
        {mounted ? (
          <>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 flex items-center"
              aria-label="Vercel Logo"
            >
              <VercelIcon className="h-[18px] w-[81px]" />
            </a>
            <a
              href="https://supabase.io"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 flex items-center"
              aria-label="Supabase Logo"
            >
              <SupabaseIcon className="h-[23px] w-[120px]" />
            </a>
          </>
        ) : (
          <>
            <div className="mb-4 h-[18px] w-[81px] animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
            <div className="mb-2 h-[23px] w-[120px] animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
          </>
        )}
      </div>
      <hr className="my-6 w-[80px] border-gray-400 dark:border-white" /> */}

      {/* <div className="mx-auto flex w-full flex-col items-center justify-center">
        <p className="mb-3 tracking-wide">Disponsori oleh</p>
        <div className="flex flex-wrap justify-center">
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
                  className="cursor-pointer rounded-full"
                />
              </a>
            )
          )}
        </div>
      </div>
      <hr className="my-6 w-[80px] border-gray-400 dark:border-white" /> */}

      <p className="mt-10 text-xs text-gray-600 dark:text-gray-300">
        Lisensi MIT © {dayjs().format('YYYY')} — freedomlife
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
