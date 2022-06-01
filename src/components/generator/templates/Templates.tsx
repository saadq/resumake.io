import styled from 'styled-components'
import { colors, sizes } from '../../../theme'

const Section = styled.section`
  width: ${sizes.templatesSection.width};
  background: ${colors.background};
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`

export function Templates() {
  return <Section></Section>
}
