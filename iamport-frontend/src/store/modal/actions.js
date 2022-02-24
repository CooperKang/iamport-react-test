export const MODAL_SHOW = 'MODAL_SHOW'
export const MODAL_HIDE = 'MODAL_HIDE'

export const modalShow = (name, args = {}, callback) => ({
  type: MODAL_SHOW,
  payload: { name, args, callback },
  meta: { gtm: name },
})

export const modalHide = (name, args = {}, callback) => ({
  type: MODAL_HIDE,
  payload: { name, args, callback },
})
