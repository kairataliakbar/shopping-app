import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import ShopScreen from "../screens/ShopScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ManageProductsScreen from "../screens/ManageProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";

import Colors from "../constants/Colors";

const navigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: "white"
};

const ShopNavigator = createStackNavigator(
  {
    Shop: ShopScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: navigationOptions
  }
);

const ManageProductsNavigator = createStackNavigator(
  {
    ManageProducts: ManageProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    defaultNavigationOptions: navigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    defaultNavigationOptions: navigationOptions
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Shop: ShopNavigator,
    Orders: OrdersNavigator,
    ManageProducts: ManageProductsNavigator
  }
);

export default createAppContainer(AppNavigator);
