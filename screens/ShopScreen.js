/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/ProductItem";
import * as cartActions from "../store/actions/carts";
import * as productsActions from "../store/actions/products";

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const ShopScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const availabelProducts = useSelector((state) => state.products.availabelProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(() => {
    setError(null);
    setIsRefreshing(true);
    return dispatch(productsActions.fetchProducts())
      .then(() => setIsRefreshing(false))
      .catch((err) => {
        setIsRefreshing(false);
        setError(err.message);
      });
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", loadProducts);
  
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts()
      .then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  const handleSelectProduct = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={GlobalStyles.text}>{error}</Text>
        <Button
          color={Colors.primary}
          title="Try again"
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && availabelProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={GlobalStyles.text}>
          Products not found! Please upload Product!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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
    navigate: PropTypes.func,
    addListener: PropTypes.func,
  }).isRequired
};

export default ShopScreen;
