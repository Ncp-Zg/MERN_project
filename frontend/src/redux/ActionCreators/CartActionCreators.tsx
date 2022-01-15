import { Dispatch } from "redux";
import { Cart, Item } from "../../type";
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";



export const addToCart = (data:Cart[])=>(dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.ADD_TO_CART,
            payload:data
        })
}

