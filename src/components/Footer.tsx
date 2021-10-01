import Image from 'next/image'
import { useTheme } from 'next-themes'

const Footer = (): JSX.Element => {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-full mx-auto items-center justify-center mt-12">
        <p className="tracking-wide mb-4">Didukung oleh</p>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mb-4"
        >
          <Image
            src={`/images/vercel-logotype-${theme}.svg`}
            width={81}
            height={18}
            alt="Logo Vercel"
          />
        </a>
        <a
          href="https://supabase.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mb-2"
        >
          <Image
            src={`/images/supabase-logo-${theme}.svg`}
            width={120}
            height={23}
            alt="Logo Supabase"
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
