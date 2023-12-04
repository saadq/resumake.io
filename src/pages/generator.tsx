import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { FormValues } from '../types'
import { Form } from '../components/generator/form/Form'
import { Header } from '../components/generator/layout/Header'
import { Sidebar } from '../components/generator/layout/Sidebar'
const Preview = dynamic(
  async () => (await import('../components/generator/preview/Preview')).Preview,
  { ssr: false }
)

const Main = styled.main`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header header'
    'sidebar form preview';
  height: 100vh;
`
const initialFormValues = {
  headings: {},
  sections: [
    'templates',
    'profile',
    'education',
    'work',
    'skills',
    'projects',
    'awards'
  ],
  selectedTemplate: 1
}

export default function GeneratorPage() {
  const formContext = useForm<FormValues>({ defaultValues: initialFormValues })
  return (
    <Main>
      <FormProvider {...formContext}>
        <Header />
        <Sidebar />
        <Form />
        <Preview />
        {/* <Templates /> */}
        {/* <Footer /> */}
      </FormProvider>
    </Main>
  )
}
