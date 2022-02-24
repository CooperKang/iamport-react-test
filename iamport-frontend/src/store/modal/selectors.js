export const initialState = {}

export const isOpen = (state = initialState, name) => {
  return state[name] && !!state[name].is_opened
}

export const getArgs = (state = initialState, name) => {
  return state[name] && state[name].args ? state[name].args : {}
}
