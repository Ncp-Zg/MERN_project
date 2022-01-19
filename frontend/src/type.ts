
    export interface Item {
        _id: number;
        title: string;
        img: Array<string>;
        cost: string;
        stock: number;
        category: string;
        desc:string;
        seller:string;
    }

    export interface Cart {
        _id: number;
        title: string;
        img: Array<string>;
        cost: string;
        stock: number;
        category: string;
        desc:string;
        seller:string;
        amount:number;
    }

    export interface Order {
        _id: string;
        user:string;
        order:Array<Item>;
        amount:Array<number>;
        createdAt:string;
        __v:number;
        delivered:false
        
    }
