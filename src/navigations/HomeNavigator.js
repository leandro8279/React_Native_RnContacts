import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  CONTACT_CREATE,
  CONTACT_DETAIL,
  CONTACT_LIST,
  SETTINGS,
} from "../constants/routesNames";
import { Contacts, ContactsDetail, CreateContact, Settings } from "../screens";

export default function HomeNavigator() {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen name={CONTACT_LIST} component={Contacts} />
      <Screen name={CONTACT_DETAIL} component={ContactsDetail} />
      <Screen name={CONTACT_CREATE} component={CreateContact} />
      <Screen name={SETTINGS} component={Settings} />
    </Navigator>
  );
}
