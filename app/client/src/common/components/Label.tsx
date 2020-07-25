import styled from 'styled-components'

export const Label = styled.label`
  font-family: Varela Round;
  font-style: normal;
  font-weight: normal;
  font-size: 0.85em;
  line-height: 12px;
  color: ${(props) => props.theme.labelText};
  display: inline-block;
  margin-bottom: 0.75em;
`
