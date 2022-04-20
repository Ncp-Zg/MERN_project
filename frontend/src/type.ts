export interface Item {
  _id: number;
  title: string;
  img: Array<string>;
  cost: string;
  stock: number;
  category: string;
  desc: string;
  seller: string;
  customer: Array<string>;
}

export interface Cart {
  _id: number;
  title: string;
  img: Array<string>;
  cost: string;
  stock: number;
  category: string;
  desc: string;
  seller: string;
  amount: number;
}

export interface OrderItem {
  category: string;
  cost: number;
  createdAt: string;
  desc: string;
  img: Array<string>;
  seller: string;
  stock: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface Order {
  _id: string;
  user: string;
  order: OrderItem[];
  amount: Array<number>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  delivered: Array<boolean>;
  preparing: Array<boolean>;
  sentbycargo: Array<boolean>;
  deliveredAt: Array<string>;
  preparedAt: Array<string>;
  sentAt: Array<string>;
  cargoTrackNumber: Array<string>;
}

export interface Comments {
  rating: number;
  comment: string;
  createdAt: string;
  product: string;
  updatedAt: string;
  user: {
    createdAt: string;
    email: string;
    name: string;
  };
  __v: number;
  _id: string;
}

export interface formdata {
  category: string;
  description: string;
  stock: number;
  cost: string;
  title: string;
}

export interface incomingOrders {
  _id:string;
  product : Item;
  amount: number;
  orderedAt : string;
  toWho: {
    _id:string;
    name:string;
    email:string;
  } 
  orderId:string;
  prepared:boolean;
  cargotracknumber:string;
}
