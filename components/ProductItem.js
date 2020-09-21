import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import GlobalStyles from "../constants/GlobalStyles";

const styles = StyleSheet.create({
  productItemContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  details: {
    height: "15%",
    alignItems: "center",
    paddingVertical: 10
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 14
  },
  actions: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20
  }
});

const ProductItem = ({ imageUrl, title, price, onSelect, children }) => {
  const TouchableComponent = Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

  return (
    <View style={styles.productItemContainer}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={{ ...styles.title, ...GlobalStyles.textBold }}>{title}</Text>
              <Text style={{ ...styles.price, ...GlobalStyles.text }}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {children}
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

ProductItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.array
};

export default ProductItem;
