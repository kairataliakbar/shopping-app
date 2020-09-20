/* eslint-disable react/display-name */
import React from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/ProductItem";

const ManageProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onViewProduct={() => {}}
          onToCard={() => {}}
        />
      )}
    />
  );
};

ManageProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Manage Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

export default ManageProductsScreen;
