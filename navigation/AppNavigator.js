/* eslint-disable react/display-name */
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import ShopScreen from "../screens/app/ShopScreen";
import ProductDetailScreen from "../screens/app/ProductDetailScreen";
import CartScreen from "../screens/app/CartScreen";
import OrdersScreen from "../screens/app/OrdersScreen";
import ManageProductsScreen from "../screens/app/ManageProductsScreen";
import EditProductScreen from "../screens/app/EditProductScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";

const navigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: "white",
  headerTitleStyle: GlobalStyles.textBold,
  headerBackTitleStyle: GlobalStyles.text
};

const ShopNavigator = createStackNavigator(
  {
    Shop: ShopScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerInfo) => (
        <Ionicons name="ios-cart" size={24} color={drawerInfo.tintColor} />
      )
    },
    defaultNavigationOptions: navigationOptions
  }
);

const ManageProductsNavigator = createStackNavigator(
  {
    ManageProducts: ManageProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerLabel: "Manage Products",
      drawerIcon: (drawerInfo) => (
        <Ionicons name="ios-create" size={24} color={drawerInfo.tintColor} />
      )
    },
    defaultNavigationOptions: navigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerInfo) => (
        <Ionicons name="ios-list" size={24} color={drawerInfo.tintColor} />
      )
    },
    defaultNavigationOptions: navigationOptions
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Shop: ShopNavigator,
    Orders: OrdersNavigator,
    ManageProducts: ManageProductsNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: navigationOptions
  }
);

const Navigator = createSwitchNavigator(
  {
    Startup: StartupScreen,
    Auth: AuthNavigator,
    App: AppNavigator
  }
);

export default createAppContainer(Navigator);
