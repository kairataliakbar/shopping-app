import React from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  summaryText: {
    fontSize: 18
  },
  carts: {
    flex: 1
  }
});

const CartScreen = () => {
  const totalPriceItems = useSelector((state) => state.cart.totalPrice);
  const items = useSelector((state) => state.cart.items);

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={{ ...styles.summaryText, ...GlobalStyles.textBold }}>
          Total: <Text style={{ color: Colors.primary }}>${totalPriceItems.toFixed(2)}</Text>
        </Text>
        <Button title="Order Now" color={Colors.accent} disabled={items.length === 0} />
      </View>
      <ScrollView style={styles.carts}>
        <Text>Cart Items</Text>
      </ScrollView>
    </View>
  );
};

export default CartScreen;
