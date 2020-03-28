import {
    SET_USERS_CASE
} from '../constants/actionTypes.js';

import casesAPI from '../api/casesApi.js';



export const setUsersCase = (caseInfo) => async (dispatch) => {
    const response = await casesAPI.createUserCase(caseInfo);

    if (response.status.code === 201) {
        dispatch({
            type: SET_USERS_CASE,
            payload: response.data
        });
    }
    
    return response;
}

