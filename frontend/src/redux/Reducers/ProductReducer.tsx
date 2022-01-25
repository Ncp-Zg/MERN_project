import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
    product:[{
        _id: 0,
        title: "",
        img:[""],
        cost: "",
        stock: 0,
        category: "",
        desc:"",
        seller:"",
        customer:[""],
    }]
}

const productReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.SET_ALL_PRODUCTS:
            return state={product:Action.payload};
        default:
            return state;
    }
}

export default productReducer