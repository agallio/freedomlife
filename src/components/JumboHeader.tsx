import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import MoonIcon from './Icons/MoonIcon'
import SunIcon from './Icons/SunIcon'

import type { JumboHeaderProps } from '@/types/components'

const JumboHeader: React.FC<JumboHeaderProps> = ({
  isHome,
  title,
  subtitle,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true), [])

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700 sm:text-4xl dark:text-white">
          {title}
        </h1>
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
      <p className="text-lg text-green-700 dark:text-white">{subtitle}</p>
    </header>
  )
}

export default JumboHeader
