import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const OrdersScreen = () => (
  <View style={styles.screen}>
    <Text>OrdersScreen</Text>
  </View>
);

export default OrdersScreen;
