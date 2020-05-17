import styled from 'styled-components'

interface Props {
  background: string
}

export const Header = styled.header<Props>`
  background: ${(props) => props.background};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 3.5em;
  padding: 1em 0;
  display: flex;
  align-items: center;
`
