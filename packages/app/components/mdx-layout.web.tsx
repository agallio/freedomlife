import {
  useState,
  useEffect,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/router'

// Components
import { Button } from './button'
import ExternalLink from './external-link.web'

// Icon Components
import FreedomlifeIcon from './icons/freedomlife-icon'

/**
 * Web only!
 */
export default function MdxLayout({
  withCredit,
  header,
  children,
}: PropsWithChildren<{ withCredit?: boolean; header?: ReactNode }>) {
  const router = useRouter()

  // Constants
  const isWebview = router.query.webview

  // States
  const [mounted, setMounted] = useState(false)

  // Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="mx-auto max-w-sm px-6 pb-12 pt-4 sm:max-w-md sm:px-0 md:pb-16">
      <div className="flex pb-6">
        <FreedomlifeIcon className="w-[230px]" />
      </div>

      {header}

      {mounted && (
        <>
          <div className="prose dark:prose-dark mb-8">{children}</div>

          {withCredit && (
            <div className="mb-12 text-sm text-gray-500">
              <p>
                Aplikasi freedomlife dibuat oleh{' '}
                <ExternalLink
                  href="https://agallio.xyz"
                  className="text-emerald-600 dark:text-emerald-400"
                >
                  @agallio
                </ExternalLink>{' '}
                dan 100% open-source. Kode aplikasi dapat diakses publik dan
                tidak untuk diperjualbelikan.
              </p>
              <p className="mt-4">
                freedomlife terbuka untuk donasi Anda. Anda dapat memberikan
                donasi ke channel donasi berikut ini:{' '}
                <ul className="my-2 list-inside list-disc">
                  <li>
                    <ExternalLink
                      href="https://saweria.co/agallio"
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      Saweria
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink
                      href="https://github.com/sponsors/agallio"
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      GitHub
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink
                      href="https://paypal.me/agallio"
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      PayPal
                    </ExternalLink>
                  </li>
                </ul>
                Dengan melakukan donasi Anda mendukung perkembangan aplikasi
                freedomlife untuk menjangkau lebih banyak orang, dan menjadi
                teman rohani bagi setiap mereka. Terima kasih, Tuhan memberkati.
              </p>
              <p className="mt-4">
                Jika Anda memiliki kritik, saran, maupun pertanyaan, silakan{' '}
                <a
                  href="mailto:agallio@freedomlife.id"
                  className="text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  hubungi kami.
                </a>
              </p>
            </div>
          )}

          {withCredit && !isWebview && (
            <div className="relative w-full">
              <Button
                fullWidth
                variant="passage"
                text="Kembali ke Beranda"
                onClick={() => router.push('/')}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
