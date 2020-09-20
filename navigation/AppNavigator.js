/* eslint-disable react/display-name */
import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import ShopScreen from "../screens/ShopScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ManageProductsScreen from "../screens/ManageProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";

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

export default createAppContainer(AppNavigator);
