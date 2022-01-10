import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/generator/basics',
      permanent: true
    }
  }
}

export default function GeneratorPage() {
  return null
}
