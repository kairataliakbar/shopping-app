import moment from "moment";

import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(`https://shopping-app-7e16f.firebaseio.com/orders/${userId}.json`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(new Order(
          key,
          resData[key].items,
          resData[key].totalPrice,
          resData[key].date
        ));
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const addOrder = (items, totalPrice) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = moment().format();

    const response = await fetch(`https://shopping-app-7e16f.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ items, totalPrice, date })
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items,
        totalPrice,
        date
      }
    });
  };
};
