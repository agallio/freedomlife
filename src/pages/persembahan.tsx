import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'

import JumboHeader from '@/components/JumboHeader'
import CopyIcon from '@/components/Icons/CopyIcon'

const Persembahan = (): JSX.Element => {
  const { resolvedTheme: theme } = useTheme()

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
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    } catch (e) {
      console.error(e)
      toast.error('Gagal menyalin nomor, coba sesaat lagi.', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    }
  }

  const copyNumber = async (bank: string) => {
    const bankText = bank === 'cimb' ? 'CIMB Niaga' : 'BCA'
    if (!navigator.clipboard) {
      fallbackCopyNumber(
        bank === 'cimb' ? '800077521000' : '0171217007',
        bankText
      )
      return
    }

    try {
      await navigator.clipboard.writeText(
        bank === 'cimb' ? '800077521000' : '0171217007'
      )
      toast.success(`Nomor rekening ${bankText} tersalin!`, {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    } catch (e) {
      console.error(e)
      toast.error('Gagal menyalin nomor, coba sesaat lagi.', {
        style:
          theme === 'dark' ? { background: '#4B5563', color: '#ffffff' } : {},
      })
    }
  }

  return (
    <>
      <Head>
        <title>Persembahan | FreedomLife</title>
      </Head>
      <NextSeo
        title="Persembahan | FreedomLife"
        description="Halaman informasi persembahan dan perpuluhan Gereja Kristen Kemah Daud Yogyakarta."
        openGraph={{
          url: 'https://freedomlife.id/persembahan',
          title: 'Persembahan | FreedomLife',
          description:
            'Halaman informasi persembahan dan perpuluhan Gereja Kristen Kemah Daud Yogyakarta.',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'http://freedomlife.id/images/og-persembahan.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Persembahan dan Perpuluhan'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="max-w-sm p-6 mx-auto mb-6 sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
        <JumboHeader
          subtitle="Persembahan &amp; Persepuluhan"
          description="Gereja Kristen Kemah Daud - Yogyakarta"
        />

        <main className="mt-4">
          <div
            className="flex flex-col shadow-md rounded-lg mt-4"
            style={{
              background:
                'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)',
            }}
          >
            <p className="text-white p-4">
              Dukungan untuk pekerjaan pelayanan Gereja Kristen Kemah Daud
              Yogyakarta dapat dilakukan melalui scan QRIS dibawah ini:
            </p>

            <Image
              src="/images/qris.jpeg"
              alt="QRIS Kemah Daud Yogyakarta"
              width={405}
              height={458}
            />

            <p className="text-white p-4">
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

          <div className="flex flex-col shadow-md rounded-lg mt-8 p-4 dark:bg-gray-600">
            <p className="dark:text-white">
              Atau dapat juga dilakukan melalui transfer pada rekening bank
              dibawah ini:
            </p>

            <div className="mt-6">
              <p className="font-bold text-lg dark:text-white">CIMB Niaga</p>
              <p className="text-gray-600 mb-2 dark:text-gray-200">
                a/n Gereja Kristen Kemah Daud
              </p>
              <div className="flex items-center justify-between rounded-lg w-full px-4 py-2 border border-gray-300 dark:border-gray-400">
                <p className="dark:text-white">8000-7752-1000</p>
                <button
                  className="text-green-600 hover:text-green-800 focus:outline-none dark:text-green-400 dark:hover:text-green-500"
                  onClick={() => copyNumber('cimb')}
                >
                  <CopyIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <p className="font-bold text-lg dark:text-white">BCA</p>
              <p className="text-gray-600 mb-2 dark:text-gray-200">
                a/n GKKD Glory of God Yogyakarta
              </p>
              <div className="flex items-center justify-between rounded-lg w-full px-4 py-2 border border-gray-300 dark:border-gray-400">
                <p className="dark:text-white">017-121-7007</p>
                <button
                  className="text-green-600 hover:text-green-800 focus:outline-none dark:text-green-400 dark:hover:text-green-500"
                  onClick={() => copyNumber('bca')}
                >
                  <CopyIcon className="w-6 h-6" />
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
