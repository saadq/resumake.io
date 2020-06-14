import styled from 'styled-components'
import { darken } from 'polished'

export const RemoveItemButton = styled.button`
  margin: 0;
  margin-left: 1em;
  padding: 0 1em;
  background: ${(props) => darken(0.05, props.theme.gray)};
  color: ${(props) => props.theme.foreground};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.gray};
    background: ${(props) => props.theme.primary};
  }
`
