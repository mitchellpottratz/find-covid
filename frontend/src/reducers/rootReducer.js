import { combineReducers } from 'redux';

import usersReducer from './usersReducer.js';


const rootReducer = combineReducers({
    user: usersReducer
});


export default rootReducer;


