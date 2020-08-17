import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const ProductDetailScreen = () => (
  <View style={styles.screen}>
    <Text>ProductDetailScreen</Text>
  </View>
);

export default ProductDetailScreen;
