import {
  LOGIN_USER,
  LOGOUT_USER,
  CONFIRM_PHONE_NUMBER,
  RESET_PASSWORD,
} from "../constants/actionTypes.js";

const initialState = {
  isLoggedIn: false,
  userInfo: {},
  isVerifiedToResetPassword: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
      };

    case CONFIRM_PHONE_NUMBER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          phone_number_confirmed: true,
        },
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
      };

    case RESET_PASSWORD:
      return {
        ...state,
        isVerifiedToResetPassword: true,
      };

    default:
      return state;
  }
};

export default usersReducer;
