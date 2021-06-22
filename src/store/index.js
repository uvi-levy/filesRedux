import { createStore, combineReducers } from "redux";

import data from "../reducers/data";

const reducer = combineReducers({ data });

const store = createStore(reducer);
window.store = store;
export default store;
