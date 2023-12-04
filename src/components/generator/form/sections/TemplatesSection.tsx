import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import { FormSection } from './FormSection'
import { Button } from '../../../core/Button'
import { colors, sizes } from '../../../../theme'
import { useState } from 'react'

import image1 from '../img/1.png'
import image2 from '../img/2.png'
import image3 from '../img/3.png'
import image4 from '../img/4.png'
import image5 from '../img/5.png'
import image6 from '../img/6.png'
import image7 from '../img/7.png'
import image8 from '../img/8.png'
import image9 from '../img/9.png'
import image10 from '../img/10.png'
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10
]

const Section = styled.section`
  width: ${sizes.templatesSection.width};
  background: ${colors.background};
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`

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
  opacity: ${(props) => (props.active ? '1' : '0.65')};
  ${(props) =>
    props.active
      ? 'box-shadow: 0 2px 20px #fff, 0 0 0 1px #fff;'
      : ''} &:hover {
    opacity: ${(props) => (props.active ? '1' : '0.9')};
    transform: translateY(-3px);
    cursor: zoom-in;
  }
`

type Props = {
  selectedTemplate: number
  selectTemplate: (templateId: number) => void
}

type State = {
  isLightboxOpen: boolean
  lightboxImageIndex: number
}

export function TemplatesSection() {
  const [state, setState] = useState<State>({
    isLightboxOpen: false,
    lightboxImageIndex: 0
  })

  const showLightbox = (index: number) => {
    setState({ isLightboxOpen: true, lightboxImageIndex: index })
  }

  const hideLightbox = () => {
    setState({ isLightboxOpen: false })
  }

  return <FormSection title="Choose a template"></FormSection>
}
