import { Order } from "../../type";
import { ActionTypes } from "../ActionTypes";


interface set_User {
    type: ActionTypes.LOGGED_IN_USER,
    payload:{
        email:string,
        name:string,
        isAdmin:boolean,
        id:string,
        fav:Array<string>
    }
}

interface set_like {
    type: ActionTypes.SET_LIKE,
    payload:Array<string>
    
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
        customer:Array<string>
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
        amount:number;
    }[]
}

interface delete_cart_item {
    type: ActionTypes.DELETE_ITEM_FROM_CART
    payload:number
}

interface add_cart_item {
    type: ActionTypes.ADD_ITEM_TO_CART
    payload:number
}

interface empty_basket {
    type: ActionTypes.EMPTY_BASKET
}

interface set_my_orders {
    type: ActionTypes.SET_MY_ORDERS
    payload:Order[]
}

interface check_stock {
    type: ActionTypes.CHECK_STOCK
    payload:number
}

export type Action = set_User | register_User | logout_user | set_all_products | add_to_cart | delete_cart_item | add_cart_item | empty_basket | set_my_orders | set_like | check_stock;