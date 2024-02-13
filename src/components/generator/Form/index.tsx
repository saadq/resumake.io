import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form'
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

import latex from '../../../lib/latex'
import getTemplateData from '../../../lib/templates'
import { getToken } from '../../../token/token';

async function generateResume(formData: FormValues): Promise<string> {
  const { texDoc, opts } = getTemplateData(formData)
  return latex(texDoc, opts)
}

const StyledForm = styled.form`
  grid-area: form;
  overflow: auto;
`

const initialFormValues: FormValues = {
  headings: {},
  sections: ['profile', 'education', 'work', 'skills', 'projects', 'awards'],
  selectedTemplate: 1
}

export function Form() {
  const router = useRouter()
  const { section: currSection = 'basics' } = router.query

  const [resume, setResume] = useAtom(resumeAtom)
  const formContext = useForm<FormValues>({ defaultValues: initialFormValues })

  const TokenSection = getToken();
  const Token = TokenSection && JSON?.parse(TokenSection);

  console.log('id token', TokenSection)


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


  const [cvData, setCvData] = useState(null);
  
  useEffect(() => {
    const TokenSection = getToken();
    const Token = JSON.parse(TokenSection);

    console.log('token email', Token?.user.email)
  
   
    const fetchCVData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cv/${Token.user.email}`);
        setCvData(response.data.cv);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du CV', error);
      }
    };
  
    // Add a delay (e.g., 2 seconds) before making the API call again
    const delay = 2000;
    const timeoutId = setTimeout(() => {
      fetchCVData();
    }, delay);
  
    // Clear the timeout if the component unmounts or the effect runs again
    return () => clearTimeout(timeoutId);
  
  }, []); // Make sure to pass an empty dependency array to run this effect only once



  useEffect(() => {
    const TokenSection = getToken();
   
    if (TokenSection) {
      // TODO: validate JSON schema using Zod

      const jsonResume = cvData;
      formContext.reset(jsonResume)
    
    }
    const subscription = formContext.watch((data) => {
      localStorage.setItem('jsonResume', JSON.stringify(data))
    })
    return () => subscription.unsubscribe()
  }, [formContext, cvData])

  /* console.log('hu', cvData); */

  const handleFormSubmit = useCallback(async () => {
    const formValues = formContext.getValues()
   
    setResume({ ...resume, isLoading: true })

    /* try {
        if(Token) {
            const  apiUrl = `http://127.0.0.1:8000/api/cv/${Token.user.email}/update`;
            console.log('bf', formValues.basics)
            const Data = {
              "basics":"{name:'Ms. Stephania O'Connell', email:'sean69@example.com' ,location:'Abidjan, CI', phone:'(225) 0777401407'}",
              "headings":"{name: 'bernard', email: 'warren49@example.com', location: 'yakro, ci', phone:'0777401407'}",
              "projects": [ "{awards: 'koffi', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'koffi'}"],
              "skills": [ "{awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"],
              "works": [ "{awards: 'kofii', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"],
              "awards": [ "{awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"],
              "education": [ "{awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"] ,   
              "user_id": Token?.user.id
            }

            console.log('data data', Data)

            const response = await axios.put(apiUrl, Data, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                alert("Données modifiée avec succès");
            }).catch((error) => {
                alert("Erreur");
            });

        } else {
            const newResumeUrl = await generateResume(formValues)
            setResume({ ...resume, url: newResumeUrl, isLoading: false })
            const newFormValues = JSON.stringify(formValues)

            const formData = JSON.parse(newFormValues);

            const Data = {
                "basics": { name: formData.basics.name, email: formData.basics.email, location: formData.basics.location.address, phone:formData.basics.phone},
                "headings": {awards: formData.headings.awards, projects: formData.headings.projects, skills: formData.headings.skills, works:formData.headings.work, education:formData.headings.education},
                "projects":[{description: formData.projects[0].description, keywords:formData.projects[0].keywords, name: formData.projects[0].name, url: formData.projects[0].url}],
                "skills":  [{keywords: formData.skills[0].keywords, name:formData.skills[0].name}],
                "works": [ {company: formData.work[0].company, endDate:formData.work[0].endDate, highlights:formData.work[0].highlights, position:formData.work[0].position, startDate: formData.work[0].startDate, summary:formData.work[0].summary}],
                "awards": [{awarder: formData.awards[0].awarder, date:formData.awards[0].date, summary: formData.awards[0].summary, title: formData.awards[0].title}],
                "education":[{area: formData.education[0].area, endDate:formData.education[0].endDate, institution: formData.education[0].institution, startDate: formData.education[0].startDate, studyType:formData.education[0].studyType}],        
               "user_id":2
            }

            const apiUrl = "http://127.0.0.1:8000/api/saveCV"

            const response = await axios.post(apiUrl, Data, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                alert("Données ajoutées avec succès");
            }).catch((error) => {
                alert("Erreur");
            });
        }

    } catch (error) {
      console.error(error)
      setResume({ ...resume, isError: true, isLoading: false })
    } */

    try {
      if (Token) {
          const apiUrl = `http://127.0.0.1:8000/api/cv/champlin.trevor@example.com/update`;
          console.log('Avant', formValues.basics);
          
          const Data = {
            "basics":"{name:'Ms. Stephania O'Connell', email:'champlin.trevor@example.com' ,location:'Abidjan, CI', phone:'(225) 0777401407'}",
             "headings":"{name: 'bernard', email: 'warren49@example.com', location: 'yakro, ci', phone:'0777401407'}",
            "projects": [ "{awards: 'koffisfsf', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'koffi'}"],
            "skills": [ "{awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"],
            "works": [ "{awards: 'kofii', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"],
            "awards": [ "{awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"],
            "education": [ "{awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works:'0777401407', education:'boris'}"]
    }
  
          console.log('Données', Data);
  
          const response = await axios.put(apiUrl, {
            basics: { name: "Ms. Stephania O'Connell", email: 'champlin.trevor@example.com', location: 'Abidjan, CI', phone: '(225) 0777401407' },
            headings: { name: 'bernard', email: 'warren49@example.com', location: 'yakro, ci', phone: '0777401407' },
            projects: [{ awards: 'koffisfsf', projects: 'warren49@example.com', skills: 'yakro, ci', works: '0777401407', education: 'koffi' }],
            skills: [{ awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works: '0777401407', education: 'boris' }],
            works: [{ awards: 'kofii', projects: 'warren49@example.com', skills: 'yakro, ci', works: '0777401407', education: 'boris' }],
            awards: [{ awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works: '0777401407', education: 'boris' }],
            education: [{ awards: 'boris', projects: 'warren49@example.com', skills: 'yakro, ci', works: '0777401407', education: 'boris' }]
          }, {
            headers: { 'Content-Type': 'application/json' }
          });
          
  
          alert("Données modifiées avec succès");
      } else {
          const newResumeUrl = await generateResume(formValues);
          setResume({ ...resume, url: newResumeUrl, isLoading: false });
          
          const formData = JSON.parse(JSON.stringify(formValues));
  
          const Data = {
              "basics": {
                  name: formData.basics.name,
                  email: formData.basics.email,
                  location: formData.basics.location.address,
                  phone: formData.basics.phone
              },
              "headings": {
                  awards: formData.headings.awards,
                  projects: formData.headings.projects,
                  skills: formData.headings.skills,
                  works: formData.headings.work,
                  education: formData.headings.education
              },
              "projects": [{
                  description: formData.projects[0].description,
                  keywords: formData.projects[0].keywords,
                  name: formData.projects[0].name,
                  url: formData.projects[0].url
              }],
              "skills": [{
                  keywords: formData.skills[0].keywords,
                  name: formData.skills[0].name
              }],
              "works": [{
                  company: formData.work[0].company,
                  endDate: formData.work[0].endDate,
                  highlights: formData.work[0].highlights,
                  position: formData.work[0].position,
                  startDate: formData.work[0].startDate,
                  summary: formData.work[0].summary
              }],
              "awards": [{
                  awarder: formData.awards[0].awarder,
                  date: formData.awards[0].date,
                  summary: formData.awards[0].summary,
                  title: formData.awards[0].title
              }],
              "education": [{
                  area: formData.education[0].area,
                  endDate: formData.education[0].endDate,
                  institution: formData.education[0].institution,
                  startDate: formData.education[0].startDate,
                  studyType: formData.education[0].studyType
              }]
          };
  
          const apiUrl = "http://127.0.0.1:8000/api/saveCV";
  
          const response = await axios.post(apiUrl, Data, {
              headers: { "Content-Type": "multipart/form-data" }
          });
  
          alert("Données ajoutées avec succès");
      }
  } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur");
  }
  
  }, 
  [formContext, resume, setResume])

  
  return (
    <FormProvider {...formContext}>
      <StyledForm
        id="resume-form"
        onSubmit={formContext.handleSubmit(handleFormSubmit)}
      >
        {currSection === 'templates' && <TemplatesSection />}
        {currSection === 'basics' && <ProfileSection />}
        {currSection === 'education' && <EducationSection />}
        {currSection === 'work' && <WorkSection />}
        {currSection === 'skills' && <SkillsSection />}
        {currSection === 'awards' && <AwardSection />}
        {currSection === 'projects' && <ProjectsSection />}
      </StyledForm>
    </FormProvider>
  )
}