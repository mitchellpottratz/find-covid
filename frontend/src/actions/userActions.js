import { LOGIN_USER } from '../constants/actionTypes.js';
import usersAPI from '../api/usersApi.js';


export const registerUser = (registrationInfo) => async (dispatch) => {
    console.log('register user action called');
    console.log('registration info:', registrationInfo);

    const response = await usersAPI.registerUser(registrationInfo);

    // if the new user was registered
    if (response.status.code === 201) {
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        });
    }

    return response;
}