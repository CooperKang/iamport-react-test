// 최초 초기값을 의미하는데, _prepare 는 유저 데이터를 불러오는 시도를 했는지를 체크하는 기능을 담당한다.
export const initialState = {
  _prepare: false,
}

// 로그인 여부를 체크하고 나서 상태의 변화가 이루어지면 무조건 _prepare 변화를 준다.
export const preparedState = {
  _prepare: true,
}

export const getStorage = () => ((window && window.localStorage) || { setItem: () => {}, getItem: () => {}, removeItem: () => {} })

// 회원 정보를 가져오는 기능
export const getInfo = state => state

// 회원정보를 가져오는 프로세스가 진행되었는지 파악하는 기능
export const isPrepare = state => state._prepare
