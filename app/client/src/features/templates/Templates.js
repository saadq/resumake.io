/**
 * @flow
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import Section from '../../shared/components/layout/Section'
import * as actions from './actions'
import { boxShadow, boxShadowHover } from '../../shared/styles'
import type { State } from '../../shared/types'

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
  ${boxShadow};
  position: relative;
  border: 1px solid #ddd;
  color: #fff;
  border-radius: 5px;
  max-width: 100%;
  transform: translateY(0);
  transition: all 0.4s ease-out;
  &:hover {
    ${boxShadowHover};
    transform: translateY(-3px);
    cursor: pointer;
  }
`

type Props = {
  images: Array<string>,
  index: number,
  prevIndex: number,
  nextIndex: number,
  isOpen: boolean,
  actions: {
    loadImages: (images: Array<string>) => mixed,
    hideLightbox: () => mixed,
    showLightbox: (index: number) => mixed,
    prevImage: () => mixed,
    nextImage: () => mixed
  }
}

class Templates extends Component<Props> {
  componentWillMount() {
    if (this.props.images.length === 0) {
      const ctx = require.context('./template-images', true)
      const images = ctx.keys().map(ctx)

      this.props.actions.loadImages(images)
    }
  }

  render() {
    const { images, isOpen, index, prevIndex, nextIndex, actions } = this.props
    return (
      <Section heading="Choose a Template">
        <Grid>
          {images.map((src, i) => (
            <Image key={i} src={src} onClick={() => actions.showLightbox(i)} />
          ))}
        </Grid>
        {isOpen && (
          <Lightbox
            mainSrc={images[index]}
            prevSrc={images[prevIndex]}
            nextSrc={images[nextIndex]}
            onCloseRequest={actions.hideLightbox}
            onMovePrevRequest={actions.prevImage}
            onMoveNextRequest={actions.nextImage}
          />
        )}
      </Section>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    images: state.templates.lightbox.images,
    index: state.templates.lightbox.index,
    prevIndex: state.templates.lightbox.prevIndex,
    nextIndex: state.templates.lightbox.nextIndex,
    isOpen: state.templates.lightbox.isOpen
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
