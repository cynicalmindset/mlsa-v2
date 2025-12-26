import Icon from "@/assets/icons";
import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logo from "../assets/illustration/Group_5.png";
import image from "../assets/illustration/Rectangle-2.png";

const Register = () => {
  const emailref = useRef("");
  const nameref = useRef("");
  const passwordref = useRef("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const onsubmit = async () => {
    if (!nameref.current || !emailref.current || !passwordref.current) {
      Alert.alert("fill all details");
      return;
    }
    let email = emailref.current.trim();
    let name = nameref.current.trim();
    let password = passwordref.current.trim();
    setloading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    setloading(false);
    if (error) {
      Alert.alert("signup", error.message);
    }
  };
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image source={logo} style={styles.logo}></Image>
          <Image source={image} style={styles.image}></Image>
        </View>
        <Text style={styles.tagline}>Let's Get{"\n"}Started</Text>
        <View style={styles.inputcontainer}>
          <Text style={styles.lable}>Username</Text>
          {/* USERNAME */}
          <View style={styles.inputWrapper}>
            <Icon
              name={"user"}
              size={22}
              color={theme.colors.offwhite}
              strokeWidth={1.2}
            />
            <TextInput
              style={styles.input}
              placeholder="potato gupta"
              placeholderTextColor={theme.colors.offwhite}
              onChangeText={(value) => {
                nameref.current = value;
              }}
            ></TextInput>
          </View>
          {/* EMAIL */}
          <Text style={styles.lable}>Email</Text>
          <View style={styles.inputWrapper}>
            <Icon
              name={"mail"}
              size={22}
              color={theme.colors.offwhite}
              strokeWidth={1.2}
            />
            <TextInput
              style={styles.input}
              placeholder="241@kiit.ac.in"
              placeholderTextColor={theme.colors.offwhite}
              onChangeText={(value) => {
                emailref.current = value;
              }}
            ></TextInput>
          </View>
          {/* PASSWORD */}
          <Text style={styles.lable}>Password</Text>
          <View style={styles.inputWrapper}>
            <Icon
              name={"lock"}
              size={22}
              color={theme.colors.offwhite}
              strokeWidth={1.2}
            />
            <TextInput
              style={styles.input}
              placeholder="xxxxxxxx"
              secureTextEntry
              placeholderTextColor={theme.colors.offwhite}
              onChangeText={(value) => {
                passwordref.current = value;
              }}
            ></TextInput>
          </View>
          <Button
            title="Lets GO!!"
            buttonstyle={styles.button}
            onPress={onsubmit}
            loading={loading}
          ></Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footertxt}>Already have an Account ?</Text>
          <Pressable
            onPress={() => {
              router.navigate("/login");
            }}
          >
            <Text style={styles.log}>Login Now</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
    //marginHorizontal: hp(2),
  },
  button: {
    marginTop: hp(6),
  },
  footer: {
    flexDirection: "row",
    //paddingHorizontal: hp(2),
    // flex: 1,
    justifyContent: "center",
    marginBottom: hp(4),
    gap: 6,
  },
  log: {
    color: theme.colors.green,
    fontWeight: "400",
    marginBottom: hp(4),
  },
  footertxt: {
    color: theme.colors.offwhite,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.lightPrimary,
    height: hp(7),
    borderRadius: 10,
    paddingHorizontal: 16,
    opacity: 1,
  },
});
