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
  grid-gap: 20px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`

const Image = styled.img`
  position: relative;
  border: 1px solid #ddd;
  color: #fff;
  border-radius: 5px;
  max-width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: all .4s ease-out;

  &:hover {
    transform: translateY(-3px);
    cursor: pointer;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 15px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -1px rgba(0, 0, 0, 0.2);
  }
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
