import Head from 'next/head'
import Router from 'next/router'
import { NextSeo } from 'next-seo'

import JumboHeader from '@/components/JumboHeader'
import { getDocBySlug, markdownToHtml } from '@/utils/learn'

const Learn: React.FC<{ post: { title: string; content: string } }> = ({
  post,
}) => {
  const goHome = () => {
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>Tata Cara Penggunaan | FreedomLife</title>
      </Head>
      <NextSeo
        title="Bagaimana Cara Menggunakan FreedomLife?"
        description="Lihat dan pelajari tata cara menggunakan aplikasi FreedomLife."
        openGraph={{
          url: 'https://freedomlife.id/learn',
          title: 'Bagaimana Cara Menggunakan FreedomLife?',
          description:
            'Lihat dan pelajari tata cara menggunakan aplikasi FreedomLife.',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'http://freedomlife.id/images/og-learn.png',
              alt: 'agaimana Cara Menggunakan FreedomLife?',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="max-w-sm p-6 mx-auto sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
        <button
          className="py-2 px-4 mb-8 border border-green-700 rounded-lg text-green-700 transform transition hover:bg-green-100 dark:border dark:border-white dark:text-white dark:hover:bg-gray-700 focus:outline-none"
          onClick={goHome}
        >
          Kembali
        </button>
        <JumboHeader title={post.title} />
        <div className="mt-8 mb-8 prose dark:prose-dark">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="mb-12 text-gray-400 text-sm">
          <p>
            Aplikasi FreedomLife dibuat oleh{' '}
            <a
              className="text-green-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/agallio"
            >
              @agallio
            </a>{' '}
            dan 100% open-source. Kode aplikasi dapat diakses publik dan tidak
            untuk diperjualbelikan.
          </p>
          <p className="mt-4">
            FreedomLife terbuka untuk donasi Anda. Anda dapat memberikan donasi
            ke dua channel donasi di{' '}
            <a
              className="text-green-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://saweria.co/agallio"
            >
              Saweria
            </a>
            , dan juga{' '}
            <a
              className="text-green-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://paypal.me/agallio"
            >
              PayPal
            </a>
            . Dengan melakukan donasi Anda mendukung perkembangan FreedomLife
            untuk menjangkau lebih banyak orang, dan menjadi teman rohani setiap
            mereka. Terima kasih, Tuhan memberkati.
          </p>
        </div>

        <button
          aria-label="Keluar Dari Panduan Baca"
          className="w-full border border-green-700 text-green-700 py-2 uppercase rounded-full text-sm font-bold transition transform hover:bg-green-100 dark:border-transparent dark:bg-white dark:bg-opacity-20 dark:text-white dark:hover:bg-opacity-30 focus:outline-none"
          onClick={goHome}
        >
          Kembali Ke Beranda
        </button>
      </div>
    </>
  )
}

export async function getStaticProps(): Promise<{
  props: { post: { content: string } }
}> {
  const post = getDocBySlug('learn', ['title', 'date', 'content'])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export default Learn
