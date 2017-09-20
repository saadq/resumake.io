import { lighten, darken } from 'polished'

/**
 * Colors
 */

const primary = '#ff679c'
const light = lighten(0.21, primary)
const dark = darken(0.21, primary)

/**
 * Sizes
 */

const header = {
  height: '125px'
}

const sideNav = {
  width: '20%'
}

/**
 * Helpers
 */

const boxShadow =
  'box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'

const boxShadowHover =
  'box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 15px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2)'

export { primary, light, dark, boxShadow, boxShadowHover, header, sideNav }
