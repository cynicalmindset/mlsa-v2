import gang from "@/assets/illustration/gang.jpeg";
import logo from "@/assets/illustration/Group_5.png";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
          marginHorizontal: hp(2),
          alignItems: "center",
          justifyContent: "space-between",
          gap: hp(3),
        }}
      >
        {/* HERO IMAGE */}
        <View
          style={{
            marginTop: hp(2),
            //backgroundColor: "white",
            height: hp(20),
            width: "100%",
          }}
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: theme.radius.xxl,
            }}
            source={gang}
          ></Image>
        </View>

        <Text
          style={{
            color: theme.colors.offwhite,
            fontSize: hp(1),
            marginTop: -hp(2),
          }}
        >
          Former Members of MLSA 2020
        </Text>

        {/* MLSA TITLE WITH LOGO */}
        <View
          style={{
            //backgroundColor: "white",
            flexDirection: "row",
            marginHorizontal: hp(2),
            gap: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={logo}
            style={{
              height: hp(4),
              width: wp(6),
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: hp(2.1),
              fontWeight: "600",
            }}
          >
            Microsoft Student Learn Ambessador
          </Text>
        </View>

        {/* ABOUT FALNA DHIMKANA */}
        <View>
          <Text style={{ color: "white", fontSize: hp(2) }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
            diam laoreet, tincidunt tortor ut, porttitor neque. Nam lacinia
            pharetra ante, id elementum ipsum auctor nec. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Duis non neque dui. Nam porta lacinia augue ut pellentesque. Morbi
            eget eros erat. Proin efficitur, risus quis vestibulum vestibulum,
            nulla est mollis sapien, nec bibendum arcu augue sed nibh. Cras sed
            ante arcu. Quisque maximus dictum libero et pretium. Vivamus
            pulvinar odio sed enim semper, ac aliquam sem venenatis. Sed
            suscipit nisl et ligula aliquam, a rutrum dui interdum. Integer sed
            est neque. Integer faucibus ultricies neque, a rutrum erat ultrices
            vel. Donec mauris lorem, gravida vel tempor ac, maximus eget libero.
            Aliquam erat volutpat.
          </Text>
        </View>

        <Button title="Visit Our Website" buttonstyle={styles.btn} />
      </View>
    </ScreenWrapper>
  );
};

export default Society;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
  },
});
