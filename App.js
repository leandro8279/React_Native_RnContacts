import React from "react";
import { LogBox } from "react-native";
import GlobalProvider from "./src/context/Provider";
import AppContainer from "./src/navigations";
export default function App() {
  LogBox.ignoreLogs([
    `Setting a timer for a long period`,
    "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  ]);

  return (
    <GlobalProvider>
      <AppContainer />
    </GlobalProvider>
  );
}
