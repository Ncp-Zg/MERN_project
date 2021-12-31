import { Dispatch } from "react"
import { Action } from "../Actions"
import { auth } from "../../pages/Login"
import { ActionTypes } from "../ActionTypes"



export const loginUser = (data:auth) => (dispatch: Dispatch<Action>) =>{
    dispatch({
        type:ActionTypes.LOGGED_IN_USER,
        payload:{
            email:data.email,
            name:data.name,
            isAdmin:data.isAdmin
        }
    })

    console.log(data)
}

export const registerUser = (data:auth) => (dispatch: Dispatch<Action>) =>{
    dispatch({
        type:ActionTypes.SIGN_IN_USER,
        payload:{
            email:data.email,
            name:data.name,
            isAdmin:data.isAdmin
        }
    })

    console.log(data)
}