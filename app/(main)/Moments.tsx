import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const AddSponsors = () => {
  const insert = useSafeAreaInsets();
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Header title="Core Memories" showavatar={true} />
      </View>
    </ScreenWrapper>
  );
};

export default AddSponsors;

const styles = StyleSheet.create({});
