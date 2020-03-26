import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import thunkMiddleWare from "redux-thunk";
import rootReducer from '../reducers/rootReducer.js';


// saves the cache if a user reloads the page
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        console.log("err from saveToLocalStorage:", err);
    }
}

// loads the cache if the user exits site and comes back
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log("err from loadFromLocalStorage:", err);
        return undefined;
    }
}

// this will be called when the site first loads
const persistedState = loadFromLocalStorage();

// creates the redux store
const store = createStore(
    rootReducer,
    persistedState,
    compose(
        applyMiddleware(thunkMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() :
        function (f) {
            return f;
        }
    )
)

// this saves the state after the redux store changes
store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });


export default store;