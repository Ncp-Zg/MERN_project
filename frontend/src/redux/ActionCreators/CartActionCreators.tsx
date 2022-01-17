import { Dispatch } from "redux";
import { Cart} from "../../type";
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";



export const addToCart = (data:Cart[])=>(dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.ADD_TO_CART,
            payload:data
        })
}
export const deleteItemFromCart = (data:number)=>(dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.DELETE_ITEM_FROM_CART,
            payload:data
        })
}

export const addItemToCart = (data:number)=>(dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.ADD_ITEM_TO_CART,
            payload:data
        })
}

