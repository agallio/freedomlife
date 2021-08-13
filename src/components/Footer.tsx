import Image from 'next/image'
import { useTheme } from 'next-themes'

const Footer = (): JSX.Element => {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full mx-auto items-center justify-center mt-12">
        <p className="mr-3 tracking-wide">Didukung oleh</p>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Image
            src={`/images/vercel-logotype-${
              theme === 'light' ? 'dark' : 'light'
            }.svg`}
            width={100}
            height={23}
            alt="Logo Vercel"
          />
        </a>
      </div>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Lisensi MIT © 2021 — FreedomLife
      </p>
    </div>
  )
}

export default Footer
