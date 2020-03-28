import {
    SET_USERS_CASE,
    DELETE_USERS_CASE
} from '../constants/actionTypes.js';

import casesAPI from '../api/casesApi.js';


export const createUsersCase = (caseInfo) => async (dispatch) => {
    const response = await casesAPI.createUsersCase(caseInfo);

    if (response.status.code === 201) {
        dispatch({
            type: SET_USERS_CASE,
            payload: response.data
        });
    }
    
    return response;
}

