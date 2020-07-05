import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { formActions } from '../../../slice'
import { useFormValues } from '../../../hooks/useFormValues'
import { Template as TemplateType } from '../../../types/form'

const ctx = require.context('../../../assets', true)
const images = ctx.keys().map(ctx)

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5em;
`

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-bottom: 2em;
  border: 1px solid transparent;
`

const Image = styled.img<{ isActive: boolean }>`
  width: 95%;
  position: relative;
  border-radius: 3px;
  color: #fff;
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;
  opacity: 1;
  cursor: zoom-in;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.4')};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.primary : 'transparent'};
  box-shadow: ${({ isActive }) =>
    isActive
      ? '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 15px #686ef3'
      : 'none'};
`

const TemplateButton = styled(Button)`
  width: 55%;
  margin-top: 0.5em;
  background: ${({ theme, isActive }) =>
    isActive ? theme.primary : theme.darkGray};
  box-shadow: none;
`

export function TemplatesSection() {
  const { selectedTemplate } = useFormValues()
  const dispatch = useDispatch()

  const setTemplate = (templateId: number) => {
    dispatch(
      formActions.setTemplate({ templateId: templateId as TemplateType })
    )
  }

  return (
    <FormSection title="Templates" allowSectionRenaming={false}>
      <ImageGrid>
        {(images as Array<string>).map((imageUrl, i) => (
          <Template key={i}>
            <Image src={imageUrl} isActive={selectedTemplate === i + 1} />
            <TemplateButton
              isActive={selectedTemplate === i + 1}
              onClick={() => setTemplate(i + 1)}
            >
              Select
            </TemplateButton>
          </Template>
        ))}
      </ImageGrid>
    </FormSection>
  )
}
