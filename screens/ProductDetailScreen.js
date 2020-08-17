import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const ItemDetailScreen = () => (
  <View style={styles.screen}>
    <Text>ItemDetailScreen</Text>
  </View>
);

export default ItemDetailScreen;
