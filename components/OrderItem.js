import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";

const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  detailsOrder: {
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
  }
});

const OrderItem = ({ totalPrice, date }) => {
  return (
    <View style={styles.item}>
      <View style={styles.detailsOrder}>
        <Text style={[styles.totalPrice, GlobalStyles.textBold]}>
          ${totalPrice.toFixed(2)}
        </Text>
        <Text style={[styles.date, GlobalStyles.text]}>
          {moment(date).format("MMMM Do YYYY, h:mm")}
        </Text>
      </View>
      <Button title="SHOW DETAILS" color={Colors.primary} onPress={() => {}} />
    </View>
  );
};

OrderItem.propTypes = {
  totalPrice: PropTypes.number,
  date: PropTypes.string
};

export default OrderItem;
