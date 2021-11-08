import React from "react";
import { Block, Button, Text } from "rn-ui-kits";
import colors from "../theme/colors";

export default function CustomButton({
  title,
  secondary,
  primary,
  danger,
  disabled,
  loading,
  onPress,
  style,
}) {
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }

    if (secondary) {
      return colors.secondary;
    }
  };
  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      color={getBgColor()}
      style={style}
      height={42}
      radius={4}
      center
    >
      {title && (
        <Text
          color={disabled ? "black" : "white"}
          bold
          paddingLeft={loading ? 5 : 0}
        >
          {loading ? "Please wait..." : title}
        </Text>
      )}
    </Button>
  );
}
