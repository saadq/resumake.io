import React, { useRef, ReactNode } from 'react'
import styled from 'styled-components'
import { AiFillEdit } from 'react-icons/ai'
import { TextInput } from 'common/components/TextInput'
import { Header } from './Header'

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  margin-bottom: 2em;
  padding: 0;
  background: 0;
  display: flex;
  flex-direction: column;
`

const SectionContent = styled.section`
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Varela;
`

const SectionNameEditSection = styled.div`
  width: 85%;
  padding: 1em 0;
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const EditIcon = styled(AiFillEdit)`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`

const SectionNameInput = styled(TextInput)`
  background: ${({ theme }) => theme.black};
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  font-family: Varela Round;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.05em;
  border: none;

  &:focus {
    border: none;
  }
`

const SectionNameLegend = styled(SectionNameInput.withComponent('legend'))`
  width: 85%;
  padding: 1em 0;
  margin: 0 auto;
`

interface Props {
  title: string
  inputName?: string
  allowSectionRenaming?: boolean
  children: ReactNode
}

export function FormSection({
  title,
  inputName,
  allowSectionRenaming = true,
  children
}: Props) {
  const inputRef = useRef<any>(null)

  const handleEditClick = () => {
    inputRef?.current?.ref?.current?.ref?.current?.focus()
  }

  return (
    <Fieldset>
      <Header>
        {allowSectionRenaming ? (
          <SectionNameEditSection>
            <EditIcon onClick={handleEditClick} />
            <SectionNameInput
              forwardRef
              ref={inputRef}
              name={inputName}
              placeholder={title}
              component="input"
            />
          </SectionNameEditSection>
        ) : (
          <SectionNameLegend>{title}</SectionNameLegend>
        )}
      </Header>
      <SectionContent>{children}</SectionContent>
    </Fieldset>
  )
}
