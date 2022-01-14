
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
    cart:[{
        _id: 0,
        title: "",
        img:[""],
        cost: "",
        stock: 0,
        category: "",
        desc:"",
        seller:"",
    }]
}

const cartReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.ADD_TO_CART:
            if(state.cart[0]._id === 0){
                state.cart.shift()
            }
            
            return state={cart:[...state.cart,...Action.payload]};
        default:
            return state;
    }
}

export default cartReducer