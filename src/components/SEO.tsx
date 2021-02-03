import { DefaultSeo } from 'next-seo'

const SeoConfig = {
  title: 'FreedomLife — Alkitab & Panduan Baca',
  description: 'Aplikasi Alkitab beserta panduan baca selama setahun.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://freedomlife.id',
    title: 'FreedomLife — Alkitab & Panduan Baca',
    site_name: 'FreedomLife',
    images: [
      {
        url: 'http://freedomlife.id/images/og-index.png',
        alt: 'FreedomLife',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
}

const SEO: React.FC = () => <DefaultSeo {...SeoConfig} />

export default SEO
