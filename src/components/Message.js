import React, { useState } from "react";
import { Block, Button, Text } from "rn-ui-kits";
import colors from "../theme/colors";

export default function Message({
  message,
  onDismiss,
  retry,
  retryFn,
  primary,
  danger,
  info,
  success,
}) {
  const [userDismissed, setUserDismissed] = useState(false);
  const getBgColor = () => {
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }
    if (success) {
      return colors.success;
    }

    if (info) {
      return colors.secondary;
    }
  };
  return (
    <>
      {userDismissed ? null : (
        <Button
          color={getBgColor()}
          height={42}
          paddingHorizontal={10}
          paddingVertical={13}
          marginVertical={5}
          radius={4}
        >
          <Block row center space="space-between">
            <Text white>{message}</Text>
            {retry && typeof onDismiss !== "function" && (
              <Button nativeFeedback onPress={retryFn}>
                <Text white>Retry</Text>
              </Button>
            )}
            {typeof onDismiss === "function" && (
              <Button
                nativeFeedback
                onPress={() => {
                  setUserDismissed(true);
                  onDismiss();
                }}
              >
                <Text white>X</Text>
              </Button>
            )}
          </Block>
        </Button>
      )}
    </>
  );
}
