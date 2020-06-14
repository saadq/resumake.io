import styled from 'styled-components'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'

interface Props {
  background?: string
  flex?: boolean
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  width?: number | string
  height?: number | string
  margin?: number | string
  marginVertical?: number | string
  marginHorizontal?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginLeft?: number | string
  marginRight?: number | string
  padding?: number | string
  paddingVertical?: number | string
  paddingHorizontal?: number | string
  paddingTop?: number | string
  paddingBottom?: number | string
  paddingLeft?: number | string
  paddingRight?: number | string
}

export const Card = styled.div<Props>`
  position: relative;
  display: ${(props) => (props.flex ? 'flex' : 'static')};
  flex-direction: ${(props) => props.flexDirection ?? 'column'};
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};
  align-items: ${(props) => props.alignItems ?? 'stretch'};
  width: ${(props) => props.width ?? 'auto'};
  height: ${(props) => props.height ?? 'auto'};
  padding: ${(props) => props.padding ?? '1.25em 1em'};
  margin-top: ${(props) => props.marginTop ?? '0'};
  margin-bottom: ${(props) => props.marginBottom ?? '0'};
  background: ${(props) => props.background ?? props.theme.darkGray};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
  border-radius: 4px;

  &:hover ${RemoveSubsectionButton} {
    opacity: 1;
  }
`
