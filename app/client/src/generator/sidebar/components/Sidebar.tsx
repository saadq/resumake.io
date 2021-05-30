import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  IoBriefcase,
  IoConstruct,
  IoPerson,
  IoSchool,
  IoRibbon
} from 'react-icons/io5'
import {
  Logo,
  RoundButton,
  IconLink,
  Tooltip
} from '../../../common/components'
import { colors, sizes } from '../../../common/theme'

export const Aside = styled.aside`
  background: #1d2026;
  width: ${sizes.sidebar.width};
  height: calc(${sizes.sidebar.height} - ${sizes.footer.height});
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.3);
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
  margin-bottom: 50px;
`

export function Sidebar() {
  return (
    <Aside>
      <HomeLink to="/">
        <Logo />
      </HomeLink>
      <Nav>
        <IconLink to="/generator/basics" tooltip="Profile" tooltipId="profile">
          <IoPerson size={'1.3rem'} />
        </IconLink>
        <IconLink
          to="/generator/education"
          tooltip="Education"
          tooltipId="education"
        >
          <IoSchool size={'1.3rem'} />
        </IconLink>
        <IconLink
          to="/generator/experience"
          tooltip="Work Experience"
          tooltipId="experience"
        >
          <IoBriefcase size={'1.3rem'} />
        </IconLink>
        <IconLink to="/generator/skills" tooltip="Skills" tooltipId="skills">
          <IoConstruct size={'1.3rem'} />
        </IconLink>
        <IconLink to="/generator/awards" tooltip="Skills" tooltipId="skills">
          <IoRibbon size={'1.3rem'} />
        </IconLink>
      </Nav>
      <Tooltip
        color={colors.primary}
        text="Add new section"
        tooltipId="addNewSection"
      />
      <RoundButton margin="2rem 0 0 0" data-tip data-for="addNewSection">
        +
      </RoundButton>
    </Aside>
  )
}
