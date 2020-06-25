import styled from 'styled-components'

interface Props {
  accent?: boolean
}

export const Header = styled.header<Props>`
  background: ${(props) =>
    props.accent ? props.theme.lightBlack : props.theme.black};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 4em;
  padding: 1em 0;
  display: flex;
  align-items: center;
`
