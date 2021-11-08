import React from "react";
import { Block, Text } from "rn-ui-kits";

export default function Container({ children, style }) {
  return (
    <Block scroll>
      <Block padding={20} style={style}>
        {children}
      </Block>
    </Block>
  );
}
