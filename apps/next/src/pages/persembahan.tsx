import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import toast from 'react-hot-toast'

// Components
import JumboHeader from '~/components/JumboHeader'

// Icon Components
import CopyIcon from '~/components/Icons/CopyIcon'

// Utils
import { checkTheme } from '~/utils/hooks/useDynamicTheme'

const Persembahan: NextPage = () => {
  const theme = checkTheme()

  const fallbackCopyNumber = async (bank: string, bankText: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = bank

    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      await document.execCommand('copy')
      textArea.style.display = 'none'
      toast.success(`Nomor rekening ${bankText} tersalin!`, {
        style:
          theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
      })
    } catch (e) {
      console.error(e)
      toast.error('Gagal menyalin nomor, coba sesaat lagi.', {
        style:
          theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
      })
    }
  }

  const copyNumber = async (bank: string) => {
    const bankText = bank === 'cimb' ? 'CIMB Niaga' : 'BCA'
    if (!navigator.clipboard) {
      fallbackCopyNumber(
        bank === 'cimb' ? '800077521000' : '0171217007',
        bankText,
      )
      return
    }

    try {
      await navigator.clipboard.writeText(
        bank === 'cimb' ? '800077521000' : '0171217007',
      )
      toast.success(`Nomor rekening ${bankText} tersalin!`, {
        style:
          theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
      })
    } catch (e) {
      console.error(e)
      toast.error('Gagal menyalin nomor, coba sesaat lagi.', {
        style:
          theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
      })
    }
  }

  return (
    <>
      <Head>
        <title>Persembahan | freedomlife</title>
      </Head>
      <NextSeo
        noindex
        title="Persembahan | freedomlife"
        description="Halaman informasi persembahan dan perpuluhan Gereja Kristen Kemah Daud Yogyakarta."
        openGraph={{
          url: 'https://freedomlife.id/persembahan',
          title: 'Persembahan | freedomlife',
          description:
            'Halaman informasi persembahan dan perpuluhan Gereja Kristen Kemah Daud Yogyakarta.',
          site_name: 'freedomlife',
          images: [
            {
              url: 'https://freedomlife.id/images/og-persembahan.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Persembahan dan Perpuluhan'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="mx-auto mb-6 max-w-sm p-6 sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
        <JumboHeader
          subtitle="Persembahan &amp; Persepuluhan"
          description="Gereja Kristen Kemah Daud - Yogyakarta"
        />

        <main className="mt-4">
          <div
            className="mt-4 flex flex-col rounded-lg shadow-md"
            style={{
              background:
                'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)',
            }}
          >
            <p className="p-4 text-white">
              Dukungan untuk pekerjaan pelayanan Gereja Kristen Kemah Daud
              Yogyakarta dapat dilakukan melalui scan QRIS dibawah ini:
            </p>

            <Image
              src="/images/qris.jpeg"
              alt="QRIS Kemah Daud Yogyakarta"
              width={405}
              height={458}
            />

            <p className="p-4 text-white">
              Melalui aplikasi m-Banking / Digital Payment seperti:
            </p>

            <div className="flex px-4 pb-4 sm:px-12">
              <Image
                src="/images/ewallet.png"
                alt="All E-Wallet"
                width={1080}
                height={337}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col rounded-lg p-4 shadow-md dark:bg-gray-600">
            <p className="dark:text-white">
              Atau dapat juga dilakukan melalui transfer pada rekening bank
              dibawah ini:
            </p>

            <div className="mt-6">
              <p className="text-lg font-bold dark:text-white">CIMB Niaga</p>
              <p className="mb-2 text-gray-600 dark:text-gray-200">
                a/n Gereja Kristen Kemah Daud
              </p>
              <div className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-400">
                <p className="dark:text-white">8000-7752-1000</p>
                <button
                  className="text-emerald-600 hover:text-emerald-800 focus:outline-none dark:text-emerald-400 dark:hover:text-emerald-500"
                  onClick={() => copyNumber('cimb')}
                >
                  <CopyIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mb-6 mt-4">
              <p className="text-lg font-bold dark:text-white">BCA</p>
              <p className="mb-2 text-gray-600 dark:text-gray-200">
                a/n GKKD Glory of God Yogyakarta
              </p>
              <div className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-400">
                <p className="dark:text-white">017-121-7007</p>
                <button
                  className="text-emerald-600 hover:text-emerald-800 focus:outline-none dark:text-emerald-400 dark:hover:text-emerald-500"
                  onClick={() => copyNumber('bca')}
                >
                  <CopyIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Persembahan
