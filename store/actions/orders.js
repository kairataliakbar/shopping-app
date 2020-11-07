import moment from "moment";

import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => dispatch =>
  fetch("https://shopping-app-7e16f.firebaseio.com/orders/u1.json")
    .then((response) => response.json())
    .then((resData) => {
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(new Order(
          key,
          resData[key].items,
          resData[key].totalPrice,
          resData[key].date
        ));
      }
      return dispatch({ type: SET_ORDERS, orders: loadedOrders });
    });

export const addOrder = (items, totalPrice) => dispatch => {
  const date = moment().format();
  return fetch("https://shopping-app-7e16f.firebaseio.com/orders/u1.json", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ items, totalPrice, date })
  })
    .then((response) => response.json())
    .then((resData) => dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items,
        totalPrice,
        date
      }
    }));
  };
