import { ADD_TO_CART } from "../actions/carts";
import CartItem from "../../data/cart-item";

const initialState = {
  items: [],
  totalPrice: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      if (state.items.some((item) => item.id === addedProduct.id)) {
        return {
          items: state.items.map((item) => {
            if (item.id === addedProduct.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
          totalPrice: state.totalPrice + addedProduct.price
        };
      } else {
        const newItem = new CartItem(addedProduct.id, 1, addedProduct.price, addedProduct.title, addedProduct.price);
        return {
          items: state.items.concat(newItem),
          totalPrice: state.totalPrice + addedProduct.price
        };
      }
    }
    default:
      return state;
  }
};
