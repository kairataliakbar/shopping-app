/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/ProductItem";
import * as cartActions from "../store/actions/carts";

const ShopScreen = ({ navigation }) => {
  const availabelProducts = useSelector((state) => state.products.availabelProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={availabelProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewProduct={() => navigation.navigate("ProductDetail", {
            productId: itemData.item.id,
            productTitle: itemData.item.title
          })}
          onToCard={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      )}
    />
  );
};

ShopScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => navigation.navigate("Cart")}
        />
      </HeaderButtons>
    )
  };
};

ShopScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default ShopScreen;
