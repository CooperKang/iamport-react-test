import {
  // 유저 로그인을 체크하기 위한 액션들
  USER_PREPARE_REQUEST,
  USER_PREPARE_FINISHED,
  
  // 유저 로그인을 시키기 위한 액션들
  USER_LOGIN_REQUEST,
  USER_SNS_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,

  // 유저 로그아웃을 시키기 위한 액션들
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,

} from './actions'
import { initialState, preparedState } from './selectors'

function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_PREPARE_REQUEST : // Saga에서 땡겨가는데 있어야하는지 파악해보기
      return {
        ...state,
        ...preparedState,
      }
    case USER_PREPARE_FINISHED :
      return {
        ...action.payload.user,
        ...preparedState,
      }
    case USER_LOGIN_REQUEST : // Saga에서 땡겨가는데 있어야하는지 파악해보기
      return {
        ...state,
        ...preparedState,
      }
    case USER_SNS_LOGIN_REQUEST : // Saga에서 땡겨가는데 있어야하는지 파악해보기
      return {
        ...state,
        ...preparedState,
      }
    case USER_LOGIN_SUCCESS :
      return {
        ...action.payload.user,
        ...preparedState,
      }
    case USER_LOGIN_FAILED :
      return {
        ...action.payload.user,
        ...preparedState,
      }
    case USER_LOGOUT_REQUEST : // saga에서 땡겨가는데 확인해보기
      return {
        ...preparedState,
      }
    case USER_LOGOUT_SUCCESS :
      return {
        ...preparedState,
      }
    case USER_LOGOUT_FAILED :
      return {
        ...state,
        ...preparedState,
      }
    default:
      return state
  }
}

export default reducer
