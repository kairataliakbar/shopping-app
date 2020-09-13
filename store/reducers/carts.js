import { ADD_TO_CART } from "../actions/carts";
import CartItem from "../../data/cart-item";

const initialState = {
  items: {},
  totalPrice: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      const prodPrice = addedProduct.prodPrice;
      const prodTitle = addedProduct.prodTitle;
      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          prodPrice + state.items[addedProduct.id].sum
        );
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalPrice: state.totalPrice + addedProduct.prodPrice
      };
    }
  }
  return state;
};
