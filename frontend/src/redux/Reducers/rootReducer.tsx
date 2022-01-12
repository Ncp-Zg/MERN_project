import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers"
import postReducer from "./ProductReducer";

const rootReducer = combineReducers({
    auth:AuthReducers,
    post:postReducer
});

export default rootReducer;
export type IRootState = ReturnType<typeof rootReducer>