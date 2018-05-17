import * as types from '../action-types'

const initialState = {
    user: null,
    status: null,
    error: null,
    loading: null
}

const userReducer = function(state = initialState, action) {
  let error
  switch(action.type) {
      case types.ME_FROM_TOKEN:
          return { ...state, user: null, status: 'storage', error: null, loading: true}
      case types.ME_FROM_TOKEN_SUCCESS:
          return { ...state, user: action.payload.data.user, status: 'authenticated', error: null, loading: false}
      case types.ME_FROM_TOKEN_FAILURE:
          error = action.payload.data || {message: action.payload.message}
          return { ...state, user: null, state: 'storage', error: error, loading: false}
      case types.RESET_TOKEN:
          return { ...state, user: null, status: 'storage',error: null, loading: false}

      case types.SIGNUP_USER:
          return { ...state, user: null, status: 'signup', error: null, loading: true}
      case types.SIGNUP_USER_SUCCESS:
          return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false}
      case types.SIGNUP_USER_FAILURE:
          error = action.payload.data || {message: action.payload.message}
          return { ...state, user: null, status: 'signup', error: error, loading: false}

      case types.SIGNIN_USER:
          return {...state, user: null, status: 'signin', error: null, loading: true}
      case types.SIGNIN_USER_SUCCESS:
          return {...state, user: action.payload.user, status: 'authenticated', error: null, loading: false}
      case types.SIGNIN_USER_FAILURE:
          error = action.payload.data || {message: action.payload.message}
          return {...state, user: null, status: 'signin', error: error, loading: false}

      case types.LOGOUT_USER:
          return { ...state, user: null, status: 'logout', error: null, loading: false}

      case types.RESET_USER:
          return { ...state, user: null, status: null, error: null, loading: false}

      default:
          return state
  }

  return state
}

export default userReducer