import { DefaultSeo } from 'next-seo'

const SeoConfig = {
  title: 'FreedomLife',
  description: 'Aplikasi Panduan Baca Alkitab Setahun',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://freedomlife.id',
    site_name: 'FreedomLife',
    images: [
      {
        url: 'http://freedomlife.id/images/og-freedomlife.png',
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
