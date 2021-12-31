import {applyMiddleware, createStore} from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import rootReducer from "./Reducers/rootReducer";


const middlewares= [thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store