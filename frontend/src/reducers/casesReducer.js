import {
    SET_USERS_CASE
} from '../constants/actionTypes.js';


const initialState = {
    usersCase: {}
}


const casesReducer = (state = initialState, action) => {

    switch(action.type) {
        
        case SET_USERS_CASE:
            return {
                ...state,
                usersCase: action.payload
            }

        default:
            return state;
    }
}


export default casesReducer;
