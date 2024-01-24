import styled from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { colors } from '../../theme'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-size: 0.85em;
  text-align: center;
  text-decoration: none;
  width: 175px;
  height: 45px;
  margin: 7px 0;
  background: transparent;
  color: white;
  border-radius: 100px;
  border: 1px solid ${darken(0.1, colors.primary)};
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.45, colors.primary)},
      ${darken(0.3, colors.primary)}
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

export const PrimaryButton = styled(Button)`
  background: linear-gradient(
    40deg,
    ${darken(0.3, colors.primary)},
    ${colors.primary}
  );
  &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.4, colors.primary)},
      ${colors.primary}
    );
  }
`

export const MiniButton = styled(Button)`
  height: unset;
  width: unset;
  padding: 6px 24px;
  background: ${colors.borders};
  border: none;
  border-radius: 4px;
`

export const AddButton = styled.button`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  color: ${colors.primary};
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background: transparent;
  color: white;
  border-radius: 4px;

  :hover {
    background: ${colors.borders};
  }

  :focus {
    background: ${colors.borders};
  }
`
