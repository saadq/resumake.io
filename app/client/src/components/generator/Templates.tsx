import styled from 'styled-components'
import { Header } from './Header'
import { colors, sizes } from '../../theme'

const Section = styled.section`
  flex: 1;
  background: ${colors.gray2};
  height: ${sizes.templatesSection.height};
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`

export function Templates() {
  return (
    <Section>
      <Header>
        <h1>Templates</h1>
      </Header>
    </Section>
  )
}
