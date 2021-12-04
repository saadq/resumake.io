import { useCallback } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { formAtom } from '../../../atoms/form'
import { resumeAtom } from '../../../atoms/resume'
import { colors, sizes } from '../../../theme'
import { FormValues } from '../../../types/form'
import { generateResume } from '../../../api/generateResume'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${sizes.formSection.width};
  background: ${colors.background};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: auto;
  padding-bottom: calc(2.5rem + ${sizes.footer.height});
`

export function Form() {
  const [form, setForm] = useAtom(formAtom)
  const [resume, setResume] = useAtom(resumeAtom)
  const formContext = useForm<FormValues>({ defaultValues: form })

  const handleFormSubmit = useCallback(async () => {
    const formValues = formContext.getValues()
    setResume({ ...resume, isLoading: true })
    try {
      const newResumeUrl = await generateResume(formValues)
      setResume({ ...resume, url: newResumeUrl, isLoading: false })
      setForm(formValues)
    } catch (error) {
      setResume({ ...resume, isError: true, isLoading: false })
    }
  }, [formContext, resume, setResume, setForm])

  return (
    <FormProvider {...formContext}>
      <StyledForm
        id="resume-form"
        onSubmit={formContext.handleSubmit(handleFormSubmit)}
        onChange={handleFormSubmit}
      >
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
