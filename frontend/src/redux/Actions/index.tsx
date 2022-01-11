import { ActionTypes } from "../ActionTypes";


interface set_User {
    type: ActionTypes.LOGGED_IN_USER,
    payload:{
        email:string,
        name:string,
        isAdmin:boolean,
        token:string
    }
}

interface register_User {
    type: ActionTypes.SIGN_UP_USER,
}

interface logout_user {
    type: ActionTypes.LOG_OUT_USER
}

export type Action = set_User | register_User | logout_user