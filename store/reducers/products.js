import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availabelProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return {
        userProducts: state.userProducts.filter((product) => product.id !== action.productId),
        availabelProducts: state.availabelProducts.filter((product) => product.id !== action.productId)
      };
    }
    default:
      return state;
  }
}; 
