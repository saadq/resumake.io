/**
 * @flow
 */

import { darken } from 'polished'

/**
 * Colors
 */

const primary = '#2b303b'
const border = '#ddd'
const darkBorder = darken(0.20, border)

/**
 * Sizes
 */

const header = {
  height: '10vh'
}

const sideNav = {
  width: '20vw'
}

/**
 * Helpers
 */

const boxShadow =
  'box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'

const boxShadowHover =
  'box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 15px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2)'

export { primary, border, darkBorder, boxShadow, boxShadowHover, header, sideNav }
