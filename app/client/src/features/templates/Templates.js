/**
 * @flow
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import { Section, Button } from '../../shared/components'
import * as actions from './actions'
import type { State } from '../../shared/types'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-gap: 20px;
  margin: 20px 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 1px;
  color: #fff;
  max-width: 100%;
  transform: translateY(0);
  transition: all 0.4s ease-out;
  opacity: ${props => (props.active ? '1' : '0.65')};

  &:hover {
    opacity: ${props => (props.active ? '1' : '0.9')};
    transform: translateY(-3px);
    cursor: zoom-in;
  }
`

const TemplateButton = Button.extend`
  border-color: ${props => (props.active ? 'white' : 'silver')};
  color: ${props => (props.active ? 'white' : 'silver')};
  transition: all 0.4s ease;
  padding: 10px 20px;

  &:hover {
    background: white;
    color: black;
  }
`

type Props = {
  selectedTemplate: number,
  images: Array<string>,
  index: number,
  prevIndex: number,
  nextIndex: number,
  isOpen: boolean,
  actions: {
    loadImages: (images: Array<string>) => mixed,
    selectTemplate: (templateId: number) => mixed,
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
    const {
      selectedTemplate,
      images,
      isOpen,
      index,
      prevIndex,
      nextIndex,
      actions
    } = this.props

    return (
      <Section heading="Choose a Template">
        <Grid>
          {images.map((src, i) => (
            <Div key={i}>
              <Image
                active={i + 1 === selectedTemplate}
                src={src}
                onClick={() => actions.showLightbox(i)}
              />
              <TemplateButton
                active={i + 1 === selectedTemplate}
                type="button"
                onClick={() => actions.selectTemplate(i + 1)}
              >
                Template {i + 1}
              </TemplateButton>
            </Div>
          ))}
        </Grid>
        {isOpen && (
          <Lightbox
            imageCaption={`Template ${index + 1}`}
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
    selectedTemplate: state.templates.selectedTemplate,
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
