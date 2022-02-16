
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
        amount:0
    }]
}

const cartReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.ADD_TO_CART:
            if(state.cart[0]?._id === 0){
                state.cart.shift()
            }
            let a = Action.payload

            if(state.cart.some(crt=>crt._id === a[0]._id)){
                state.cart.map((c,i)=>c._id === a[0]._id ? state.cart[i].amount=a[0].amount : null)
                state={cart:[...state.cart]}
            }else{
               state={cart:[...state.cart,...Action.payload]} 
            } 
            
            return state;
        case ActionTypes.DELETE_ITEM_FROM_CART:
            if(state.cart[Action.payload].amount === 1){
                state.cart.splice(Action.payload,1)
            }else if(state.cart[Action.payload].stock === 0){
                state.cart.splice(Action.payload,1)
            }
            else{
                state.cart[Action.payload].amount = state.cart[Action.payload].amount -1  
            }           
            return state;

        case ActionTypes.ADD_ITEM_TO_CART:
            state.cart[Action.payload].amount = state.cart[Action.payload].amount +1  
            return state;

        case ActionTypes.CHECK_STOCK:
             state.cart[Action.payload].amount = state.cart[Action.payload].stock  
            return state;

        case ActionTypes.EMPTY_BASKET:
            return state=initialState;
        default:
            return state;
    }
}

export default cartReducer