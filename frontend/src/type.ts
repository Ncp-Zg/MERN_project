
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
