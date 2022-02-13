import { Action } from "../Actions";
import { ActionTypes } from "../ActionTypes";

const initialState = {
  myorders: [
    {
      _id: "",
      user: "",
      order: [
        {
          category: "",
          cost: 0,
          createdAt: "",
          desc: "",
          img:[""],
          seller: "",
          stock: 0,
          title: "",
          updatedAt: "",
          __v: 0,
          _id: "",
        },
      ],
      amount:[0],
      createdAt: "",
      __v: 0,
      delivered: [false],
      preparing: [false],
      sentbycargo: [false],
    },
  ],
};

const ordersReducer = (state = initialState, Action: Action) => {
  switch (Action.type) {
    case ActionTypes.SET_MY_ORDERS:
      return (state = { myorders: Action.payload });
    default:
      return state;
  }
};

export default ordersReducer;
