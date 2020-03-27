import { LOGIN_USER, LOGOUT_USER } from '../constants/actionTypes.js';
import usersAPI from '../api/usersApi.js';
import usersApi from '../api/usersApi.js';


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
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        });
    }

    return response;
}


export const logoutUser = () => async (dispatch) => {
    const response = await usersApi.logoutUser();

    if (response.status.code === 200) {
        console.log('user logged out');
        dispatch({
            type: LOGOUT_USER,
            payload: {}
        });
    }
}

