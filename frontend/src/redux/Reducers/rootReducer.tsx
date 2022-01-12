import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers"
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    auth:AuthReducers,
    product:productReducer
});

export default rootReducer;
export type IRootState = ReturnType<typeof rootReducer>