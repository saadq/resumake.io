import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { formAtom } from '../../../atoms/form'
import { resumeAtom } from '../../../atoms/resume'
import { colors, sizes } from '../../../theme'
import { FormValues } from '../../../types/form'
import { progressAtom } from '../../../atoms/progress'

async function generateResume(formData: FormValues): Promise<string> {
  const pdfResponse = await fetch('/api/generate/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const pdfBlob = await pdfResponse.blob()
  const pdfUrl = URL.createObjectURL(pdfBlob)

  return pdfUrl
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${sizes.formSection.width};
  background: ${colors.background};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: auto;
  padding-bottom: calc(2.5rem + ${sizes.footer.height});
  flex: 1;
`

export function Form() {
  const [form, setForm] = useAtom(formAtom)
  const [resume, setResume] = useAtom(resumeAtom)
  const [progress] = useAtom(progressAtom)
  const formContext = useForm<FormValues>({ defaultValues: form })
  const { currSection } = progress

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
        {currSection === 'basics' && <ProfileSection />}
        {currSection === 'education' && <EducationSection />}
      </StyledForm>
    </FormProvider>
  )
}
