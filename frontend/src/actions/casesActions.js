import {
    SET_USERS_CASE,
    DELETE_USERS_CASE,
    DELETE_ALL_USERS_PLACES_VISITED
} from '../constants/actionTypes.js';

import casesAPI from '../api/casesApi.js';
import { toast } from 'react-toastify';


export const createUsersCase = (caseInfo) => async (dispatch) => {
    const response = await casesAPI.createUsersCase(caseInfo);

    if (response.status.code === 201) {
        dispatch({
            type: SET_USERS_CASE,
            payload: response.data
        });
        toast('Your case has been reported');
    } else {
        toast.error('Something went wrong...');
    }
    
    return response;
}


export const deleteUsersCase = (userId) => async (dispatch) => {
    const response = await casesAPI.deleteUsersCase(userId);

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
        });

        toast('Deleted your case');
    } else {
        toast.error('Something went wrong...')
    }
    
    return response;
}
