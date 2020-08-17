import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const EditProductScreen = () => (
  <View style={styles.screen}>
    <Text>EditProductScreen</Text>
  </View>
);

export default EditProductScreen;
