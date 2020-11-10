/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/CustomHeaderButton";
import OrderItem from "../../components/OrderItem";
import GlobalStyles from "../../constants/GlobalStyles";
import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders())
      .then(() => setIsLoading(false));
  }, [dispatch]);  

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={GlobalStyles.text}>
          Orders not found! Please place an order!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          totalPrice={itemData.item.totalPrice}
          date={itemData.item.date}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

OrdersScreen.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func,
  }).isRequired
};

export default OrdersScreen;
