import {
    SET_USERS_CASE,
    DELETE_USERS_CASE,
    DELETE_ALL_USERS_PLACES_VISITED
} from '../constants/actionTypes.js';

import casesAPI from '../api/casesApi.js';


export const createUsersCase = (caseInfo) => async (dispatch) => {
    const response = await casesAPI.createUsersCase(caseInfo);
    console.log(response);

    if (response.status.code === 201) {
        dispatch({
            type: SET_USERS_CASE,
            payload: response.data
        });
    }
    
    return response;
}


export const deleteUsersCase = (caseId) => async (dispatch) => {
    const response = await casesAPI.deleteUsersCase(caseId);

    if (response.status.code === 204) {
        dispatch({
            type: DELETE_USERS_CASE,
            payload: {}
        });

        // all places the user has visited also gets deleted from the store
        // because a user cannot visit places if they do not have a case
        dispatch({
            type: DELETE_ALL_USERS_PLACES_VISITED,
            payload: {}
        })

    }
    
    return response;
}
