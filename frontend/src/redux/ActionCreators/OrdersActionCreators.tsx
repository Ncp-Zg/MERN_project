import { Dispatch } from "redux";
import { Order } from "../../type";
import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";





export const setOrders = (data:Order[])=>(dispatch: Dispatch<Action>) => {
        console.log(data);
        
        dispatch({
            type:ActionTypes.SET_MY_ORDERS,
            payload:data
        })
}


