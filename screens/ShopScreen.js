/* eslint-disable react/display-name */
import React from "react";
import { FlatList, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";

const ShopScreen = () => {
  const availabelProducts = useSelector((state) => state.products.availabelProducts);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={availabelProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

ShopScreen.navigationOptions = ({ navigation }) => {
  return {
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

export default ShopScreen;
