import styled from 'styled-components'
import { colors, sizes } from '../../common/theme'

const Section = styled.section`
  width: ${sizes.formSection.width};
  background: ${colors.gray2};
  height: calc(${sizes.formSection.height} - ${sizes.footer.height});
  margin-left: ${sizes.sidebar.width};
  box-shadow: 0px 4px 10px #000000;
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

export function Form() {
  return (
    <Section>
      <Header>
        <h1>Education</h1>
      </Header>
    </Section>
  )
}
