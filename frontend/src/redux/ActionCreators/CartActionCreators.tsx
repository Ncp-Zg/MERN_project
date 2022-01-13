import { Dispatch } from "redux";
import { Item } from "../../type";
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";



export const addToCart = (data:Item[])=>(dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.ADD_TO_CART,
            payload:data
        })
}

