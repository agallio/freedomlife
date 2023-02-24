import { NextPage } from 'next'
import Head from 'next/head'

// Components
import JumboHeader from '~/components/JumboHeader'

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan | freedomlife</title>
      </Head>

      <div className="full-height mx-auto flex max-w-sm flex-col items-center justify-center p-6 sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
        <JumboHeader isNotFound />

        <h1 className="text-center">Halaman tidak ditemukan</h1>
      </div>
    </>
  )
}

export default NotFound
