import { ResolveImage } from "../lib/image";
import React from "react";
import { View, Image } from "react-native";

interface IProps {
  url?: string,
  height: number;
  width: number;
  style?: any
}

export default function Avatar({ url, height, width, style }: IProps) {
  return (
    <View>
      <Image
        source={{
          uri: ResolveImage(
            url ?? "https://cdn.thinh.tech/avatar.png",
            width,
            height
          ),
        }}
        style={style}
      />
    </View>
  );
}
