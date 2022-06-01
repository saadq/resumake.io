import styled from 'styled-components'

interface Props {
  gap?: string
  margin?: string
  padding?: string
}

export const Flex = styled.div<Props>`
  display: flex;
  gap: ${(props) => props.gap ?? 0};
  margin: ${(props) => props.margin ?? 0};
  padding: ${(props) => props.margin ?? 0};
`
