import styled from 'styled-components'
import { lighten } from 'polished'

interface Props {
  width?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  isActive?: boolean
}

export const Button = styled.button<Props>`
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.primary} 0%,
    ${(props) => props.theme.primaryAccent} 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 10px #686ef3;
  border-radius: 4px;
  border: none;
  padding: 1em 2em;
  cursor: pointer;
  outline-color: ${(props) => props.theme.primary};
  margin-top: ${(props) => props.marginTop ?? '0'};
  margin-bottom: ${(props) => props.marginBottom ?? '0'};
  margin-left: ${(props) => props.marginLeft ?? '0'};
  margin-right: ${(props) => props.marginRight ?? '0'};
  font-family: Varela Round;
  font-style: normal;
  font-weight: normal;
  font-size: 0.85em;
  line-height: 17px;
  color: white;
  width: ${(props) => props.width ?? 'auto'};

  &:hover {
    background: linear-gradient(
      180deg,
      ${(props) => lighten(0.04, props.theme.primary)} 0%,
      ${(props) => lighten(0.04, props.theme.primaryAccent)} 100%
    );
  }

  &:focus {
    outline-color: ${(props) => props.theme.primary};
  }
`
