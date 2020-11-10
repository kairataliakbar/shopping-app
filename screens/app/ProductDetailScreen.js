import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import GlobalStyles from "../../constants/GlobalStyles";
import * as cartActions from "../../store/actions/carts";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    marginVertical: 10
  },
  button: {
    marginVertical: 10
  },
  price: {
    marginVertical: 20,
    fontSize: 20,
    color: "#888"
  },
  description: {
    marginHorizontal: 20,
    fontSize: 14,
    textAlign: "center"
  }
});

const ProductDetailScreen = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const selectedProduct = useSelector((state) => state.products.availabelProducts)
    .find((product) => product.id === productId);
  const dispatch = useDispatch();

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image
        style={styles.image}
        source={{ uri: selectedProduct.imageUrl }}
      />
      <View style={styles.actions}>
        <Button
          title="ADD TO CARD"
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
          color={Colors.primary}
        />
      </View>
      <Text style={{ ...styles.price, ...GlobalStyles.textBold }}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={{ ...styles.description, ...GlobalStyles.text }}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("productTitle")
  };
};

ProductDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired
  }).isRequired
};

export default ProductDetailScreen;
