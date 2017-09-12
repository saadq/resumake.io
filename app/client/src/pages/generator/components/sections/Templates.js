/**
 * @flow
 */

import React from 'react'
import Section from '../layout/Section'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 10px;
`

const Image = styled.img`
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 100%;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,0.1);
`

const ctx = require.context('../../../../assets/img/templates', true)
const imgs = ctx.keys().map(ctx)

function Templates() {
  return (
    <Section heading="Choose a Template">
      <Grid>{imgs.map((src, i) => <Image key={i} src={src} />)}</Grid>
    </Section>
  )
}

export default Templates
