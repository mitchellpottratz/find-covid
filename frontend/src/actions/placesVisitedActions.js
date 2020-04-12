import {
    SET_PLACES_ON_MAP,
    SET_USERS_PLACES_VISITED,
    ADD_USERS_PLACE_VISITED,
    DELETE_USERS_PLACE_VISITED
} from '../constants/actionTypes.js';

import placesVisitedAPI from '../api/placesVisitedApi.js';
import { toast } from 'react-toastify';


export const getPlacesOnMap = () => async (dispatch) => {
    const response = await placesVisitedAPI.getPlacesOnMap();
    
    if (response.status.code === 200) {
        dispatch({
            type: SET_PLACES_ON_MAP,
            payload: response.data
        });
    }
}


export const createUsersPlaceVisited = (placeVisitedInfo) => async (dispatch) => {
    const response = await placesVisitedAPI.createUsersPlaceVisited(placeVisitedInfo);

    // if the place visited was create successfully
    if (response.status.code === 201) {
        dispatch({
            type: ADD_USERS_PLACE_VISITED,
            payload: response.data
        });
        toast('Reported your place visited');

    } else {
        toast.error('Something went wrong...');
    }

    return response;
}


export const deleteUsersPlaceVisited = (placeVisitedId) => async (dispatch) => {
    const response = await placesVisitedAPI.deleteUsersPlaceVisited(placeVisitedId);

    // if the place visited was deleted successfully
    if (response.status.code === 204) {
        dispatch({
            type: DELETE_USERS_PLACE_VISITED,
            payload: placeVisitedId
        });
        toast('Deleted your place visited');

    } else {
        toast.error('Something went wrong...');
    }

    return response;
}