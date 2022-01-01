import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
    user:{
        email:"",
        name:"",
        isAdmin:false
    }
}

const authReducer = (state=initialState,Action:Action)=>{
    switch (Action.type) {
        case ActionTypes.LOGGED_IN_USER:
            return state = {user:Action.payload}
        case ActionTypes.SIGN_IN_USER:
            return state
        default:
            return state;
    }
}

export default authReducer