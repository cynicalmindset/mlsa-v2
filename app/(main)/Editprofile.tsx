import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp, wp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import { updateuser } from "@/services/userService";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  Alert,
  //Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const Editprofile = () => {
  const router = useRouter();

  const [loading, setloading] = useState(false);

  const onsubmit = async () => {
    let userData = { ...user };
    let { name, phone, image, bio, address } = userData;
    if (!name || !phone || !address || !bio) {
      Alert.alert("fill all shi dear");
      return;
    }
    setloading(true);
    const res = await updateuser(currentUser?.id, userData);
    setloading(false);
    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    }
  };

  const imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.7,
    });
    if (!result.canceled) {
      setuser({ ...user, image: result.assets[0].uri });
    }
  };

  const { user: currentUser, setUserData } = useAuth();

  const [user, setuser] = useState<{
    name: string;
    phone: string;
    image: { uri: string } | string | null;
    bio: string;
    address: string;
  }>({
    name: "",
    phone: "",
    image: null,
    bio: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setuser({
        name: currentUser.name || "",
        phone: currentUser.phone || "",
        image: currentUser.image || null,
        bio: currentUser.bio || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  const imageSource =
    user.image && typeof user.image == "object"
      ? (user.image as { uri: string }).uri
      : getuserImagesrc(user.image as string);

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={styles.container}>
        <Header title="Edit Profile" />
        <View style={styles.form}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={imageSource}></Image>
            <Pressable style={styles.camera} onPress={imagePick}>
              <Icon
                name="camera"
                size={20}
                strokeWidth={2}
                color={theme.colors.offwhite}
              />
            </Pressable>
          </View>

          <Text style={{ fontSize: hp(1.5), color: theme.colors.offwhite }}>
            Please Fill all Details
          </Text>

          <View style={{ flexDirection: "column", width: "100%", gap: 10 }}>
            <Text style={styles.lable}>username</Text>
            <TextInput
              style={styles.input}
              placeholder="update username"
              placeholderTextColor={theme.colors.offwhite}
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.nativeEvent.text })}
            ></TextInput>
          </View>

          <View style={{ flexDirection: "column", width: "100%", gap: 10 }}>
            <Text style={styles.lable}>Bio</Text>
            <TextInput
              style={styles.input}
              placeholder="update bio"
              placeholderTextColor={theme.colors.offwhite}
              value={user.bio}
              onChange={(e) => setuser({ ...user, bio: e.nativeEvent.text })}
            ></TextInput>
          </View>

          <View style={{ flexDirection: "column", width: "100%", gap: 10 }}>
            <Text style={styles.lable}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="update Address"
              placeholderTextColor={theme.colors.offwhite}
              value={user.address}
              onChange={(e) =>
                setuser({ ...user, address: e.nativeEvent.text })
              }
            ></TextInput>
          </View>

          <View style={{ flexDirection: "column", width: "100%", gap: 10 }}>
            <Text style={styles.lable}>Phone Np.</Text>
            <TextInput
              style={styles.input}
              placeholder="update Phone no."
              placeholderTextColor={theme.colors.offwhite}
              value={user.phone}
              onChange={(e) => setuser({ ...user, phone: e.nativeEvent.text })}
            ></TextInput>
          </View>

          <Button
            title="Save"
            loading={loading}
            onPress={onsubmit}
            buttonstyle={{ width: "100%" }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Editprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    marginHorizontal: wp(4),
  },
  form: {
    padding: hp(4),
    flexDirection: "column",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    height: hp(15),
    width: wp(30),
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
    borderWidth: 2,
    //borderColor: "#a9a9a9ff",
    borderCurve: "continuous",
  },
  camera: {
    backgroundColor: theme.colors.lightPrimary,
    padding: 7,
    borderRadius: 50,
    borderCurve: "continuous",
    position: "absolute",
    bottom: 0,
    right: -9,
    //opacity: 0.7,
  },
  input: {
    backgroundColor: theme.colors.lightPrimary,
    height: hp(6),
    width: "100%",
    color: theme.colors.offwhite,
    paddingHorizontal: 20,
    borderWidth: 1,
    //borderColor: "#3b3b3bff",
    borderRadius: 15,
    borderCurve: "continuous",
    opacity: 0.7,
  },
  lable: {
    color: theme.colors.offwhite,
    opacity: 0.9,
    marginLeft: 10,
  },
});
