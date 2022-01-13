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

interface set_all_products {
    type: ActionTypes.SET_ALL_PRODUCTS,
    payload:{
        _id: number;
        title: string;
        img: Array<string>;
        cost: string;
        stock: number;
        category: string;
        desc:string;
        seller:string;
    }[]
}

interface add_to_cart {
    type: ActionTypes.ADD_TO_CART,
    payload:{
        _id: number;
        title: string;
        img: Array<string>;
        cost: string;
        stock: number;
        category: string;
        desc:string;
        seller:string;
    }[]
}

export type Action = set_User | register_User | logout_user | set_all_products | add_to_cart;