import { types } from '../actions';

const initialState = {
  token: '',
  user: null,
  username: null,
  signedin: false,
  isAuth: false,
  isLoading: false,
  isSuccess: false,
  errors: null,
  photo: null,
  profile: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isSuccess: false,
        errors: null,
        username: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isSuccess: true,
        signedin: true,
        username: payload
      };
      case types.TOKEN_START:
        return {
          ...state,
          isLoading: true,
          isAuth: false,
          isSuccess: false,
          errors: null,
          token: null
        };
      case types.TOKEN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          isSuccess: true,
          signedin: true,
          token: payload
        };
    case types.LOGIN_FAIL:
      return {
        ...state,
        errors: payload,
        isLoading: false,
        token: ''
      };
    case types.CREATE_USER_START:
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isSuccess: false,
        errors: null,
        username: null
      };
    case types.CREATE_USER_SUCCESS:
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isSuccess: true,
        signedin: true,
        // username: payload
      };
    case types.CREATE_USER_FAIL:
      return {
        ...state,
        errors: payload,
        isLoading: false,
        token: ''
      };
    case types.GET_USER_START:
      return {
        ...state,
        isLoading: true,
        errors: null,
        isAuth: true,
        isSuccess: false
      };
    case types.GET_USER_SUCCESS:
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        user: payload,
        isSuccess: true
      };
    case types.GET_USER_FAIL:
      return {
        ...state,
        errors: payload,
        isLoading: false
      };
    default:
      return state;
  }
};
