/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Link, type Location } from 'react-router-dom'
import Form from '../../features/form/components'
import Preview from '../../features/preview/components'
import { SideNav, Progress } from '../../features/ordered-sections/components'
import { colors, sizes } from '../../common/theme'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Content = styled.main`
  display: flex;
  margin-top: ${sizes.header};
  margin-left: ${sizes.sideNav};
  width: calc(100% - ${sizes.sideNav});
  height: calc(100% - ${sizes.header} - ${sizes.footer} - 2px);

  @media screen and (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
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

const Footer = styled.footer`
  width: 100%;
  height: ${sizes.footer};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: ${colors.background};
  border-top: 1px solid ${colors.borders};
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
        <Preview />
      </Content>
      <Footer>
        <Progress />
      </Footer>
    </Layout>
  )
}

export default Generator
