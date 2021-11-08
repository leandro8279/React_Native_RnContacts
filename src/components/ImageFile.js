import React, { useEffect } from "react";
import { Block, Button, Text } from "rn-ui-kits";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../theme/colors";
export default ImageFile = React.forwardRef(({ onFileSelected }, ref) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const options = [
    {
      name: "Take from camera",
      icon: <MaterialIcons color={colors.grey} size={21} name="camera" />,
      onPress: async () => {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
          allowsEditing: false,
          quality: 1,
        });
        onFileSelected(result.uri);
      },
    },
    {
      name: "Choose from Gallery",
      icon: <MaterialIcons name="image" color={colors.grey} size={21} />,
      onPress: async () => {
        const { uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
          allowsEditing: false,
          quality: 1,
        });
        onFileSelected(uri);
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={190}
      openDuration={250}
      dragFromTopOnly
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}
    >
      <Block paddingHorizontal={20}>
        {options.map(({ name, onPress, icon }) => (
          <Button
            onPress={onPress}
            key={name}
            style={{
              flexDirection: "row",
              paddingTop: 20,
              alignItems: "center",
            }}
            transparent
          >
            {icon}
            <Text size={17} paddingLeft={17}>
              {name}
            </Text>
          </Button>
        ))}
      </Block>
    </RBSheet>
  );
});
