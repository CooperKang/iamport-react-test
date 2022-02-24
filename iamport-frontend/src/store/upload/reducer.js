import { initialState } from './selectors'
import { UPLOAD_READY, UPLOAD_START, UPLOAD_PROGRESS, UPLOAD_END } from './actions'

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case UPLOAD_READY:
      return {
        ...initialState,
        ready: true,
        settings: payload.settings || {}
      }
    case UPLOAD_START:
      return {
        ...state,
        rate: 0,
        ready: false,
        progress: true,
      }
    case UPLOAD_PROGRESS:
      return {
        ...state,
        rate: payload.rate,
      }
    case UPLOAD_END:
      return initialState
    default:
      return state
  }
}
