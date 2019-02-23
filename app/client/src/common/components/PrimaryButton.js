/**
 * @flow
 */

import styled, { css } from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { colors } from '../theme'

const PrimaryButton = styled.button`
  width: 125px;
  height: 45px;
  margin: 0;
  padding: 0;
  background: linear-gradient(
    40deg,
    ${darken(0.3, colors.primary)},
    ${colors.primary}
  );
  color: white;
  border-radius: 100px;
  border: 1px solid ${darken(0.1, colors.primary)};
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 2px;

  ${props =>
    props.hideOnDesktop &&
    css`
      height: 35px;

      @media screen and (min-width: 850px) {
        display: none;
      }
    `} &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.4, colors.primary)},
      ${colors.primary}
    );
    animation: none;
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 40px rgba(0, 0, 0, 0.16);
    border-color: ${lighten(0.15, colors.primary)};
    color: ${lighten(0.15, colors.primary)};
  }

  &:focus {
    outline: none;
  }
`

export default PrimaryButton
