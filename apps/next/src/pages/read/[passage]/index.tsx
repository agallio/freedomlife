import { GetStaticProps } from 'next'

export default function Passage() {
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
