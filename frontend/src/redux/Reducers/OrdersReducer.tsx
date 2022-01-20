import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
    myorders:[{
        _id: "",
        user:"",
        order:[{}],
        amount:[{}],
        createdAt:"",
        __v:0,
        delivered:false
    }]
}

const ordersReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.SET_MY_ORDERS:
            return state = {myorders:Action.payload};
        default:
            return state;
    }
}

export default ordersReducer