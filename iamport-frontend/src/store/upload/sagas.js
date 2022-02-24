import * as actions from './actions'
import { call, fork, take, put } from 'redux-saga/effects'


export function* watchUploadStart() {
  while (true) {
    const { payload } = yield take(actions.UPLOAD_START)
    yield payload.callback ? payload.callback(null, payload) : null
  }
}

export function* watchUploadProgress() {
  while (true) {
    yield take(actions.UPLOAD_PROGRESS)
  }
}

export function* watchUploadEnd() {
  while (true) {
    const { payload } = yield take(actions.UPLOAD_END)
    yield payload.callback ? payload.callback(null, payload) : null
  }
}

export default function* () {
  yield fork(watchUploadStart)
  yield fork(watchUploadProgress)
  yield fork(watchUploadEnd)
}
