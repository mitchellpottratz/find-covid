import { 
    LOGIN_USER,
    SET_USERS_CASE,
    DELETE_USERS_CASE,
    LOGOUT_USER,
    CONFIRM_PHONE_NUMBER,
} from '../constants/actionTypes.js';

import usersAPI from '../api/usersApi.js';


export const registerUser = (registrationInfo) => async (dispatch) => {
    const response = await usersAPI.registerUser(registrationInfo);

    // if the new user was registered then the user is logged in
    if (response.status.code === 201) {
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        });
    }

    return response;
}


export const loginUser = (loginInfo) => async (dispatch) => {
    const response = await usersAPI.loginUser(loginInfo);

    if (response.status.code === 200) {
        
        // if the user has created a case, it is set in the store 
        if (response.data.case) {
            dispatch({
                type: SET_USERS_CASE,
                payload: response.data.case
            });
        }
        
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        });
    }

    return response;
}


export const confirmPhoneNumber = (confirmationCode) => async (dispatch) => {
    const response = await usersAPI.confirmPhoneNumber(confirmationCode);

    if (response.status.code === 204) {
        dispatch({
            type: CONFIRM_PHONE_NUMBER,
            payload: {}
        });
    }

    return response;
}


export const logoutUser = () => async (dispatch) => {
    const response = await usersAPI.logoutUser();

    if (response.status.code === 200) {
        dispatch({
            type: LOGOUT_USER,
            payload: {}
        });

        // deletes the users case from the store
        dispatch({
            type: DELETE_USERS_CASE,
            payload: {} 
        });

    }
}


