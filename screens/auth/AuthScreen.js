import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
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
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleAuth = useCallback(() => {
    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);
      return (
        dispatch(isSignup
          ? authActions.signup(email, password)
          : authActions.login(email, password)
        )
          .then(() => setIsLoading(false))
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Error", err.message, [{ text: "Okey" }]);
          })
      );
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
          {isLoading
            ? <ActivityIndicator size="small" color={Colors.primary} />
            : <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={handleAuth}
              />}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
            color={Colors.accent}
            onPress={() => setIsSignup(!isSignup)}
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
