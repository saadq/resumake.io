/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Header, SideNav, Content, Footer } from '../features/ui/components'
import Progress from '../features/progress/components'
import Form from '../features/form/components'
import type { Location } from 'react-router-dom'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

type Props = {
  location: Location
}

function Generator({ location }: Props) {
  return (
    <Layout>
      <Header />
      <SideNav />
      <Content>
        <Progress />
        <Form location={location} />
      </Content>
      <Footer />
    </Layout>
  )
}

export default Generator
