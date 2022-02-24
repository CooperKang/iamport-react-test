import { preparedState } from './selectors'

/*
  리듀서에서 스위칭 될 수 있는 스트링을 선언
  - 선언시 주의점은 액션이 구분될 수 있도록 최대한 리듀서명을 먼저 써주는 상수를 구성한다.
*/

// 유저 로그인을 체크하기 위한 액션들
export const USER_PREPARE_REQUEST = 'USER_PREPARE_REQUEST'
export const USER_PREPARE_FINISHED = 'USER_PREPARE_FINISHED'

// 잃어버린 유저를 찾기 위한 액션들
export const USER_FIND_REQUEST = 'USER_FIND_REQUEST'

// 유저 로그인을 시키기 위한 액션들
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

// 유저 SNS로그인을 시키기 위한 액션
export const USER_SNS_LOGIN_REQUEST = 'USER_SNS_LOGIN_REQUEST'

// 유저 로그아웃을 시키기 위한 액션들
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED'

/*
  리듀서를 CC컴포넌트에서 사용할 수 있는 액션 작동 함수들을 구성한다.
*/

// 최초 로그인이 되었는지 비로그인 상태인지를 구분하는 기능
export function prepareUser(token, safetyLogin, callback = () => {}) {
  const payload = {
    token, 
    safetyLogin,
    callback,
  }
  return { type: USER_PREPARE_REQUEST, payload }
}

// 로그인 시도를 진행하는 기능
export function loginSnsUser(data = {}, callback = () => {}) {
  const payload = {
    data,
    callback,
  }
  return { type: USER_SNS_LOGIN_REQUEST, payload }
}

// 로그인 시도를 진행하는 기능
export function loginUser(identifier = '', password = '', callback = () => {}) {
  const payload = {
    identifier,
    password,
    callback,
  }
  return { type: USER_LOGIN_REQUEST, payload }
}

// 회원 계정을 찾는 기능
export function findUser(what, method, identifier = '', callback = () => {}) {
  const payload = {
    what,
    method,
    identifier,
    callback,
  }
  return { type: USER_FIND_REQUEST, payload }
}

// 로그아웃을 진행하는 기능
export function logoutUser(callback = () => {}) {
  const payload = {
    callback,
  }
  return { type: USER_LOGOUT_REQUEST, payload }
}

/*
  리듀서에서 호출해서 쓸 결과값을 기준으로 또다시 리듀서를 재사용하여 처리하는 기능들이다.
*/

// 프레페어 작업을 마무리했을 때
export function prepareUserFinished(user = {}) {
  return { type: USER_PREPARE_FINISHED, payload: { user } }
}

// 로그인이 성공적으로 이루어졌을 때
export function loginUserSuccess(user = preparedState) {
  return { type: USER_LOGIN_SUCCESS, payload: { user } }
}

// 로그인이 실패했을 때
export function loginUserFailed(user = preparedState) {
  return { type: USER_LOGIN_FAILED, payload: { user } }
}

// 로그아웃이 성공적으로 이루어졌을 때
export function logoutUserSuccess(user = preparedState) {
  return { type: USER_LOGOUT_SUCCESS, payload: { user } }
}

// 로그아웃이 실패했을 때
export function logoutUserFailed(user = preparedState) {
  return { type: USER_LOGOUT_FAILED, payload: { user } }
}
