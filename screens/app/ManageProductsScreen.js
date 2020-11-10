/* eslint-disable react/display-name */
import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import ProductItem from "../../components/ProductItem";
import * as productActions from "../../store/actions/products";

const ManageProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const selectProduct = (productId) => {
    navigation.navigate("EditProduct", { id: productId });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Are you sure",
      "Do you really want to delete this item?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => dispatch(productActions.deleteProduct(id))
        }
      ]
    );
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onSelect={() => selectProduct(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => selectProduct(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => handleDelete(itemData.item.id)}
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="ios-add-circle"
          onPress={() => navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    )
  };
};

ManageProductsScreen.propTypes = {
  navigation: PropTypes.object
};

export default ManageProductsScreen;
