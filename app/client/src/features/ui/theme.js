/**
 * @flow
 */

import { keyframes } from 'styled-components'

const colors = {
  background: '#000',
  primary: '#0fc',
  accent: '#111',
  borders: '#222'
}

const sizes = {
  header: '15vh',
  sideNav: '20vw',
  progress: '75px',
  preview: Math.min(800, (document.body: any).clientWidth - 52)
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
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  `
}

export { colors, sizes, margins, styles, animations }
