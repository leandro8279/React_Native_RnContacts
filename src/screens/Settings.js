import React, { useEffect, useLayoutEffect } from "react";
import { Block, Button, Text } from "rn-ui-kits";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { AppModal } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Settings() {
  const [email, setEmail] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(null);

  useEffect(() => {
    getSettings();
  }, []);
  const settingsOptions = [
    { title: "My Info", subTitle: "Setup your profile", onPress: () => {} },
    { title: "Accounts", subTitle: null, onPress: () => {} },
    {
      title: "Default account for new contacts",
      subTitle: email,
      onPress: () => {},
    },
    {
      title: "Contacts to display",
      subTitle: "All contacts",
      onPress: () => {},
    },
    {
      title: "Sort by",
      subTitle: sortBy,
      onPress: () => {
        setModalVisible(true);
      },
    },
    { title: "Name format", subTitle: "First name first", onPress: () => {} },
    { title: "Import", subTitle: null, onPress: () => {} },
    { title: "Export", subTitle: null, onPress: () => {} },
    { title: "Blocked numbers", subTitle: null, onPress: () => {} },
    { title: "About RNContacts", subTitle: null, onPress: () => {} },
  ];
  const saveSetting = (key, value) => {
    AsyncStorage.setItem(key, value);
  };
  const prefArr = [
    {
      name: "First Name",
      selected: sortBy === "First Name",
      onPress: () => {
        saveSetting("sortBy", "First Name");
        setSortBy("First Name");
        setModalVisible(false);
      },
    },
    {
      name: "Last Name",
      selected: sortBy === "Last Name",
      onPress: () => {
        saveSetting("sortBy", "Last Name");
        setSortBy("Last Name");
        setModalVisible(false);
      },
    },
  ];
  return (
    <>
      <AppModal
        modalVisible={modalVisible}
        modalFooter={<></>}
        closeOnTouchOutside={false}
        modalBody={
          <Block>
            {prefArr.map(({ name, selected, onPress }) => (
              <Block key={name}>
                <Button
                  transparent
                  onPress={onPress}
                  style={{
                    flexDirection: "row",
                    paddingVertical: 5,
                    alignItems: "center",
                  }}
                >
                  {selected && <MaterialIcons size={17} name="check" />}
                  <Text
                    style={{ fontSize: 17, paddingLeft: selected ? 15 : 30 }}
                  >
                    {name}
                  </Text>
                </Button>
              </Block>
            ))}
          </Block>
        }
        title="Sort by"
        setModalVisible={setModalVisible}
      />
      <Block scroll white>
        {settingsOptions.map(({ title, subTitle, onPress }, index) => (
          <Button transparent key={title} onPress={onPress}>
            <Block paddingHorizontal={20} paddingVertical={20}>
              <Text size={17} bold>
                {title}
              </Text>
              {subTitle && (
                <Text size={14} style={{ opacity: 0.5 }} paddingTop={5}>
                  {subTitle}
                </Text>
              )}
            </Block>
            <Block height={0.5} gray noflex />
          </Button>
        ))}
      </Block>
    </>
  );
  async function getSettings() {
    const user = await AsyncStorage.getItem("user");
    setEmail(JSON.parse(user).email);

    const sortPref = await AsyncStorage.getItem("sortBy");
    if (sortPref) {
      setSortBy(sortPref);
    }
  }
}
