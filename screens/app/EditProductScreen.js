/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/CustomHeaderButton";
import GlobalStyles from "../../constants/GlobalStyles";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontSize: 16,
    marginVertical: 8
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const EditProductScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const productId = navigation.getParam("id");
  const dispatch = useDispatch();
  const editProduct = useSelector((state) => (
    state.products.userProducts.find((product) => product.id === productId)
  ));

  const [title, setTitle] = useState(editProduct ? editProduct.title : "");
  const [imageUrl, setImageUrl] = useState(editProduct ? editProduct.imageUrl : "");
  const [price, setPrice] = useState(editProduct ? editProduct.price : "");
  const [description, setDescription] = useState(editProduct ? editProduct.description : "");

  const handleSubmit = useCallback(() => {
    setError(null);
    setIsLoading(true);
    dispatch(editProduct
      ? productsActions.updateProduct(
        productId,
        title,
        imageUrl,
        description,
        editProduct.price
      )
      : productsActions.createProduct(
        title,
        imageUrl,
        description,
        parseInt(price, 10)
      ))
        .then((res) => {
          console.log(res, "res");
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err, "err");
          setError(err.message);
          setIsLoading(false);
        });
  }, [dispatch, productId, title, imageUrl, description, price]);

  useEffect(() => {
    navigation.setParams({ onSubmit: handleSubmit });
  }, [handleSubmit]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okey" }]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={[styles.label, GlobalStyles.textBold]}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={[styles.label, GlobalStyles.textBold]}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {!editProduct && (
          <View style={styles.formControl}>
            <Text style={[styles.label, GlobalStyles.textBold]}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={[styles.label, GlobalStyles.textBold]}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const productId = navigation.getParam("id");
  const onSubmit = navigation.getParam("onSubmit");
  return {
    headerTitle: productId ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Submit"
          iconName="ios-checkmark-circle"
          onPress={onSubmit}
        />
      </HeaderButtons>
    )
  };
};

EditProductScreen.propTypes = {
  navigation: PropTypes.object
};

export default EditProductScreen;
