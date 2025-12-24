import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/illustration/Group 5.png";
import hero from "../assets/illustration/Rectangle.png";
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={styles.container}>
        {/* tops section */}
        <View style={styles.topsec}>
          <Image source={logo} style={styles.logo}></Image>
          <Image source={hero} style={styles.heroImage}></Image>
        </View>
        <View style={styles.middle}>
          <Text style={styles.textmain}>
            Innovate{"\n"}Create{"\n"}Inspire !
          </Text>
        </View>
        <Text style={styles.subtitle}>
          Never miss our society event{"\n"}again
        </Text>

        <View style={styles.button}>
          <Button
            title="Log in"
            onPress={() => {
              router.navigate("/login");
            }}
          ></Button>
          <Button
            title="Register"
            buttonstyle={styles.btn}
            onPress={() => {
              router.navigate("/register");
            }}
          ></Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    //marginTop: -hp(2),
  },
  topsec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  logo: {
    width: wp(16),
    height: wp(16),
    resizeMode: "contain",
    //marginLeft: hp(2),
    marginBottom: hp(12),
  },
  heroImage: {
    width: wp(80),
    height: hp(50),
    //resizeMode: "contain",
    opacity: 0.7,

    // alignSelf: "flex-end",
    //justifyContent: "flex-end",

    //marginRight: -hp(2),
  },
  middle: {
    position: "absolute",
    top: "29%",
    left: 0,
    right: 0,
    paddingHorizontal: wp(6),
    // backgroundColor: "white",
  },
  textmain: {
    color: "#ecececff",
    //paddingHorizontal: hp(3),
    lineHeight: hp(7),
    fontWeight: "500",
    fontSize: hp(4.5),
  },
  subtitle: {
    color: theme.colors.offwhite,
    fontSize: hp(2),
    paddingHorizontal: wp(6),
    paddingTop: hp(10),
    fontWeight: "400",
  },
  button: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(8),
    marginTop: "auto",
    gap: hp(2),
  },
  btn: {
    backgroundColor: theme.colors.blue,
  },
});
