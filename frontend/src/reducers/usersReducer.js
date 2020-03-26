import { LOGIN_USER } from '../constants/actionTypes.js';


const initialState = {
    isLoggedIn: false,
    userInfo: {}
}


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case LOGIN_USER: 
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload   
            }

        default:
            return state;
    }
}


export default usersReducer;

