import styled from 'styled-components'
import { Header } from './Header'
import { colors, sizes } from '../../theme'

const Section = styled.section`
  width: ${sizes.formSection.width};
  background: ${colors.gray2};
  height: ${sizes.formSection.height};
  overflow-y: scroll;
`

export function Form() {
  return (
    <Section>
      <Header>
        <h1>Education</h1>
      </Header>
    </Section>
  )
}
