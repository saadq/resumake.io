/**
 * @flow
 */

import { keyframes } from 'styled-components'

const colors = {
  background: '#1a1d25',
  foreground: '#c0c5ce',
  primary: '#30be9d',
  accent: '#111',
  borders: '#262c39'
}

const sizes = {
  header: '10vh',
  sideNav: '15vw',
  footer: '50px'
}

const margins = {
  progress: '30px'
}

const styles = {
  gradient: `linear-gradient(to right, #050505, #080808, #050505)`
}

const animations = {
  indeterminate: keyframes`
    0% {
      left: -35%;
      right: 100%;
    }

    60% {
      left: 100%;
      right: -90%;
    }

    100% {
      left: 100%;
      right: -90%;
    }
  `,

  indeterminateShort: keyframes`
    0% {
      left: -200%;
      right: 100%;
    }

    60% {
      left: 107%;
      right: -8%;
    }

    100% {
      left: 107%;
      right: -8%;
    }
  `,

  pulse: keyframes`
    to {
      box-shadow: 0 0 0 15px rgba(0, 0, 0, 0);
    }
  `
}

export { colors, sizes, margins, styles, animations }
