import React from "react";
import { Block, Button, Image, Text } from "rn-ui-kits";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { Container } from "../../components";
import { SETTINGS } from "../../constants/routesNames";
import Logout from "../../screens/Logout";
import logoutUser from "../../context/actions/auth/logoutUser";

export default function SlideMenu({ navigation, authDispatch }) {
  function handleLogout() {
    navigation.toggleDrawer();
    Alert.alert("Logout!", "Tem certeza que deseja sair?", [
      {
        text: "Cancel",
        onPress: () => {},
      },

      {
        text: "OK",
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  }
  const menuItems = [
    {
      icon: <Fontisto size={17} name="player-settings" />,
      name: "Settings",
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <MaterialIcons size={17} name="logout" />,
      name: "Logout",
      onPress: handleLogout,
    },
  ];
  return (
    <Block safe>
      <Container>
        <Image
          width={150}
          height={150}
          style={{ marginTop: 50 }}
          source={require("../../assets/images/logo.png")}
        />
        <Block paddingHorizontal={30}>
          {menuItems.map(({ name, icon, onPress }) => (
            <Button
              onPress={onPress}
              key={name}
              transparent
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Block noflex>{icon}</Block>
              <Text size={17} paddingVertical={7} paddingLeft={20}>
                {name}
              </Text>
            </Button>
          ))}
        </Block>
      </Container>
    </Block>
  );
}
