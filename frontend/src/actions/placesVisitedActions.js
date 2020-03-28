import {
    SET_USERS_PLACES_VISITED,
    ADD_USERS_PLACE_VISITED,
    DELETE_USERS_PLACE_VISITED
} from '../constants/actionTypes.js';

import placesVisitedAPI from '../api/placesVisitedApi.js';


export const createUsersPlaceVisited = (placeVisitedInfo) => async (dispatch) => {
    const response = await placesVisitedAPI.createUsersPlaceVisited(placeVisitedInfo);

    // if the place visited was create successfully
    if (response.status.code === 201) {
        dispatch({
            type: ADD_USERS_PLACE_VISITED,
            payload: response.data
        });
    } 

    return response;
}


export const deleteUsersPlaceVisited = (placeVisitedId) => async (dispatch) => {

    
}