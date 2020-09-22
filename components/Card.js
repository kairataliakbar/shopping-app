import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  }
});

const Card = ({ style, children }) => (
  <View style={[styles.card, style]}>{children}</View>
);

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default Card;
