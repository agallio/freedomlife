import { GetStaticProps } from 'next'

/**
 * Unused page. We still reserved this page to cater users
 * that have saved/bookmarked this page.
 *
 * All users will be redirected to the new page.
 *
 * @deprecated
 */
export default function DeprecatedReadIndexPage() {
  return null
}

export const getServerSideProps: GetStaticProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  }
}
