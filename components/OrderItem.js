import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";
import CartItem from "./CartItem";
import Card from "./Card";

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  detailsOrderItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  totalPrice: {
    fontSize: 18
  },
  date: {
    fontSize: 18,
    color: "#888"
  },
  cartItems: {
    width: "100%"
  }
});

const OrderItem = ({ totalPrice, date, items }) => {
  const [isShowItems, setIsShowItems] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.detailsOrderItem}>
        <Text style={[styles.totalPrice, GlobalStyles.textBold]}>
          ${totalPrice.toFixed(2)}
        </Text>
        <Text style={[styles.date, GlobalStyles.text]}>
          {moment(date).format("MMMM Do YYYY, h:mm")}
        </Text>
      </View>
      <Button
        title={isShowItems ? "HIDE DETAILS" : "SHOW DETAILS"}
        color={Colors.primary}
        onPress={() => setIsShowItems(!isShowItems)}
      />
      {isShowItems && (
        <View style={styles.cartItems}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              quantity={item.quantity}
              title={item.prodTitle}
              price={item.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

OrderItem.propTypes = {
  totalPrice: PropTypes.number,
  date: PropTypes.string,
  items: PropTypes.array
};

export default OrderItem;
