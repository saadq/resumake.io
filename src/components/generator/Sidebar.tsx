import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import axios from 'axios';
import { MdDragIndicator } from 'react-icons/md'

import { colors } from '../../theme'
import { PrimaryButton, IconButton } from '../core/Button'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getToken } from '../../token/token';

const Aside = styled.aside`
  grid-area: sidebar;
  border-right: 1px solid ${colors.borders};
  padding: 24px 36px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;

  button {
    cursor: grab;
  }
`

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  font-weight: 300;
  color: ${colors.foreground};

  ${(props) => props.$active && `color: ${colors.primary};`}
`

export function Sidebar() {
  const router = useRouter()
  const { section: currSection = 'basics' } = router.query

  const sectionLinks = [
    { label: 'Templates', section: 'templates', data: 'template' },
    { label: 'Profile', section: 'basics', data: 'profile' },
    { label: 'Education', section: 'education', data: 'education' },
    { label: 'Work Experience', section: 'work', data: 'work' },
    { label: 'Skills', section: 'skills', data: 'skills' },
    { label: 'Projects', section: 'projects', data: 'projects' },
    { label: 'Awards', section: 'awards', data: 'awards' },
  ]
 
  const [tokenSection, setTokenSection] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setTokenSection(token || '');
    };

    fetchToken();
  }, []);
  

  

  return (
<div>
<div className = "sidebar">
     <Aside>
      <Nav>
        {sectionLinks.map(({ label, section, data }) => {
          console.log('key', label)
          return (
            <div key={section} style={{ display: 'flex', gap: 8 }}>
              <IconButton type="button">
                <MdDragIndicator />
              </IconButton>
              <StyledLink
                href={`/generator?section=${section}`}
                $active={section === currSection}
              >
                {label}
              </StyledLink>
            </div>
          )
        })}
      </Nav>
      <PrimaryButton form="resume-form">
            {tokenSection ? "Modifier CV" : "MAKE"}
          </PrimaryButton>
    </Aside>
   </div>
</div>
  )
}
