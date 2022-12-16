import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { Form } from '../components/generator/form/Form'
// import { Footer } from '../components/generator/layout/Footer'
import { Header } from '../components/generator/layout/Header'
import { Sidebar } from '../components/generator/layout/Sidebar'
// import { Templates } from '../components/generator/templates/Templates'
import { useDevtools } from '../atoms/useDevtools'

const Preview = dynamic(
  async () => (await import('../components/generator/preview/Preview')).Preview,
  { ssr: false }
)

const Main = styled.main`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-areas:
    'header header header'
    'sidebar form preview';
  height: 100vh;
`

export default function GeneratorPage() {
  useDevtools()

  return (
    <Main>
      <Header />
      <Sidebar />
      <Form />
      <Preview />
      {/* <Templates /> */}
      {/* <Footer /> */}
    </Main>
  )
}
