export const initialState = {
  rate: 0, ready: false, progress: false, settings: {}
}

export const getState = (state = initialState) => {
  return state
}

export const isReady = (state = initialState) => {
  return state.ready
}

export const getSettings = (state = initialState) => {
  return state.settings
}

export const isProgress = (state = initialState) => {
  return state.progress
}

export const getRate = (state = initialState) => {
  return state.rate
}
