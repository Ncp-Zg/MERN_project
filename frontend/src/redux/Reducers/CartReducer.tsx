
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
    cart:[{
        
    }]
}

const cartReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.ADD_TO_CART:
            return state={cart:[...state.cart,...Action.payload]};
        default:
            return state;
    }
}

export default cartReducer