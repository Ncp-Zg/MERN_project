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
            isAdmin:data.isAdmin,
            token:data.token,
            id:data.id
        }
    })
    localStorage.setItem("user",JSON.stringify(data))

    console.log(data)
}

export const registerUser = (data:auth) => (dispatch: Dispatch<Action>) =>{
    dispatch({
        type:ActionTypes.SIGN_UP_USER,
    })
    dispatch({
        type:ActionTypes.LOGGED_IN_USER,
        payload:{
            email:data.email,
            name:data.name,
            isAdmin:data.isAdmin,
            token:data.token,
            id:data.id
        }
    })
    localStorage.setItem("user",JSON.stringify(data))

    console.log(data)
}

export const logoutUser = () => (dispatch: Dispatch<Action>) =>{
    dispatch({
        type:ActionTypes.LOG_OUT_USER,
    })

    localStorage.removeItem("user");
}