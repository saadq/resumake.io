/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import Section from './Section'
import { Button } from '../../../../common/components'
import { colors } from '../../../../common/theme'
import { selectTemplate } from '../../actions'
import type { State as ReduxState } from '../../../../app/types'
import { naturalCompare } from '../../../../common/utils'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin: 20px 0;

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  position: relative;
  border-radius: 3px;
  color: #fff;
  max-width: 100%;
  transform: translateY(0);
  transition: all 0.4s ease-out;
  opacity: ${props => (props.active ? '1' : '0.65')};
  ${props =>
    props.active
      ? 'box-shadow: 0 2px 20px #fff, 0 0 0 1px #fff;'
      : ''} &:hover {
    opacity: ${props => (props.active ? '1' : '0.9')};
    transform: translateY(-3px);
    cursor: zoom-in;
  }
`

const TemplateButton = Button.extend`
  border-color: ${colors.primary};
  color: ${props => (props.active ? 'white' : 'silver')};
  transition: all 0.4s ease;
  padding: 10px 20px;

  &:hover {
    background: ${colors.primary};
    color: ${colors.background};
  }
`

type Props = {
  selectedTemplate: number,
  selectTemplate: (templateId: number) => void
}

type State = {
  isLightboxOpen: boolean,
  lightboxImageIndex: number
}

const ctx = require.context('../../assets/img', true)
const images = ctx
  .keys()
  .sort(naturalCompare)
  .map(ctx)

class Templates extends Component<Props, State> {
  state = {
    isLightboxOpen: false,
    lightboxImageIndex: 0
  }

  showLightbox = (lightboxImageIndex: number) => {
    this.setState(prevState => ({
      isLightboxOpen: true,
      lightboxImageIndex
    }))
  }

  hideLightbox = () => {
    this.setState(prevState => ({
      isLightboxOpen: false
    }))
  }

  render() {
    const { selectedTemplate, selectTemplate } = this.props
    const { isLightboxOpen, lightboxImageIndex } = this.state
    return (
      <Section heading="Choose a Template">
        <Grid>
          {images.map((src, i) => (
            <Div key={i}>
              <Image
                active={i + 1 === selectedTemplate}
                src={src}
                onClick={() => this.showLightbox(i)}
              />
              <TemplateButton
                active={i + 1 === selectedTemplate}
                type="button"
                onClick={() => selectTemplate(i + 1)}
              >
                Template {i + 1}
              </TemplateButton>
            </Div>
          ))}
        </Grid>
        {isLightboxOpen && (
          <Lightbox
            imageCaption={`Template ${lightboxImageIndex + 1}`}
            mainSrc={images[lightboxImageIndex]}
            onCloseRequest={this.hideLightbox}
          />
        )}
      </Section>
    )
  }
}

function mapState(state: ReduxState) {
  return {
    selectedTemplate: state.form.resume.values.selectedTemplate
  }
}

const mapActions = {
  selectTemplate
}

export default connect(mapState, mapActions)(Templates)
