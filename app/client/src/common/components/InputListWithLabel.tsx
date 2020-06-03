import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { Label } from 'common/components/Label'
import { TextInput } from 'common/components/TextInput'
import { darkTheme } from 'common/theme'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const AddItemButton = styled.button`
  background: ${darkTheme.gray};
  color: ${darkTheme.primary};
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
  background: #2f3237;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${lighten(0.1, darkTheme.gray)};
    color: white;
  }
`

const RemoveItemButton = styled.button`
  margin: 0;
  margin-left: 1em;
  padding: 0 1em;
  background: ${darken(0.05, darkTheme.gray)};
  color: ${darkTheme.foreground};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${darkTheme.gray};
    background: ${darkTheme.primary};
  }
`

interface Props {
  label: string
  namePrefix: string
  placeholder: string
  list: Array<unknown>
  addItem: () => void
  removeItem: (index: number) => void
}

export function InputListWithLabel({
  label,
  namePrefix,
  placeholder,
  list,
  addItem,
  removeItem
}: Props) {
  return (
    <>
      <Label>{label}</Label>
      {list.map((_, index) => (
        <Row key={index}>
          <TextInput
            name={`${namePrefix}[${index}]`}
            component="input"
            placeholder={placeholder}
          />
          <RemoveItemButton onClick={() => removeItem(index)}>
            X
          </RemoveItemButton>
        </Row>
      ))}
      <ButtonWrapper>
        <AddItemButton onClick={addItem}>+</AddItemButton>
      </ButtonWrapper>
    </>
  )
}
