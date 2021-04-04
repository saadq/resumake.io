import styled from 'styled-components'
import { Sidebar } from './sidebar/components/SidebarSection'
import { FormSection } from './form/components/FormSection'
import { PreviewSection } from './preview/components/PreviewSection'
import { TemplatesSection } from './templates/components/TemplatesSection'
import { Footer } from './footer/components/Footer'
import { sizes } from '../common/theme'

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${sizes.sidebar.width};
`

export function Generator() {
  return (
    <>
      <Sidebar />
      <Sections>
        <FormSection />
        <PreviewSection />
        <TemplatesSection />
      </Sections>
      <Footer />
    </>
  )
}
