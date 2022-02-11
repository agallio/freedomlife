// Core
import Head from 'next/head'

// Components
import JumboHeader from '~/components/JumboHeader'

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan | FreedomLife</title>
      </Head>

      <div className="full-height max-w-sm p-6 mx-auto flex flex-col items-center justify-center sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
        <JumboHeader isNotFound />

        <h1 className="text-center">Halaman tidak ditemukan</h1>
      </div>
    </>
  )
}

export default NotFound
