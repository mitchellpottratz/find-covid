import { LOGIN_USER } from '../constants/actionTypes.js';
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