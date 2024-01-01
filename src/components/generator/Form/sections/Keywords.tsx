import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'

import { IconButton } from '../../../core/Button'
import { FormInput } from '../../../core/FormInput'
import { colors } from '../../../../theme'

const Pill = styled.div`
  display: inline-flex;
  border: 1px solid ${colors.borders};
  border-radius: 100px;
  padding: 8px 16px;
  padding-right: 4px;
  gap: 4px;
}
`

const PillsContainer = styled.div`
  display: flex;
  gap: 4px;
  margin: 8px 0;
  align-items: flex-start;
  flex-wrap: wrap;
`

const Label = styled.label`
  display: inline-block;
  color: ${colors.white};
  margin-bottom: 0.5rem;
`

interface KeywordProps {
  label: string
  name: `${'skills' | 'projects'}.${number}.keywords`
  placeholder: string
}

export default function Keywords({ name, label, placeholder }: KeywordProps) {
  const { getValues } = useFormContext()
  const { fields, append, remove } = useFieldArray({ name })

  return (
    <div>
      <Label>{label}</Label>
      <FormInput onSubmit={append} />
      <PillsContainer>
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            <Pill>
              {getValues(`${name}.${i}`)}
              <IconButton type="button" onClick={() => remove(i)}>
                <MdClose />
              </IconButton>
            </Pill>
          </Fragment>
        ))}
      </PillsContainer>
    </div>
  )
}
