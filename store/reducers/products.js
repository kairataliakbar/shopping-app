import moment from "moment";

import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT } from "../actions/products";
import Product from "../../models/product";

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
    case CREATE_PRODUCT: {
      const newProduct = new Product(
        moment().format(),
        "u1",
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );
      return {
        availabelProducts: state.availabelProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    }
    case UPDATE_PRODUCT: {
      return {
        availabelProducts: state.availabelProducts.map((product) => {
          if (product.id === action.product.id) {
            return new Product(
              action.product.id,
              product.ownerId,
              action.product.title,
              action.product.imageUrl,
              action.product.description,
              product.price
            );
          }
          return product;
        }),
        userProducts: state.userProducts.map((product) => {
          if (product.id === action.product.id) {
            return new Product(
              action.product.id,
              product.ownerId,
              action.product.title,
              action.product.imageUrl,
              action.product.description,
              product.price
            );
          }
          return product;
        }),
      };
    }
    default:
      return state;
  }
}; 
