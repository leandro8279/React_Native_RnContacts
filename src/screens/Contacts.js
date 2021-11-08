import React, {
  useLayoutEffect,
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Block, Button, Image, Text } from "rn-ui-kits";
import { GlobalContext } from "../context/Provider";
import { ActivityIndicator, FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "react-native-size-matters";
import { AppModal, Container, Message } from "../components";
import getContacts from "../context/actions/contacts/getContacts";
import { CONTACT_CREATE, CONTACT_DETAIL } from "../constants/routesNames";
import colors from "../theme/colors";

export default function Contacts({ navigation }) {
  const [sortBy, setSortBy] = useState(null);
  const contactsRef = useRef([]);
  const { setOptions, toggleDrawer } = useNavigation();
  const swipeableItemRefs = useRef([]);

  const {
    contactsDispatch,
    contactsState: {
      getContacts: { data, loading, error },
    },
  } = useContext(GlobalContext);
  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <MaterialIcons
          name="menu"
          size={24}
          style={{ marginLeft: 15 }}
          onPress={() => toggleDrawer()}
        />
      ),
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
      getSettings();
      return () => {};
    }, [])
  );
  useEffect(() => {
    getContacts()(contactsDispatch);
  }, []);

  async function getSettings() {
    const sortPref = await AsyncStorage.getItem("sortBy");
    if (sortPref) {
      setSortBy(sortPref);
    }
  }
  function renderItem({ item }) {
    const {
      id,
      contact_picture,
      first_name,
      country_code,
      phone_number,
      last_name,
    } = item;
    return (
      <Swipeable
        ref={(ref) =>
          swipeableItemRefs.current.push({
            id,
            swipeable: ref,
          })
        }
        onSwipeableWillOpen={() => toggleSwipeable(id)}
        renderLeftActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, item)
        }
        renderRightActions={(progress, dragX) =>
          renderLeftActions(progress, dragX, item)
        }
      >
        <Button
          transparent
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 40,
            alignItems: "center",
            flexGrow: 1,
          }}
          onPress={() => {
            navigation.navigate(CONTACT_DETAIL, { item });
          }}
        >
          <Block row paddingVertical={10} center paddingHorizontal={20}>
            {contact_picture ? (
              <Image
                width={50}
                height={50}
                source={{ uri: contact_picture }}
                style={{ borderRadius: 100 }}
              />
            ) : (
              <Block
                noflex
                width={50}
                height={50}
                radius={100}
                center
                middle
                row
                color={colors.grey}
              >
                <Text white size={17}>
                  {first_name[0]}
                </Text>
                <Text white size={17}>
                  {last_name[0]}
                </Text>
              </Block>
            )}

            <Block paddingLeft={20}>
              <Block row>
                <Text size={17}>{first_name}</Text>

                <Text size={17}> {last_name}</Text>
              </Block>
              <Text
                style={{
                  opacity: 0.6,
                  fontSize: 14,
                  paddingVertical: 5,
                }}
              >{`${country_code} ${phone_number}`}</Text>
            </Block>
          </Block>
          <AntDesign name="right" size={18} color={colors.grey} />
        </Button>
      </Swipeable>
    );
  }
  const toggleSwipeable = (key) => {
    swipeableItemRefs.current.forEach((ref, i) => {
      if (ref.id !== key) {
        swipeableItemRefs.current?.[i]?.swipeable?.close();
      }
    });
  };

  function renderLeftActions(progress, dragX) {
    return (
      <Block row paddingRight={5}>
        <Button
          transparent
          style={{
            flexGrow: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            paddingHorizontal: 10,
          }}
          onPress={() => {}}
        >
          <MaterialIcons name="chat" size={s(22)} color={colors.white} />
          <Text
            style={{
              textAlign: "center",
              maxWidth: s(70),
              paddingTop: s(5),
              fontSize: s(14),
              color: colors.white,
            }}
          >
            Chat
          </Text>
        </Button>

        <Button
          style={{
            flexGrow: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            paddingHorizontal: 10,
          }}
          onPress={() => {}}
        >
          <MaterialCommunityIcons
            name="heart-outline"
            size={22}
            color={colors.white}
          />
          <Text
            numberOfLines={1}
            style={{
              textAlign: "center",
              maxWidth: s(70),
              paddingTop: s(5),
              fontSize: s(14),
              color: colors.white,
            }}
          >
            Favorite
          </Text>
        </Button>
      </Block>
    );
  }
  function ListEmptyComponent() {
    return (
      <Block noflex paddingHorizontal={10} paddingVertical={100}>
        <Message info message="No contacts to show" />
      </Block>
    );
  }
  return (
    <>
      <Block white>
        {loading && (
          <Block paddingVertical={100} paddingHorizontal={100}>
            <ActivityIndicator color={colors.primary} size="large" />
          </Block>
        )}
        {!loading && (
          <Block paddingVertical={20}>
            <FlatList
              renderItem={renderItem}
              data={
                sortBy
                  ? data.sort((a, b) => {
                      if (sortBy === "First Name") {
                        if (b.first_name > a.first_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                      if (sortBy === "Last Name") {
                        if (b.last_name > a.last_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                    })
                  : data
              }
              ItemSeparatorComponent={() => (
                <Block height={0.5} color={colors.grey} />
              )}
              keyExtractor={(item) => String(item.id)}
              ListEmptyComponent={ListEmptyComponent}
            />
          </Block>
        )}
      </Block>
      <Button
        style={{
          backgroundColor: "red",
          width: 55,
          height: 55,
          position: "absolute",
          bottom: 45,
          right: 10,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate(CONTACT_CREATE)}
      >
        <AntDesign name="plus" size={21} color={colors.white} />
      </Button>
    </>
  );
}
