import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { resumeAtom } from '../../../atoms/resume'
import { colors, sizes } from '../../../theme'
import { FormValues } from '../../../types'
import { progressAtom } from '../../../atoms/progress'

async function generateResume(formData: FormValues): Promise<string> {
  const pdfResponse = await fetch('/api/generate-pdf', {
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

const initialFormValues = {
  headings: {},
  sections: [],
  selectedTemplate: 1
}

export function Form() {
  const [resume, setResume] = useAtom(resumeAtom)
  const [progress] = useAtom(progressAtom)
  const formContext = useForm<FormValues>({ defaultValues: initialFormValues })
  const { currSection } = progress

  // TODO: move this to a custom react hook
  useEffect(() => {
    const lastSession = localStorage.getItem('jsonResume')
    if (lastSession) {
      // TODO: validate JSON schema using Zod
      const jsonResume = JSON.parse(lastSession) as FormValues
      formContext.reset(jsonResume)
    }
    const subscription = formContext.watch((data) => {
      localStorage.setItem('jsonResume', JSON.stringify(data))
    })
    return () => subscription.unsubscribe()
  }, [formContext])

  const handleFormSubmit = useCallback(async () => {
    const formValues = formContext.getValues()
    setResume({ ...resume, isLoading: true })
    try {
      const newResumeUrl = await generateResume(formValues)
      setResume({ ...resume, url: newResumeUrl, isLoading: false })
    } catch (error) {
      setResume({ ...resume, isError: true, isLoading: false })
    }
  }, [formContext, resume, setResume])

  return (
    <FormProvider {...formContext}>
      <StyledForm
        id="resume-form"
        onSubmit={formContext.handleSubmit(handleFormSubmit)}
        // onChange={handleFormSubmit}
      >
        {currSection === 'basics' && <ProfileSection />}
        {currSection === 'education' && <EducationSection />}
      </StyledForm>
    </FormProvider>
  )
}
