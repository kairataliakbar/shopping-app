/* eslint-disable react/display-name */
import React from "react";
import { FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ProductItem from "../components/ProductItem";
import * as productActions from "../store/actions/products";

const ManageProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {}}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => dispatch(productActions.deleteProduct(itemData.item.id))}
          />
        </ProductItem>
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
