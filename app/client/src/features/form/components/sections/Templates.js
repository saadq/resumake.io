/**
 * @flow
 */

import React, { Component } from 'react'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import Section from '../../../../shared/components/layout/Section'

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
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
`

const ctx = require.context('./template-images', true)
const imgs = ctx.keys().map(ctx)

type State = { index: number, isOpen: boolean }
type Props = {}

class Templates extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
      index: 0
    }
  }

  render() {
    const { index } = this.state
    const count = imgs.length

    return (
      <Section heading="Choose a Template">
        <Grid onClick={() => this.setState({ isOpen: true })}>
          {imgs.map((src, i) => <Image key={i} src={src} />)}
        </Grid>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={imgs[index]}
            prevSrc={imgs[(index + count - 1) % count]}
            nextSrc={imgs[(index + 1) % count]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({ index: (index + count - 1) % count })}
            onMoveNextRequest={() =>
              this.setState({ index: (index + 1) % count })}
            imageCaption={`Template ${index + 1} of ${count}`}
          />
        )}
      </Section>
    )
  }
}

export default Templates
