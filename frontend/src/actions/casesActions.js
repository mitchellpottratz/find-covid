import {
    SET_USERS_CASE
} from '../constants/actionTypes.js';



export const setUsersCase = (caseInfo) => (dispatch) => {
    dispatch({
        type: SET_USERS_CASE,
        payload: caseInfo
    });
}