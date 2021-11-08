import React, { useState } from "react";
import { Block, Image, Text } from "rn-ui-kits";

export default function ImageComponent({ src }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };
  const onError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  return (
    <Block marginTop={10}>
      {isLoading && (
        <Text paddingLeft="35%" paddingTop="5%">
          Loading image
        </Text>
      )}
      <Image
        source={{ uri: src }}
        resizeMode="cover"
        onLoadEnd={onLoadEnd}
        onError={onError}
        onLoadStart={onLoadStart}
        style={{
          alignSelf: "center",
          width: 150,
          height: 150,
          borderRadius: 100,
        }}
      />
    </Block>
  );
}
