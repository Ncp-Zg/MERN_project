import { Dispatch } from "redux";
import { Item } from "../../type";
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";





export const setProducts = (data:Item[])=>(dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.SET_ALL_PRODUCTS,
            payload:data
        })
}



