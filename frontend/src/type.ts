export interface Item {
  _id: number;
  title: string;
  img: Array<string>;
  cost: string;
  stock: number;
  category: string;
  desc: string;
  seller: string;
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
  __v: number;
  delivered: false;
}
