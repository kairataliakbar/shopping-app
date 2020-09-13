import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import GlobalStyles from "../constants/GlobalStyles";

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  quantity: {
    fontSize: 18,
    color: "#888"
  },
  text: {
    fontSize: 18
  },
  deleteButton: {
    marginLeft: 10
  }
});

const CartItem = ({ quantity, title, price, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={{ ...styles.quantity, ...GlobalStyles.text }}>{quantity} </Text>
        <Text style={{ ...styles.text, ...GlobalStyles.textBold }}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={{ ...styles.text, ...GlobalStyles.textBold }}>${price && price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
          <Ionicons name="ios-trash" color="red" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CartItem.propTypes = {
  quantity: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  onRemove: PropTypes.func
};

export default CartItem;
