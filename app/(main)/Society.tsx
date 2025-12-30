import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import React from "react";
import { StyleSheet, View } from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const Society = () => {
  return (
    <ScreenWrapper bg={theme.colors.primary}>
        {/* HEADER */}
      <View style={{ marginHorizontal: hp(2), marginVertical: wp(2) }}>
        <Header title="Know us" showavatar={true} />
      </View>


      <View
        style={{
          flex: 1,
          marginHorizontal: wp(3),
          marginVertical: hp(2),
          alignItems: "center",
        }}
      >
        <Button buttonstyle={styles.btn} title="Visit our Website" />
      </View>
    </ScreenWrapper>
  );
};

export default Society;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: hp(2),
    width: "90%",
  },
});
