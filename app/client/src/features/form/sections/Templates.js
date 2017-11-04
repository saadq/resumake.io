/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import { Section, Button } from '../../../shared/components'
import { selectTemplate } from '../actions'
import { hideLightbox, showLightbox } from '../../ui/actions'
import type { State } from '../../../shared/types'

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
  index: number,
  isOpen: boolean,
  setImageCount: (count: number) => void,
  selectTemplate: (templateId: number) => void,
  hideLightbox: () => void,
  showLightbox: (index: number) => void
}

const ctx = require.context('./img', true)
const images = ctx.keys().map(ctx)

function Templates({
  selectedTemplate,
  isOpen,
  index,
  selectTemplate,
  hideLightbox,
  showLightbox
}: Props) {
  return (
    <Section heading="Choose a Template">
      <Grid>
        {images.map((src, i) => (
          <Div key={i}>
            <Image
              active={i + 1 === selectedTemplate}
              src={src}
              onClick={() => showLightbox(i)}
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
      {isOpen && (
        <Lightbox
          imageCaption={`Template ${index + 1}`}
          mainSrc={images[index]}
          onCloseRequest={hideLightbox}
        />
      )}
    </Section>
  )
}

function mapStateToProps(state: State) {
  return {
    selectedTemplate: state.form.resume.values.selectedTemplate,
    index: state.ui.lightbox.index,
    isOpen: state.ui.lightbox.isOpen
  }
}

const mapDispatchToProps = {
  selectTemplate,
  hideLightbox,
  showLightbox
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates)
