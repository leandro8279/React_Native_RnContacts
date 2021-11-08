import React, { useState } from "react";
import { Block, Input, Text } from "rn-ui-kits";
import colors from "../theme/colors";

export default function FromInput({
  label,
  value,
  onChangeText,
  rightIcon = null,
  leftIcon = null,
  error,
  style,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }
    if (focused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };
  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChangeText}
      containerStyle={{ paddingHorizontal: -10, style }}
      inputContainerStyle={{
        borderColor: getBorderColor(),
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        marginTop: 5,
        height: 45,
      }}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => {
        setFocused(false);
      }}
      leftIcon={leftIcon || null}
      leftIconContainerStyle={{
        width: 100,
      }}
      rightIcon={rightIcon || null}
      errorMessage={error || null}
      {...props}
    />
  );
}
