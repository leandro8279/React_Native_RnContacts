import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Block, Button, Image, Text } from "rn-ui-kits";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CustomButton, ImageComponent, ImageFile } from "../components";
import { DEFAULT_IMAGE_URI } from "../constants/general";
import { GlobalContext } from "../context/Provider";
import colors from "../theme/colors";
import {
  CONTACT_CREATE,
  CONTACT_DETAIL,
  CONTACT_LIST,
} from "../constants/routesNames";
import { ActivityIndicator, Alert } from "react-native";
import deleteContact from "../context/actions/contacts/deleteContact";
import uploadImage from "../helpers/uploadImage";
import editContact from "../context/actions/contacts/editContact";

export default function ContactsDetail() {
  const { params: { item = {} } = {} } = useRoute();

  const { contact_picture, first_name, country_code, phone_number, last_name } =
    item;
  const {
    contactsDispatch,
    contactsState: {
      deleteContact: { loading },
    },
  } = useContext(GlobalContext);
  const { setOptions, navigate } = useNavigation();
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);

  useEffect(() => {
    if (item) {
      setOptions({
        title: item.first_name + " " + item.last_name,
        headerRight: () => {
          return (
            <Block row paddingRight={10}>
              <Button transparent>
                <MaterialIcons
                  size={21}
                  color={colors.grey}
                  name={item.is_favorite ? "star" : "star-border"}
                />
              </Button>
              <Button
                transparent
                onPress={() => {
                  Alert.alert(
                    "Delete!",
                    "Are you sure you want to remove " + item.first_name,
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                      },

                      {
                        text: "OK",
                        onPress: () => {
                          deleteContact(item.id)(contactsDispatch)(() => {
                            navigate(CONTACT_LIST);
                          });
                        },
                      },
                    ]
                  );
                }}
                style={{ paddingLeft: 10 }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <MaterialIcons
                    color={colors.grey}
                    size={21}
                    name="delete"
                    type="material"
                  />
                )}
              </Button>
            </Block>
          );
        },
      });
    }
  }, [item, loading]);

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = (image) => {
    closeSheet();
    setLocalFile(image);
    setUpdatingImage(true);
    uploadImage(image)((url) => {
      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        country_code: phoneCode,
        is_favorite: isFavorite,
      } = item;
      editContact(
        {
          firstName,
          lastName,
          phoneNumber,
          isFavorite,
          phoneCode,
          contactPicture: url,
        },
        item.id
      )(contactsDispatch)((item) => {
        setUpdatingImage(false);
        setUploadSucceeded(true);
        navigate(CONTACT_DETAIL, { item });
      });
    })((err) => {
      setUpdatingImage(false);
    });
  };
  return (
    <Block scroll white>
      <Block>
        {(contact_picture || uploadSucceeded) && (
          <ImageComponent src={contact_picture || localFile?.path} />
        )}

        {!contact_picture && !uploadSucceeded && (
          <Block center paddingVertical={20}>
            <Image
              width={150}
              height={150}
              style={{
                borderRadius: 100,
              }}
              source={{ uri: localFile?.path || DEFAULT_IMAGE_URI }}
            />

            <Button
              transparent
              onPress={() => {
                openSheet();
              }}
            >
              <Text color={colors.primary}>
                {" "}
                {updatingImage ? "updating..." : "Add picture"}{" "}
              </Text>
            </Button>
          </Block>
        )}
        <Block flex marginHorizontal={20}>
          <Text size={23}>{first_name + " " + last_name}</Text>
        </Block>

        <Block
          height={10}
          style={{
            height: 10,
            borderColor: colors.grey,
            borderBottomWidth: 0.4,
          }}
        />

        <Block
          row
          center
          space="space-evenly"
          paddingHorizontal={20}
          paddingVertical={20}
        >
          <Button
            transparent
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 20,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Ionicons name="call-outline" color={colors.primary} size={27} />
            <Text size={14} color={colors.primary} paddingVertical={5}>
              Call
            </Text>
          </Button>
          <Button
            transparent
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 20,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="message-text"
              color={colors.primary}
              size={27}
            />
            <Text size={14} color={colors.primary} paddingVertical={5}>
              Text
            </Text>
          </Button>
          <Button
            transparent
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 20,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="video"
              color={colors.primary}
              size={27}
            />
            <Text size={14} color={colors.primary} paddingVertical={5}>
              Video
            </Text>
          </Button>
        </Block>

        <Block row paddingVertical={20} paddingHorizontal={20}>
          <Ionicons name="call-outline" color={colors.grey} size={27} />
          <Block paddingHorizontal={20} style={{ flexGrow: 1 }}>
            <Text>{phone_number}</Text>
            <Text>Mobile</Text>
          </Block>

          <Block
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="video"
              color={colors.primary}
              size={27}
            />
            <MaterialCommunityIcons
              type="materialCommunity"
              name="message-text"
              color={colors.primary}
              size={27}
            />
          </Block>
        </Block>
        <CustomButton
          style={{ alignSelf: "flex-end", marginRight: 20, width: 200 }}
          primary
          title="Edit Contact"
          onPress={() => {
            navigate(CONTACT_CREATE, { item, editing: true });
          }}
        />
      </Block>

      <ImageFile onFileSelected={onFileSelected} ref={sheetRef} />
    </Block>
  );
}
