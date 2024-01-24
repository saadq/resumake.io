import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { MdClose, MdDragIndicator } from 'react-icons/md'
import styled from 'styled-components'

import { Input } from '../../../core/Input'
import { FormInput } from '../../../core/FormInput'
import { IconButton } from '../../../core/Button'

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 4px;
  margin: 0.5rem 0;
`

interface HighlightsProps {
  label: string
  name: `${'work' | 'volunteer' | 'projects'}.${number}.highlights`
  placeholder: string
}

export default function Highlights({
  name,
  label,
  placeholder
}: HighlightsProps) {
  const { fields, append, remove } = useFieldArray({ name })

  return (
    <>
      <label>{label}</label>
      <ListContainer>
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <IconButton type="button">
              <MdDragIndicator />
            </IconButton>
            <Input name={`${name}.${i}`} placeholder={placeholder} />
            <IconButton type="button" onClick={() => remove(i)}>
              <MdClose />
            </IconButton>
          </Fragment>
        ))}
        <FormInput style={{ gridColumn: '2/3' }} onSubmit={append} />
      </ListContainer>
    </>
  )
}
