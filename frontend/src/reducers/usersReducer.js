import { 
    LOGIN_USER, 
    LOGOUT_USER, 
    CHANGE_PHONE_NUMBER,
    CONFIRM_PHONE_NUMBER
} from '../constants/actionTypes.js';


const initialState = {
    isLoggedIn: false,
    userInfo: {},
}


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case LOGIN_USER: 
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload   
            }

        case CONFIRM_PHONE_NUMBER:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    phone_number_confirmed: true
                }
            }
    
        case CHANGE_PHONE_NUMBER:
           return {
               ...state,
               userInfo: {
                   ...state.userInfo,
                   phone_number: action.payload
               }
           }

        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: {}
            }

        default:
            return state;
    }
}


export default usersReducer;

