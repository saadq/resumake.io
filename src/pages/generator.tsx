import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { Form } from '../components/generator/form/Form'
import { Footer } from '../components/generator/layout/Footer'
import { Header } from '../components/generator/layout/Header'
import { Sidebar } from '../components/generator/layout/Sidebar'
import { Templates } from '../components/generator/templates/Templates'
import { sizes } from '../theme'
import { useDevtools } from '../atoms/useDevtools'

const Preview = dynamic(
  async () => (await import('../components/generator/preview/Preview')).Preview,
  { ssr: false }
)

const Sections = styled.div`
  display: flex;
  position: relative;
  top: ${sizes.header.height};
  left: ${sizes.sidebar.width};
  width: ${sizes.header.width};
  height: calc(100vh - ${sizes.header.height});
  overflow: hidden;
`

export default function GeneratorPage() {
  useDevtools()

  return (
    <>
      <Sidebar />
      <Header />
      <Sections>
        <Form />
        <Preview />
        <Templates />
      </Sections>
      <Footer />
    </>
  )
}
