import styled from 'styled-components'
import {
  IoPersonSharp as ProfileIcon,
  IoSchool as EducationIcon,
  IoBriefcase as WorkIcon,
  IoConstruct as SkillsIcon,
  IoAppsSharp as ProjectsIcon,
  IoRibbon as AwardsIcon
} from 'react-icons/io5'
import { RoundButton } from '../../common/RoundButton'
import { NavIcon } from '../../common/NavIcon'
import { Tooltip } from '../../common/Tooltip'
import { colors, sizes } from '../../../theme'

export const Aside = styled.aside`
  grid-area: sidebar;
  background: ${colors.sidebar};
  width: ${sizes.sidebar.width};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.75);
  border-right: 1px solid black;
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
      <Nav>
        <NavIcon
          sectionToNavigateTo="basics"
          tooltip="Profile"
          tooltipId="tooltip-profile"
        >
          <ProfileIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          sectionToNavigateTo="education"
          tooltip="Education"
          tooltipId="tooltip-education"
        >
          <EducationIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          sectionToNavigateTo="work"
          tooltip="Work Experience"
          tooltipId="tooltip-experience"
        >
          <WorkIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          sectionToNavigateTo="skills"
          tooltip="Skills"
          tooltipId="tooltip-skills"
        >
          <SkillsIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          sectionToNavigateTo="projects"
          tooltip="Projects"
          tooltipId="tooltip-projects"
        >
          <ProjectsIcon size={'1.3rem'} />
        </NavIcon>
        <NavIcon
          sectionToNavigateTo="awards"
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
      <RoundButton
        margin="2rem 0 0 0"
        data-tip
        data-for="tooltip-addNewSection"
      >
        +
      </RoundButton>
    </Aside>
  )
}
