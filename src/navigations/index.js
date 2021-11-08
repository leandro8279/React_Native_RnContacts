import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { GlobalContext } from "../context/Provider";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { Block } from "rn-ui-kits";
export default function AppContainer() {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = useState(false);
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  async function getUser() {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (error) {}
  }
  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <>
      {authLoaded ? (
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <Block center middle>
          <ActivityIndicator color="black" size={50} />
        </Block>
      )}
    </>
  );
}
