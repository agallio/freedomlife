import Head from 'next/head'
import { NextSeo } from 'next-seo'

// Icon Components
import FreedomlifeIcon from '@repo/app/components/icons/freedomlife-icon'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan | freedomlife</title>
      </Head>
      <NextSeo noindex nofollow />

      <div className="full-height flex flex-col items-center justify-center gap-4">
        <FreedomlifeIcon className="w-[230px]" />
        <h1 className="text-center text-lg dark:text-white">
          Halaman tidak ditemukan
        </h1>
      </div>
    </>
  )
}
