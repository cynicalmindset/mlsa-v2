import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "../assets/icons";

const Backbutton = ({
  size = 26,
  router,
}: {
  size?: number;
  router: ReturnType<typeof useRouter>;
}) => {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
      style={styles.button}
    >
      <Icon
        name="arrowLeft"
        strokeWidth={2.5}
        size={size}
        color={theme.colors.offwhite}
      />
    </Pressable>
  );
};

export default Backbutton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.lightPrimary,
  },
});
