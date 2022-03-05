import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

export function useDynamicTheme() {
  const [theme, setTheme] = useLocalStorage('theme', '')

  useEffect(() => {
    const setThemeDynamically = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        if (document.documentElement.classList.value.includes('dark')) return

        document.documentElement.classList.add('dark')
        setTheme('dark')
      } else {
        if (!document.documentElement.classList.value.includes('dark')) return

        document.documentElement.classList.remove('dark')
        setTheme('light')
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', setThemeDynamically)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', setThemeDynamically)
    }
  }, [])

  return { theme, setTheme }
}

export function checkTheme() {
  return typeof document !== 'undefined'
    ? document.documentElement.classList.value.includes('dark')
      ? 'dark'
      : 'light'
    : ''
}
