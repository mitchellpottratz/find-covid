import {
    SET_USERS_PLACES_VISITED
} from '../constants/actionTypes.js';


const initialState = {
    usersPlacesVisited: []
}


const placesVisitedReducer = (state = initialState, action) => {

    switch(action.type) {

        // sets all to places the user has visited since testing positive or 
        // showing symptoms of covid-19
        case SET_USERS_PLACES_VISITED:
            return {
                ...state,
                usersPlacesVisited: action.payload
            }

        default: 
            return state
    }
}


export default placesVisitedReducer;


