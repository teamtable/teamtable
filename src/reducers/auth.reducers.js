import { Constants } from "../_constants";

const initialState = {
  userId: 1000,
  isAuthenticated: false,
  isAuthenticating: false,
  isRegistering: false,
};

export function auth(state = initialState, action) {
  switch (action.type) {
  case Constants.USERS_LOGIN_REQUEST:
    return {
      ...state,
      isAuthenticating: true,
    };

  case Constants.USERS_LOGIN_SUCCESS:
    return {
      ...state,
      // userId: action.userId,
      isAuthenticated: true,
      isAuthenticating: false,
    };

  case Constants.USERS_LOGIN_FAILURE:
    return {
      isAuthenticated: false,
      isAuthenticating: false,
    };

  case Constants.USERS_REGISTER_REQUEST:
    return {
      isRegistering: true,
    };

  case Constants.USERS_REGISTER_SUCCESS:
    return {
      isRegistering: false,
    };

  case Constants.USERS_REGISTER_FAILURE:
    return {
      isRegistering: false,
    };


  default:
    return state;
  }
}
