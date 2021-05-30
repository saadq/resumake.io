import styled from 'styled-components'
import { colors, sizes } from '../../theme'

const Section = styled.section`
  flex: 1;
  background: ${colors.gray2};
  height: ${sizes.templatesSection.height};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
`

const Header = styled.header`
  height: ${sizes.header.height};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  background: ${colors.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
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
