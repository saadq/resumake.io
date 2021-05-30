import styled from 'styled-components'
import { Header } from '../common/Header'
import { colors, sizes } from '../../theme'

const Section = styled.section`
  width: ${sizes.previewSection.width};
  background: ${colors.gray2};
  height: ${sizes.previewSection.height};
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`

export function Preview() {
  return (
    <Section>
      <Header>
        <h1>Toolbar</h1>
      </Header>
    </Section>
  )
}
