import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_SIDE_NAV,
  HIDE_SIDE_NAV
} from '../constants'

const showModal = modalSrc => ({
  type: SHOW_MODAL,
  modalSrc
})

const hideModal = () => ({
  type: HIDE_MODAL
})

const showSideNav = () => ({
  type: SHOW_SIDE_NAV
})

const hideSideNav = () => ({
  type: HIDE_SIDE_NAV
})

export {
  showModal,
  hideModal,
  showSideNav,
  hideSideNav
}
