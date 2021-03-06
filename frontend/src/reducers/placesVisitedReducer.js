import {
    SET_PLACES_ON_MAP,
    SET_CURRENT_PLACE,
    DELETE_CURRENT_PLACE,
    SET_USERS_PLACES_VISITED,
    ADD_USERS_PLACE_VISITED,
    DELETE_USERS_PLACE_VISITED,
    DELETE_ALL_USERS_PLACES_VISITED
} from '../constants/actionTypes.js';


const initialState = {
    placesOnMap: [], 
    usersPlacesVisited: [],
    currentPlace: {}
}


const placesVisitedReducer = (state = initialState, action) => {

    switch(action.type) {

        // sets all of the places that should be shown on the map
        case SET_PLACES_ON_MAP:
            return {
                ...state,
                placesOnMap: action.payload
            }

        // sets the current place being visited by the user
        case SET_CURRENT_PLACE:
            return {
                ...state,
                currentPlace: action.payload
            }

        // removes the current place being view by the user
        case DELETE_CURRENT_PLACE:
            return {
                ...state, 
                currentPlace: {}
            }    

        // sets all to places the user has visited since testing positive or 
        // showing symptoms of covid-19
        case SET_USERS_PLACES_VISITED:
            return {
                ...state,
                usersPlacesVisited: action.payload
            }

        // adds a new place visited to the places the user has visited
        case ADD_USERS_PLACE_VISITED:
            return {
                ...state,
                usersPlacesVisited: [...state.usersPlacesVisited, action.payload]
            }

        // deletes a place the user visited
        case DELETE_USERS_PLACE_VISITED:
            
            // creates a new array with the place visited that was deleted removed
            const newUsersPlacesVisited = state.usersPlacesVisited.filter((place) => {
                return place.id !== action.payload;
            });

            return {
                ...state,
                usersPlacesVisited: newUsersPlacesVisited
            }

        // deletes all of the places the user has visited 
        // this case is performed when the user deletes their case
        case DELETE_ALL_USERS_PLACES_VISITED:
            return {
                ...state, 
                usersPlacesVisited: []
            }
            

        default: 
            return state
    }
}


export default placesVisitedReducer;


