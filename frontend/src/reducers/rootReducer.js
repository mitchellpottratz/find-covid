import { combineReducers } from 'redux';

import usersReducer from './usersReducer.js';
import casesReducer from './casesReducer.js';


const rootReducer = combineReducers({
    user: usersReducer,
    cases: casesReducer
});


export default rootReducer;


