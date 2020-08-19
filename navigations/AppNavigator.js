import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import ShopScreen from "../screens/ShopScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ManageProductsScreen from "../screens/ManageProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";

const ShopNavigator = createStackNavigator(
  {
    Shop: ShopScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  }
);

const ManageProductsNavigator = createStackNavigator(
  {
    ManageProducts: ManageProductsScreen,
    EditProduct: EditProductScreen
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
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
