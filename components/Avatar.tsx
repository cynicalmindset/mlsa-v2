import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

interface AvatarProps {
  uri: string;
  size?: number;
  rounded?: number;
  style?: object;
}

const Avatar = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {},
}: AvatarProps) => {
  return (
    <Image
      source={getuserImagesrc(uri)}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    ></Image>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.lightPrimary,
    borderWidth: 1,
  },
});
