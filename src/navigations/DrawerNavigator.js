import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import { HOME_NAVIGATOR } from "../constants/routesNames";
import SideMenu from "./SideMenu";
import { GlobalContext } from "../context/Provider";
export default function DrawerNavigator() {
  const { Navigator, Screen } = createDrawerNavigator();
  const { authDispatch } = useContext(GlobalContext);

  const getDrawerContent = (navigation, authDispatch) => {
    return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
  };
  return (
    <Navigator
      drawerType="slide"
      drawerContent={({ navigation }) =>
        getDrawerContent(navigation, authDispatch)
      }
      screenOptions={{ headerShown: false }}
    >
      <Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
    </Navigator>
  );
}
