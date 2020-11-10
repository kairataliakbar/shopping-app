import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";

import Card from "../../components/Card";
import GlobalStyles from "../../constants/GlobalStyles";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffedff"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontSize: 16,
    marginVertical: 8
  },
  buttonContainer: {
    marginTop: 10
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
});

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignup = useCallback(() => {
    if (email.length > 0 && password.length > 0) {
      return dispatch(authActions.signup({ email, password }));
    }
    return Alert.alert("Error", "All fields required!", [{ text: "Okey" }]);
  }, [dispatch, email, password]);

  const CustomView = Platform.OS === "android" ? View : KeyboardAvoidingView;

  return (
    <CustomView style={styles.screen} behavior="padding" keyboardVerticalOffset={50}>
      <Card style={styles.authContainer}>
        <View style={styles.formControl}>
          <Text style={[styles.label, GlobalStyles.textBold]}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={[styles.label, GlobalStyles.textBold]}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="done"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            color={Colors.primary}
            onPress={handleSignup}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Switch to Sign Up"
            color={Colors.accent}
            onPress={() => {}}
          />
        </View>
      </Card>
    </CustomView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

export default AuthScreen;
