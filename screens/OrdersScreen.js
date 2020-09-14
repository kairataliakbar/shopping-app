/* eslint-disable react/display-name */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);
  return (
    <View style={styles.screen}>
      <Text>OrdersScreen</Text>
    </View>
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
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

export default OrdersScreen;
