/**
 * @flow
 */

import React from 'react'
import Loadable from 'react-loadable'
import styled from 'styled-components'
import Form from '../../features/form/components'
import { SideNav, Progress } from '../../features/progress/components'
import { Logo, Loader } from '../../common/components'
import { colors, sizes } from '../../common/theme'
import type { Location } from 'react-router-dom'

const Layout = styled.div`
  display: flex;
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

  @media screen and (max-width: 850px) {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
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

const LoadablePreview = Loadable({
  loader: () => import('../../features/preview/components'),
  loading: Loader
})

type Props = {
  location: Location
}

function Generator({ location }: Props) {
  return (
    <Layout>
      <Header>
        <Logo />
      </Header>
      <SideNav />
      <Content>
        <Form location={location} />
        <LoadablePreview hideOnMobile />
      </Content>
      <Footer>
        <Progress />
      </Footer>
    </Layout>
  )
}

export default Generator
