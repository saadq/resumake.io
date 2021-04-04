import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IoBriefcase, IoConstruct, IoPerson, IoSchool } from 'react-icons/io5'

import { Logo } from '../../../common/components'
import { IconLink } from '../../../common/components/IconLink'
import { colors, sizes } from '../../../common/theme'

export const Aside = styled.aside`
  background: ${colors.black1};
  width: ${sizes.sidebar.width};
  height: calc(${sizes.sidebar.height} - ${sizes.footer.height});
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.75);
  position: fixed;
`

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export function Sidebar() {
  return (
    <Aside>
      <Link to="/">
        <Logo marginTop={30} marginBottom={100} />
      </Link>
      <Nav>
        <IconLink to="/generator/profile" tooltip="Profile" tooltipId="profile">
          <IoPerson size={'1.25rem'} />
        </IconLink>
        <IconLink
          to="/generator/experience"
          tooltip="Work Experience"
          tooltipId="experience"
        >
          <IoBriefcase size={'1.25rem'} />
        </IconLink>
        <IconLink
          to="/generator/education"
          tooltip="Education"
          tooltipId="education"
        >
          <IoSchool size={'1.25rem'} />
        </IconLink>
        <IconLink to="/generator/skills" tooltip="Skills" tooltipId="skills">
          <IoConstruct size={'1.25rem'} />
        </IconLink>
      </Nav>
    </Aside>
  )
}
