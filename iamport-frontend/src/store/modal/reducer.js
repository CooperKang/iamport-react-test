import { initialState } from './selectors'
import { MODAL_SHOW, MODAL_HIDE } from './actions'

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case MODAL_SHOW:
      return {
        ...state,
        [payload.name]: {
          is_opened: true,
          args: payload.args ? payload.args : {},
        },
      }
    case MODAL_HIDE:
      if (payload.name) {
        return {
          ...state,
          [payload.name]: {
            is_opened: false,
            args: payload.args ? payload.args : {},
          },
        }
      }
      return initialState
    default:
      return state
  }
}
