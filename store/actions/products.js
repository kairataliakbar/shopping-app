import Product from "../../models/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch("https://shopping-app-7e16f.firebaseio.com/products.json");
      
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ));
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`https://shopping-app-7e16f.firebaseio.com/products.json?auth=${token}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title, imageUrl, description, price, ownerId: userId })
      });

      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        product: { id: resData.id, title, imageUrl, description, price, ownerId: userId }
      });
  };
};

export const updateProduct = (id, title, imageUrl, description, price, ownerId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://shopping-app-7e16f.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ title, imageUrl, description, price, ownerId })
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      product: { id, title, imageUrl, description }
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://shopping-app-7e16f.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    } 

    dispatch({ type: DELETE_PRODUCT, productId });
  };
};
