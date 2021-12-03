import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { Routes, Route, Navigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { generateResume } from '../../../api/generateResume'
import { formAtom } from '../../../atoms/form'
import { colors, sizes } from '../../../theme'
import { FormValues } from '../../../types/form'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${sizes.formSection.width};
  background: ${colors.background};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: scroll;
`

export function Form() {
  const [formState, setFormState] = useAtom(formAtom)
  const formContext = useForm<FormValues>({
    defaultValues: formState
  })

  const handleFormChange = useCallback(() => {
    const formValues = formContext.getValues()
    setFormState(formValues)
  }, [formContext, setFormState])

  return (
    <FormProvider {...formContext}>
      <StyledForm onChange={handleFormChange}>
        <Routes>
          <Route path="/basics" element={<ProfileSection />} />
          <Route path="/education" element={<EducationSection />} />
          <Route path="/awards" />
          <Route path="/experience" />
          <Route path="/skills" />
          <Route path="/projects" />
          <Route
            path="/"
            element={<Navigate replace to="/generator/basics" />}
          />
        </Routes>
      </StyledForm>
    </FormProvider>
  )
}
