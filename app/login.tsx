import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logo from "../assets/illustration/Group 5.png";
import image from "../assets/illustration/Rectangle-1.png";

const Login = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image source={logo} style={styles.logo}></Image>
          <Image source={image} style={styles.image}></Image>
        </View>
        <Text style={styles.tagline}>
          Hey,{"\n"}Welcome{"\n"}Back
        </Text>
        <View style={styles.inputcontainer}>
          <Text style={styles.lable}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="241@kiit.ac.in"
            placeholderTextColor={theme.colors.offwhite}
          ></TextInput>
          <Text style={styles.lable}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="xxxxxxxx"
            placeholderTextColor={theme.colors.offwhite}
          ></TextInput>
          <Button title="Start Exploring!" buttonstyle={styles.button}></Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footertxt}>Don't have any Account ?</Text>
          <Pressable
            onPress={() => {
              router.navigate("/register");
            }}
          >
            <Text style={styles.log}>Register Now</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  logo: {
    height: hp(10),
    width: hp(8),
    resizeMode: "contain",
    marginBottom: hp(10),
    paddingHorizontal: hp(6),
    // justifyContent: "flex-start",
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //backgroundColor: "white",
  },
  image: {
    width: hp(30),
    height: hp(30),
    opacity: 0.7,
  },
  tagline: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    color: "#e1e0e0ff",
    fontSize: hp(4.5),
    paddingHorizontal: hp(2),
    lineHeight: hp(7),
    fontWeight: "500",
  },
  inputcontainer: {
    flexDirection: "column",
    paddingHorizontal: hp(2),
    paddingBottom: hp(6),
    marginTop: "auto",
    gap: 4,
  },
  input: {
    backgroundColor: theme.colors.lightPrimary,
    height: hp(7),
    borderRadius: 10,
    paddingHorizontal: 20,
    opacity: 0.8,
    color: "white",
    //marginBottom: hp(2),
  },
  lable: {
    color: theme.colors.offwhite,
    paddingVertical: 10,
    marginHorizontal: hp(2),
  },
  button: {
    marginTop: hp(8),
  },
  footer: {
    flexDirection: "row",
    //paddingHorizontal: hp(2),
    // flex: 1,
    justifyContent: "center",
    marginBottom: hp(8),
    gap: 6,
  },
  log: {
    color: theme.colors.green,
    fontWeight: "400",
  },
  footertxt: {
    color: theme.colors.offwhite,
  },
});
