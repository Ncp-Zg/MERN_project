import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
    user:{
        email:"",
        name:"",
        isAdmin:false,
        token:"",
        id:""
    }
}

const authReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.LOGGED_IN_USER:
            return state = {user:Action.payload}
        case ActionTypes.SIGN_UP_USER:
            return state
        case ActionTypes.LOG_OUT_USER:
            return state=initialState;
        default:
            return state;
    }
}

export default authReducer