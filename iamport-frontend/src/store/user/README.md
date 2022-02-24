예시) 회원 로그인 시도를 체크해야하는 경우와 회원 정보를 가져와야 하는 경우

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { prepareUser, loginUser, logoutUser } from 'store/actions'
import { fromUser } from 'store/selectors'

class SampleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const { prepareUser } = props
    prepareUser(() => this.setState({ loading: false }))
  }

  componentDidUpdate() {

  }

  render() {
    const { loginUser, logoutUser } = this.props
    const { loading, user } = this.state
    if (loading) { return null }

    if (!user.userId) {
      return (
        <div>
          로그인 페이지<br />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              return loginUser('wesias7', '123456789', () => {
                alert('로그인이 완료되었습니다.')
              })
            }}
          >
        </div>
      )
    }

    return (
        <div>
          로그아웃 페이지<br />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              return logoutUser(() => {
                alert('로그아웃이 진행되었습니다.')
              })
            }}
          >
        </div>
    )
  }
}

SampleContainer.propTypes = {
  user: PropTypes.object,
}

SampleContainer.defaultProps = {
  user: fromUser.initialState,
}

// 회원정보를 컴포넌트로 가져다 쓰는 경우
const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
})

// 회원정보를 직접 체크하는 경우와 회원 로그인 및 로그아웃 정보를 처리하는 경우를 의미 한다.
const mapDispatchToProps = (dispatch) => ({
  prepareUser: (cb = () => {}) => dispatch(prepareUser(cb)),
  loginUser: (name, password, cb = () => {}) => dispatch(loginUser(name, password, cb)),
  logoutUser: (cb = () => {}) => dispatch(logoutUser(cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer)

로그인 관련된 컴포넌트 한가지를 구성하는 과정을 갖았다.