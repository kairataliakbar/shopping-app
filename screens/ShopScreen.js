/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/ProductItem";
import * as cartActions from "../store/actions/carts";
import * as productsActions from "../store/actions/products";

const ShopScreen = ({ navigation }) => {
  const availabelProducts = useSelector((state) => state.products.availabelProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);

  const handleSelectProduct = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  return (
    <FlatList
      data={availabelProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => handleSelectProduct(itemData.item.id, itemData.item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Product"
            onPress={() => handleSelectProduct(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.primary}
            title="To Card"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
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
