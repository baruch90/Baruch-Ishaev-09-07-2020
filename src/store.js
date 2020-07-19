import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";

import locationKeyReducer from "./FilesReducers/locationKeyReducer";
import weatherReducer from "./FilesReducers/weatherReducer";

const store = createStore(
  combineReducers({
    locationKeyReducer,
    weatherReducer,
  }),
  {},
  applyMiddleware(Thunk)
);

export default store;
