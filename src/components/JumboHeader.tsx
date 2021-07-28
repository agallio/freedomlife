import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import MoonIcon from './Icons/MoonIcon'
import SunIcon from './Icons/SunIcon'

import type { JumboHeaderProps } from '@/types/components'

const JumboHeader = ({
  isNotFound,
  isHome,
  subtitle,
  description,
}: JumboHeaderProps): JSX.Element => {
  const [isMounted, setIsMounted] = useState(false)
  const { resolvedTheme: theme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true), [])

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <header className="flex flex-col">
      <div className={`flex justify-between items-center mb-4`}>
        {!isNotFound ? (
          <div className="flex items-center justify-center">
            <Image
              src="/android-chrome-512x512.png"
              alt="FreedomLife Logo"
              width={35}
              height={35}
            />
            <h1 className="ml-[5px] text-3xl font-logo text-gray-800 dark:text-white">
              freedomlife
            </h1>
          </div>
        ) : (
          <Link href="/" passHref>
            <div className="flex items-center justify-center">
              <Image
                src="/android-chrome-512x512.png"
                alt="FreedomLife Logo"
                width={55}
                height={55}
              />
              <h1 className="ml-[5px] text-5xl font-logo text-gray-800 dark:text-white">
                freedomlife
              </h1>
            </div>
          </Link>
        )}
        {isHome && isMounted && (
          <button
            aria-label="Ganti Mode Warna"
            className="w-10 h-10 p-3 bg-green-700 text-white rounded-lg transition transform duration-300 hover:bg-green-900 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={switchTheme}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        )}
      </div>
      {subtitle && (
        <p className="text-xl font-semibold text-green-700 dark:text-white">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-md font-light text-green-700 dark:text-white">
          {description}
        </p>
      )}
    </header>
  )
}

export default JumboHeader
