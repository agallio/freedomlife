import { GetServerSideProps } from 'next'

/**
 * Unused page. We still reserved this page to cater users
 * that have saved/bookmarked this page.
 *
 * All users will be redirected to the new page.
 *
 * @deprecated
 */
export default function DeprecatedReadPassagePage() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    redirect: {
      permanent: false,
      destination: `/read/bible?chapter=${query.passage}-${query.chapter}`,
    },
  }
}
