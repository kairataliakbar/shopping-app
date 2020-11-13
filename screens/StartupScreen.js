import React, { useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        return navigation.navigate("Auth");
      }

      const trasformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = trasformedData;

      if (new Date(expirationDate) <= new Date() || !token || !userId) {
        return navigation.navigate("Auth");
      }

      navigation.navigate("App");
      dispatch(authActions.authenticate(token, userId, expirationDate.getTime() - new Date().getTime()));
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

StartupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

export default StartupScreen;
