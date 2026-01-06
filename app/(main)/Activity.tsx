import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Activity = () => {
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(3) }}>
        <Header title="Activity" showavatar={true} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: theme.colors.offwhite }}>Work in Progress</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Activity;

const styles = StyleSheet.create({});
