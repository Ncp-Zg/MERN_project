import { ActionTypes } from "../ActionTypes";


interface set_User {
    type: ActionTypes.LOGGED_IN_USER,
    payload:{
        email:string,
        name:string,
        isAdmin:boolean
    }
}

interface register_User {
    type: ActionTypes.SIGN_IN_USER,
}

export type Action = set_User | register_User