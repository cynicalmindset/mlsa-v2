import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SocietyDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={styles.container}>
        <Text style={styles.text}>{id} — Work in progress</Text>
      </View>
    </ScreenWrapper>
  );
};

export default SocietyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    marginHorizontal: hp(3),
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
