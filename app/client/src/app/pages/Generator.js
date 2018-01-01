/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Link, type Location } from 'react-router-dom'
import Form from '../../features/form/components'
import { SideNav, Progress } from '../../features/ordered-sections/components'
import { colors, sizes } from '../../common/theme'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Content = styled.main`
  flex: 1;
  padding: 0;
  margin-top: ${sizes.header};
  margin-left: ${sizes.sideNav};
  margin-bottom: calc(${sizes.footer} + 15px);
  width: calc(100% - ${sizes.sideNav});
  position: relative;

  @media screen and (max-width: 1000px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    left: initial;
  }
`

const Header = styled.header`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: ${sizes.header};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.background};
  border-bottom: 1px solid ${colors.borders};
`

const Logo = styled(Link)`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Nexa Light';
  font-size: 2.25em;
  color: white;
  letter-spacing: 2px;
`

const Accent = styled.em`
  font-style: normal;
  color: ${colors.primary};
`

type Props = {
  location: Location
}

function Generator({ location }: Props) {
  return (
    <Layout>
      <Header>
        <Logo to="/">
          Resu<Accent>make</Accent>
        </Logo>
      </Header>
      <SideNav />
      <Content>
        <Form location={location} />
      </Content>
      <Progress />
    </Layout>
  )
}

export default Generator
