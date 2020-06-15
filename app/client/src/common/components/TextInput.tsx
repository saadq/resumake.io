import styled from 'styled-components'
import { Field } from 'redux-form'

interface Props {
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  width?: string
}

// Needed because of weird type issues with styled-components + redux-form
export const TextInput: any = styled(Field)<Props>`
  background: ${(props) => props.theme.gray};
  border: 2px solid transparent;
  border-radius: 4px;
  padding: 1em;
  width: ${(props) => props.width ?? '100%'};
  color: ${(props) => props.theme.foreground};
  transition: 0.4s border-color ease;
  outline: none;
  margin-top: ${(props) => props.marginTop || 0};
  margin-right: ${(props) => props.marginRight || 0};
  margin-bottom: ${(props) => props.marginBottom || 0};
  margin-left: ${(props) => props.marginLeft || 0};

  &::placeholder {
    color: ${(props) => props.theme.foreground};
    opacity: 0.25;
  }

  &:focus {
    color: ${(props) => props.theme.primary};
    border: 2px solid ${(props) => props.theme.primary};

    &::placeholder {
      opacity: 0.75;
    }
  }
`
