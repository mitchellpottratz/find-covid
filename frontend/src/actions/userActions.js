import {
  LOGIN_USER,
  SET_USERS_CASE,
  SET_USERS_PLACES_VISITED,
  DELETE_USERS_CASE,
  DELETE_ALL_USERS_PLACES_VISITED,
  LOGOUT_USER,
  CONFIRM_PHONE_NUMBER,
  RESET_PASSWORD,
} from "../constants/actionTypes.js";

import usersAPI from "../api/usersApi.js";

export const registerUser = (registrationInfo) => async (dispatch) => {
  const response = await usersAPI.registerUser(registrationInfo);

  // if the new user was registered then the user is logged in
  if (response.status.code === 201) {
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
  }

  return response;
};

export const loginUser = (loginInfo) => async (dispatch) => {
  const response = await usersAPI.loginUser(loginInfo);

  if (response.status.code === 200) {
    // if the user has created a case, it is set in the store
    if (response.data.case) {
      dispatch({
        type: SET_USERS_CASE,
        payload: response.data.case,
      });

      // if the user has created places they have visited it is set in the store
      if (response.data.case.places_visited.length > 0) {
        dispatch({
          type: SET_USERS_PLACES_VISITED,
          payload: response.data.case.places_visited,
        });
      }
    }

    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
  }

  return response;
};

export const confirmPhoneNumber = (confirmationCode) => async (dispatch) => {
  const response = await usersAPI.confirmPhoneNumber(confirmationCode);

  if (response.status.code === 204) {
    dispatch({
      type: CONFIRM_PHONE_NUMBER,
      payload: {},
    });
  }

  return response;
};

export const resetPassword = (phoneNumber) => async (dispatch) => {
  const response = await usersAPI.resetPassword(phoneNumber);

  if (response.status.code === 204) {
    dispatch({
      type: RESET_PASSWORD,
      payload: response.data,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  const response = await usersAPI.logoutUser();

  if (response.status.code === 200) {
    dispatch({
      type: LOGOUT_USER,
      payload: {},
    });

    // deletes the users case from the store
    dispatch({
      type: DELETE_USERS_CASE,
      payload: {},
    });

    // removes the user places visited from the store
    dispatch({
      type: DELETE_ALL_USERS_PLACES_VISITED,
      payload: {},
    });
  }
};
