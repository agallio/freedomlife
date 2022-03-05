import { useEffect, useState } from 'react'
import Link from 'next/link'

// Icon Components
import FreedomlifeIcon from './Icons/FreedomlifeIcon'
import MoonIcon from './Icons/MoonIcon'
import SunIcon from './Icons/SunIcon'

// Utils
import { useDynamicTheme } from '~/utils/hooks/useDynamicTheme'

interface JumboHeaderProps {
  isNotFound?: boolean
  isHome?: boolean
  subtitle?: string
  description?: string
}

export default function JumboHeader({
  isNotFound,
  isHome,
  subtitle,
  description,
}: JumboHeaderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useDynamicTheme()

  useEffect(() => setIsMounted(true), [])

  const switchTheme = () => {
    if (isMounted) {
      if (document.documentElement.classList.value.includes('dark')) {
        document.documentElement.classList.remove('dark')
        setTheme('light')
      } else {
        document.documentElement.classList.add('dark')
        setTheme('dark')
      }
    }
  }

  return (
    <header className="flex flex-col">
      <div className={`flex justify-between items-center mb-4`}>
        {!isNotFound ? (
          <div className="flex items-center justify-center">
            <FreedomlifeIcon className="w-[230px]" />
          </div>
        ) : (
          <Link href="/" passHref>
            <div className="flex items-center justify-center">
              <FreedomlifeIcon className="w-[230px]" />
            </div>
          </Link>
        )}
        {isHome && isMounted && (
          <button
            aria-label="Ganti Mode Warna"
            className="w-10 h-10 p-3 bg-emerald-400 text-emerald-900 rounded-lg transition transform duration-300 focus:outline-none hover:bg-emerald-700 hover:text-white dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
            onClick={switchTheme}
            style={{ transition: 'var(--transition-default)' }}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        )}
      </div>
      {subtitle && (
        <p className="text-xl font-semibold text-gray-800 dark:text-white">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-md font-light text-gray-800 dark:text-white">
          {description}
        </p>
      )}
    </header>
  )
}
