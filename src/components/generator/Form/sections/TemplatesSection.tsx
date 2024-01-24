import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'
import { FormSection } from './FormSection'
import { Button } from '../../../core/Button'
import { colors } from '../../../../theme'
import FsLightbox from 'fslightbox-react'
import { useState, useEffect } from 'react'

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

interface StyledImageProps {
  active: boolean
}

const StyledImage = styled.img<StyledImageProps>`
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

export function TemplatesSection() {
  const { watch, setValue } = useFormContext()
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Effect to toggle lightboxOpen whenever lightboxImageIndex changes
  useEffect(() => {
    setLightboxOpen((prev) => !prev)
  }, [lightboxImageIndex])

  const setIndex = (index: number) => {
    setLightboxImageIndex(index)
  }

  return (
    <FormSection title="Choose a template">
      <Grid>
        {images.map((src, i) => (
          <Div key={i}>
            <StyledImage
              active={i + 1 === watch('selectedTemplate')}
              src={src.src}
              onClick={() => setIndex(i)}
            />
            <Button
              type="button"
              onClick={() => setValue('selectedTemplate', i + 1)}
              color={
                i + 1 === watch('selectedTemplate')
                  ? colors.silver
                  : colors.white
              }
            >
              Template {i + 1}
            </Button>
          </Div>
        ))}
      </Grid>
      <FsLightbox
        toggler={lightboxOpen}
        sources={[images[lightboxImageIndex].src]}
        captions={[`Template ${lightboxImageIndex + 1}`]}
      />
    </FormSection>
  )
}
