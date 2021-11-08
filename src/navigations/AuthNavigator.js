import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LOGIN, REGISTER } from "../constants/routesNames";
import { Login, Register } from "../screens";
export default function AuthNavigator() {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={LOGIN} component={Login} />
      <Screen name={REGISTER} component={Register} />
    </Navigator>
  );
}
