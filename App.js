import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/carts";
import ordersReducer from "./store/reducers/orders";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoading, setFontLoading] = useState(false);

  if (!fontLoading) return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoading(true)}
    />
  );

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
