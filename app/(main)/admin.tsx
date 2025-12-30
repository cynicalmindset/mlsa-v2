import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import React from "react";
import { StyleSheet, View } from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const Admin = () => {
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View
        style={{
          marginHorizontal: hp(3),
          marginVertical: wp(2),
        }}
      >
        <Header title="Admin Pannel" showavatar={true} />
      </View>
    </ScreenWrapper>
  );
};

export default Admin;

const styles = StyleSheet.create({});
