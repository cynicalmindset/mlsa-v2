import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Bottombar = () => {
  const insert = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 6,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        borderRadius: 14,
        flexDirection: "row",
        width: "55%",
      }}
    >
      <View
        style={{
          height: hp(6),
          width: hp(6),
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
        }}
      >
        <Icon name="home" size={26} />
      </View>

      <View
        style={{
          height: hp(6),
          width: hp(6),
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
        }}
      >
        <Icon name="video" size={26} />
      </View>

      <View
        style={{
          height: hp(6),
          width: hp(6),
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
        }}
      >
        <Icon name="user" size={26} />
      </View>
    </View>
  );
};

export default Bottombar;

const styles = StyleSheet.create({});
