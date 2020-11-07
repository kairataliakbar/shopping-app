import Product from "../../models/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => dispatch =>
  fetch("https://shopping-app-7e16f.firebaseio.com/products.json")
    .then((response) => response.json())
    .then((resData) => {
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ));
      }
      return dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    });

export const createProduct = (title, imageUrl, description, price) => dispatch =>
  fetch("https://shopping-app-7e16f.firebaseio.com/products.json", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ title, imageUrl, description, price })
    })
      .then((response) => response.json())
      .then((resData) => dispatch({
        type: CREATE_PRODUCT,
        product: { id: resData.id, title, imageUrl, description, price }
      }));

export const updateProduct = (id, title, imageUrl, description, price) => dispatch =>
  fetch(`https://shopping-app-7e16f.firebaseio.com/products/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ title, imageUrl, description, price })
  })
    .then(() => dispatch({
      type: UPDATE_PRODUCT,
      product: { id, title, imageUrl, description }
    }));

export const deleteProduct = (productId) => dispatch =>
  fetch(`https://shopping-app-7e16f.firebaseio.com/products/${productId}.json`, {
    method: "DELETE"
  })
    .then(() => dispatch({ type: DELETE_PRODUCT, productId }));
