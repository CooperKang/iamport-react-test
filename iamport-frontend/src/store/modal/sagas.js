import * as actions from './actions'
import { call, fork, take, put } from 'redux-saga/effects'

export function* watchModalShow() {
  while (true) {
    const { payload } = yield take(actions.MODAL_SHOW)
    return payload.callback ? payload.callback(null, payload) : null
  }
}

export function* watchModalHide() {
  while (true) {
    const { payload } = yield take(actions.MODAL_HIDE)
    return payload.callback ? payload.callback(null, payload) : null
  }
}

export default function* () {
  yield fork(watchModalShow)
  yield fork(watchModalHide)
}
