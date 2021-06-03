import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  IoPersonSharp as ProfileIcon,
  IoSchool as EducationIcon,
  IoBriefcase as WorkIcon,
  IoConstruct as SkillsIcon,
  IoAppsSharp as ProjectsIcon,
  IoRibbon as AwardsIcon
} from 'react-icons/io5'
import { Logo } from '../common/Logo'
import { RoundButton } from '../common/RoundButton'
import { NavIcon } from '../common/NavIcon'
import { Tooltip } from '../common/Tooltip'
import { colors, sizes } from '../../theme'

export const Aside = styled.aside`
  background: ${colors.gray3};
  width: ${sizes.sidebar.width};
  height: ${sizes.sidebar.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  position: fixed;
  z-index: 999;
`

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HomeLink = styled(Link)`
  margin-top: 30px;
  margin-bottom: 30px;
`

export function Sidebar() {
  return (
    <Aside>
      <HomeLink to="/">
        <Logo />
      </HomeLink>
      <Nav>
        <NavIcon
          to="/generator/basics"
          tooltip="Profile"
          tooltipId="tooltip-profile"
        >
          <ProfileIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          to="/generator/education"
          tooltip="Education"
          tooltipId="tooltip-education"
        >
          <EducationIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          to="/generator/experience"
          tooltip="Work Experience"
          tooltipId="tooltip-experience"
        >
          <WorkIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          to="/generator/skills"
          tooltip="Skills"
          tooltipId="tooltip-skills"
        >
          <SkillsIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          to="/generator/projects"
          tooltip="Projects"
          tooltipId="tooltip-projects"
        >
          <ProjectsIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          to="/generator/awards"
          tooltip="Awards"
          tooltipId="tooltip-awards"
        >
          <AwardsIcon size={'1.3rem'} />
        </NavIcon>
      </Nav>
      <Tooltip
        color={colors.primary}
        text="Add new section"
        tooltipId="tooltip-addNewSection"
      />
      <RoundButton margin="2rem 0 0 0" data-tip data-for="addNewSection">
        +
      </RoundButton>
    </Aside>
  )
}
