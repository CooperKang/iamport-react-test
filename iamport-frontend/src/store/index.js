import configureStore from './configure'
import api from 'services/api'

const store = configureStore({}, { api })
// store.subscribe(() => console.log(store.getState()))

export default store
