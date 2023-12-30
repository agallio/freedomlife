import { DefaultSeo } from 'next-seo'

const SeoConfig = {
  title: 'freedomlife — Alkitab & Panduan Baca',
  description:
    'freedomlife adalah aplikasi Alkitab dengan panduan baca. Anda dapat melihat panduan baca untuk hari ini dan hari-hari lain dalam bulan yang sama. Anda juga dapat langsung membaca Alkitab dari aplikasi ini sesuai panduan baca yang ada.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://freedomlife.id',
    title: 'freedomlife — Alkitab & Panduan Baca',
    description:
      'freedomlife adalah aplikasi Alkitab dengan panduan baca. Anda dapat melihat panduan baca untuk hari ini dan hari-hari lain dalam bulan yang sama. Anda juga dapat langsung membaca Alkitab dari aplikasi ini sesuai panduan baca yang ada.',
    site_name: 'freedomlife',
    images: [
      {
        url: 'https://freedomlife.id/images/og-index.png',
        alt: `Tulisan dan logo 'freedomlife'`,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
}

export default function SEO() {
  return <DefaultSeo {...SeoConfig} />
}