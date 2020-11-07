import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../components/CartItem";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";
import * as cartActions from "../store/actions/carts";
import * as ordersActions from "../store/actions/orders";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  const [isLoading, setIsLoading] = useState(false);

  const totalPriceItems = useSelector((state) => state.cart.totalPrice);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddOrder = () => {
    setIsLoading(true);
    dispatch(ordersActions.addOrder(items, totalPriceItems))
      .then(() => setIsLoading(false));
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={{ ...styles.summaryText, ...GlobalStyles.textBold }}>
          Total: <Text style={{ color: Colors.primary }}>${totalPriceItems.toFixed(2)}</Text>
        </Text>
        {isLoading
          ? <ActivityIndicator size="small" color={Colors.primary} />
          : <Button
              title="Order Now"
              color={Colors.accent}
              disabled={items.length === 0}
              onPress={handleAddOrder}
            />}
      </Card>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.prodTitle}
            price={itemData.item.sum}
            onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.id))}
            deletable
          />
        )}
      />
    </View>
  );
};

export default CartScreen;
