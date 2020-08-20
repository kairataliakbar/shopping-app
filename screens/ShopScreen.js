/* eslint-disable react/display-name */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const ShopScreen = () => (
  <View style={styles.screen}>
    <Text>ShopScreen</Text>
  </View>
);

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
