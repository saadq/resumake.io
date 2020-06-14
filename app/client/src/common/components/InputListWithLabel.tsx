import React from 'react'
import styled from 'styled-components'
import { Label } from 'common/components/Label'
import { TextInput } from 'common/components/TextInput'
import { AddItemButton } from 'common/components/AddItemButton'
import { RemoveItemButton } from 'common/components/RemoveItemButton'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
