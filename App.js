import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import AppNavigator from "./navigations/AppNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoading, setFontLoading] = useState(false);

  if (!fontLoading) return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoading(true)}
    />
  );

  return <AppNavigator />;
}
