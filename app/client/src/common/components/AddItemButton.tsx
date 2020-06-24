import styled from 'styled-components'
import { lighten } from 'polished'

export const AddItemButton = styled.button`
  background: ${(props) => props.theme.gray};
  color: ${(props) => props.theme.primary};
  font-size: 1.25em;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  margin-top: 0.35em;
  padding: 0;
  width: 2em;
  height: 2em;
  left: 355px;
  top: 674px;
  background: ${(props) => props.theme.lightGray};
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${(props) => lighten(0.1, props.theme.gray)};
    color: ${(props) => props.theme.white};
  }

  &:focus {
    outline-color: ${(props) => props.theme.primary};
  }
`
