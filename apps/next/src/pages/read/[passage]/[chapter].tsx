import { GetServerSideProps } from 'next'

export default function Passage() {
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
