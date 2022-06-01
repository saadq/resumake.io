import styled from 'styled-components'
import { sizes, colors } from '../../../theme'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: ${sizes.sidebar.width};
  width: ${sizes.header.width};
  height: ${sizes.header.height};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid black;
  background: ${colors.header};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  z-index: 99;
`

const HeaderSection = styled.section<{ width: string }>`
  height: 100%;
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  &:last-child {
    border: 0;
  }
`

export function Header() {
  return (
    <StyledHeader>
      <HeaderSection width={sizes.formSection.width}>Form</HeaderSection>
      <HeaderSection width={sizes.previewSection.width}>Preview</HeaderSection>
      <HeaderSection width={sizes.templatesSection.width}>
        Templates
      </HeaderSection>
    </StyledHeader>
  )
}
