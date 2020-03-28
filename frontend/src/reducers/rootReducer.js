import { combineReducers } from 'redux';

import usersReducer from './usersReducer.js';
import casesReducer from './casesReducer.js';
import placesVisitedReducer from './placesVisitedReducer.js';


const rootReducer = combineReducers({
    user: usersReducer,
    cases: casesReducer,
    placesVisited: placesVisitedReducer
});


export default rootReducer;


