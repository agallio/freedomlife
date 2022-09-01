import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { NextSeo } from 'next-seo'

// Components
import JumboHeader from '~/components/JumboHeader'
import ExternalLink from '~/components/ExternalLink'

// Utils
import { getDocBySlug, markdownToHtml } from '~/utils/markdown'

interface LearnPageProps {
  post: { title: string; content: string }
}

const Learn: NextPage<LearnPageProps> = ({ post }) => {
  const goHome = () => {
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>Panduan Penggunaan | FreedomLife</title>
      </Head>
      <NextSeo
        title="Panduan Penggunaan | FreedomLife"
        description="Halaman panduan penggunaan aplikasi FreedomLife. Pelajari bagaimana cara menggunakan aplikasi FreedomLife."
        openGraph={{
          url: 'https://freedomlife.id/learn',
          title: 'Panduan Penggunaan | FreedomLife',
          description:
            'Halaman panduan penggunaan aplikasi FreedomLife. Pelajari bagaimana cara menggunakan aplikasi FreedomLife.',
          site_name: 'FreedomLife',
          images: [
            {
              url: 'https://freedomlife.id/images/og-learn.png',
              alt: `Tulisan dan logo 'freedomlife' disertai dengan keterangan: 'Cara Penggunaan'`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="max-w-sm p-6 mx-auto sm:max-w-md sm:py-6 md:mb-16 landscape:mx-auto">
        <button
          className="py-2 px-4 mb-8 border border-emerald-700 rounded-lg text-emerald-700 transform transition hover:bg-emerald-100 dark:border dark:border-white dark:text-white dark:hover:bg-gray-700 focus:outline-none"
          onClick={goHome}
        >
          Kembali
        </button>
        <JumboHeader subtitle={post.title} />
        <div className="mt-8 mb-8 prose dark:prose-dark">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="mb-12 text-gray-400 text-sm">
          <p>
            Aplikasi FreedomLife dibuat oleh{' '}
            <ExternalLink
              href="https://agallio.xyz"
              className="text-emerald-600 dark:text-emerald-400"
            >
              @agallio
            </ExternalLink>{' '}
            dan 100% open-source. Kode aplikasi dapat diakses publik dan tidak
            untuk diperjualbelikan.
          </p>
          <p className="mt-4">
            FreedomLife terbuka untuk donasi Anda. Anda dapat memberikan donasi
            ke dua channel donasi di{' '}
            <ExternalLink
              href="https://saweria.co/agallio"
              className="text-emerald-600 dark:text-emerald-400"
            >
              Saweria
            </ExternalLink>
            , dan juga{' '}
            <ExternalLink
              href="https://paypal.me/agallio"
              className="text-emerald-600 dark:text-emerald-400"
            >
              PayPal
            </ExternalLink>
            . Dengan melakukan donasi Anda mendukung perkembangan FreedomLife
            untuk menjangkau lebih banyak orang, dan menjadi teman rohani setiap
            mereka. Terima kasih, Tuhan memberkati.
          </p>
        </div>

        <button
          aria-label="Keluar Dari Panduan Baca"
          className="w-full border border-emerald-700 text-emerald-700 py-2 uppercase rounded-full text-sm font-bold transition transform hover:bg-emerald-100 dark:border-transparent dark:bg-white dark:bg-opacity-20 dark:text-white dark:hover:bg-opacity-30 focus:outline-none"
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
