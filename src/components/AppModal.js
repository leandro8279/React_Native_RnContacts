import React from "react";
import { Modal } from "react-native";
import { Block, Button, Text } from "rn-ui-kits";
import { EvilIcons } from "@expo/vector-icons";
import colors from "../theme/colors";
export default function AppModal({
  modalVisible,
  modalFooter,
  modalBody,
  title,
  setModalVisible,
  closeOnTouchOutside,
}) {
  return (
    <Modal visible={modalVisible} transparent>
      <Block
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
        }}
        // onPress={() => {
        //   if (closeOnTouchOutside) {
        //     setModalVisible(false);
        //   }
        // }}
      >
        <Block
          style={{
            flex: 0,
            backgroundColor: "white",
            borderRadius: 4,
            minHeight: 300,
            marginHorizontal: 20,
          }}
        >
          <Block scroll>
            <Block row padding={15} center space="space-between" width="100%">
              <Button
                noflex
                transparent
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <EvilIcons name="close" size={27} />
              </Button>
              <Text size={21}>{title || "RNContacts"}</Text>
              <Block noflex />
            </Block>

            <Block height={0.5} color={colors.grey} noflex />

            <Block
              noflex
              style={{
                minHeight: 300,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              {modalBody}
            </Block>
            {modalFooter}
            {!modalFooter && (
              <Block>
                <>
                  <Block height={0.5} color={colors.grey} />
                  <Block width="100%" padding={10}>
                    <Block row center space="space-evenly" paddingVertical={7}>
                      <Text size={12}>Privacy Policy</Text>
                      <Block
                        noflex
                        width={5}
                        height={5}
                        radius={100}
                        color={colors.grey}
                      />
                      <Text size={12}>Terms of Service</Text>
                    </Block>
                  </Block>
                </>
              </Block>
            )}
          </Block>
        </Block>
      </Block>
    </Modal>
  );
}
