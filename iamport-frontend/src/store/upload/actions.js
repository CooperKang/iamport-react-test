export const UPLOAD_READY = 'UPLOAD_READY'
export const UPLOAD_START = 'UPLOAD_START'
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS'
export const UPLOAD_END = 'UPLOAD_END'

export const readyUpload = (settings = {}) => ({
  type: UPLOAD_READY,
  payload: { settings },
})

export const startUpload = (callback = () => {}) => ({
  type: UPLOAD_START,
  payload: { callback },
})

export const progressUpload = (rate = 0) => ({
  type: UPLOAD_PROGRESS,
  payload: { rate },
})

export const endUpload = (callback = () => {}) => ({
  type: UPLOAD_END,
  payload: { callback },
})
