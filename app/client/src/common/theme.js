/**
 * @flow
 */

import { keyframes } from 'styled-components'

const colors = {
  background: '#14171d',
  foreground: '#c0c5ce',
  primary: '#56c9aa',
  borders: '#202530',
  error: '#c95757'
}

const sizes = {
  header: '10vh',
  sideNav: '15vw',
  footer: '65px'
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
  `,

  load: keyframes`
    0%, 80%, 100% {
      box-shadow: 0 0;
    }

  40% {
      box-shadow: 0 -2em;
    }
  `,

  fadeIn: keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  `
}

export { colors, sizes, margins, styles, animations }
