import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { TemplatesSection } from './sections/TemplatesSection'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { WorkSection } from './sections/WorkSection'
import { SkillsSection } from './sections/SkillsSection'
import { AwardSection } from './sections/AwardsSection'
import { ProjectsSection } from './sections/projectsSection'
import { resumeAtom } from '../../../atoms/resume'
import { FormValues } from '../../../types'

async function generateResume(formData: FormValues): Promise<string> {
  const pdfResponse = await fetch(
    'https://api.art3m1s.me/resumake/api/generate-pdf',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  )
  const pdfBlob = await pdfResponse.blob()
  const pdfUrl = URL.createObjectURL(pdfBlob)

  return pdfUrl
}

const StyledForm = styled.form`
  grid-area: form;
  overflow: auto;
`

export function Form() {
  const router = useRouter()
  const { section: currSection } = router.query

  const [resume, setResume] = useAtom(resumeAtom)
  const formContext = useFormContext<FormValues>()

  const handleFormSubmit = useCallback(async () => {
    const formValues = convertFormData(formContext.getValues())
    setResume({ ...resume, isLoading: true })
    try {
      const newResumeUrl = await generateResume(formValues)
      setResume({ ...resume, url: newResumeUrl, isLoading: false })
    } catch (error) {
      setResume({ ...resume, isError: true, isLoading: false })
    }
  }, [formContext, resume, setResume])

  return (
    <StyledForm
      id="resume-form"
      onSubmit={formContext.handleSubmit(handleFormSubmit)}
      // onChange={handleFormSubmit}
    >
      {!currSection && <ProfileSection />}
      {currSection === 'templates' && <TemplatesSection />}
      {currSection === 'basics' && <ProfileSection />}
      {currSection === 'education' && <EducationSection />}
      {currSection === 'work' && <WorkSection />}
      {currSection === 'skills' && <SkillsSection />}
      {currSection === 'awards' && <AwardSection />}
      {currSection === 'projects' && <ProjectsSection />}
    </StyledForm>
  )
}

// Temporary function to convert form data to new format with highlights
function convertFormData(formData: FormValues) {
  if (!formData.projects) return formData
  const newProjects = []
  for (let i = 0; i < formData.projects.length; i++) {
    if (formData.projects[i].description) {
      const highlights = formData.projects[i].highlights || []
      highlights.push(formData.projects[i].description || '')
      const newProject = {
        ...formData.projects[i],
        highlights: highlights
      }
      delete newProject.description
      newProjects.push(newProject)
    } else {
      newProjects.push(formData.projects[i])
    }
  }

  return {
    ...formData,
    projects: newProjects
  }
}
