import React, { useContext, useEffect, useRef, useState } from "react";
import { Block, Button, Image, Text } from "rn-ui-kits";
import { useNavigation, useRoute } from "@react-navigation/core";
import CountryPicker from "react-native-country-picker-modal";
import { Container, CustomButton, FromInput, ImageFile } from "../components";
import { DEFAULT_IMAGE_URI } from "../constants/general";
import { GlobalContext } from "../context/Provider";
import { Switch } from "react-native-gesture-handler";
import colors from "../theme/colors";
import uploadImage from "../helpers/uploadImage";
import createContact from "../context/actions/contacts/createContact";
import { CONTACT_DETAIL, CONTACT_LIST } from "../constants/routesNames";
import editContact from "../context/actions/contacts/editContact";
import countryCodes from "../utils/countryCodes";
export default function CreateContact({ navigation }) {
  const {
    contactsDispatch,
    contactsState: {
      createContact: { loading, error },
    },
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);
  const { navigate, setOptions } = useNavigation();
  const { params } = useRoute();

  const [localFile, setLocalFile] = useState(null);
  useEffect(() => {
    if (params?.item) {
      setOptions({ title: "Update contact" });
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.item;

      setForm((prev) => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find((item) => {
        return item.value.replace("+", "") === countryCode;
      });

      if (country) {
        setForm((prev) => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }

      if (params?.item?.contact_picture) {
        setLocalFile(params?.item.contact_picture);
      }
    }
  }, []);
  return (
    <Block white>
      <Container>
        <Image
          width={150}
          height={150}
          style={{ borderRadius: 100, alignSelf: "center" }}
          source={{ uri: localFile?.path || localFile || DEFAULT_IMAGE_URI }}
        />

        <Button transparent center onPress={openSheet}>
          <Text color={colors.primary}>Choose image</Text>
        </Button>
        <FromInput
          onChangeText={(value) => {
            onChangeText({ name: "firstName", value: value });
          }}
          label="First name"
          value={form.firstName || ""}
          placeholder="Enter First name"
          error={error?.first_name?.[0]}
        />
        <FromInput
          error={error?.last_name?.[0]}
          onChangeText={(value) => {
            onChangeText({ name: "lastName", value: value });
          }}
          value={form.lastName || ""}
          label="Last name"
          placeholder="Enter Last name"
        />
        <FromInput
          leftIcon={
            <CountryPicker
              withFilter
              withFlag
              countryCode={form.countryCode || undefined}
              withCountryNameButton={false}
              withCallingCode
              withCallingCodeButton
              withEmoji
              onSelect={(v) => {
                const phoneCode = v.callingCode[0];
                const cCode = v.cca2;
                setForm({ ...form, phoneCode, countryCode: cCode });
              }}
            />
          }
          value={form.phoneNumber || ""}
          error={error?.phone_number?.[0]}
          onChangeText={(value) => {
            onChangeText({ name: "phoneNumber", value: value });
          }}
          label="Phone Number"
          placeholder="Enter phone number"
        />
        <Block row center space="space-between" paddingVertical={10}>
          <Text>Add to favorites</Text>
          <Switch
            trackColor={{ false: "blue", true: colors.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite}
          />
        </Block>

        <CustomButton
          loading={loading || uploading}
          disabled={loading || uploading}
          onPress={onSubmit}
          primary
          title="Submit"
        />

        <ImageFile onFileSelected={onFileSelected} ref={sheetRef} />
      </Container>
    </Block>
  );

  function openSheet() {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  }
  function closeSheet() {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  }
  function onSubmit() {
    if (params?.item) {
      editContact(form, params?.item.id)(contactsDispatch)((item) => {
        navigate(CONTACT_DETAIL, { item });
      });
    } else {
      if (localFile) {
        setIsUploading(true);

        uploadImage(localFile)((url) => {
          setIsUploading(false);

          createContact({ ...form, contactPicture: url })(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            }
          );
        })((err) => {
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigation.goBack();
        });
      }
    }
  }
  function onFileSelected(image) {
    closeSheet();
    setLocalFile(image);
  }
  function onChangeText({ name, value }) {
    setForm({ ...form, [name]: value });
  }
  function toggleValueChange() {
    setForm({ ...form, isFavorite: !form.isFavorite });
  }
}
