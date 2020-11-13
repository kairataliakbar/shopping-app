import React, { useState, useEffect, useRef } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import ReduxThunk from "redux-thunk";
import { NavigationActions } from "react-navigation";

import AppNavigator from "./navigation/AppNavigator";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/carts";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <AppNavigator ref={navRef} />;
};

export default function App() {
  const [fontLoading, setFontLoading] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });
  };

  if (!fontLoading) return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoading(true)}
    />
  );

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
