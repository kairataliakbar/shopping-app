import React from "react";
import { View, Text, StyleSheet } from "react-native";

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

export default ShopScreen;
