import { createStore, combineReducers } from "redux";

const reducer = combineReducers({  });

const store = createStore(reducer);
window.store = store;
export default store;