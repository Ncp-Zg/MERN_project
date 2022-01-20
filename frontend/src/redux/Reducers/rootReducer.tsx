import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers"
import cartReducer from "./CartReducer";
import ordersReducer from "./OrdersReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    auth:AuthReducers,
    product:productReducer,
    cart:cartReducer,
    orders:ordersReducer
});

export default rootReducer;
export type IRootState = ReturnType<typeof rootReducer>