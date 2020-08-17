import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const CartScreen = () => (
  <View style={styles.screen}>
    <Text>CartScreen</Text>
  </View>
);

export default CartScreen;
