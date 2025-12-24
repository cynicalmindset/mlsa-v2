import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Loading from "./loading";

type ButtonProps = {
  color?: string;
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
  buttonstyle?: any;
  textstyle?: any;
};

const Button = ({
  buttonstyle,
  textstyle,
  title = "",
  onPress = () => {},
  loading = false,
  hasShadow = true,
}: ButtonProps) => {
  const shadowStyle = {
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonstyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textstyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.green,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.xl,
    //paddingHorizontal: wp(6),
  },
  text: {
    fontSize: hp(2),
    color: "white",
    fontWeight: "500",
  },
});
