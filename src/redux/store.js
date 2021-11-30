import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import data from "./reducers/data.reducer";

const initialState = {};

const rootReducer = combineReducers({ data });

const store =
	process.env.NODE_ENV === "production"
		? createStore(rootReducer, initialState, applyMiddleware(thunk))
		: createStore(
				rootReducer,
				initialState,
				composeWithDevTools(applyMiddleware(thunk))
		  );

export default store;
