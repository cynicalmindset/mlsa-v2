import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import React from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Contentcard = ({ item }: { item: any }) => {
  const handleRegister = async () => {
    if (!item?.website) {
      Alert.alert("Link not available", "Registration link not found.");
      return;
    }

    const supported = await Linking.canOpenURL(item.website);

    if (supported) {
      await Linking.openURL(item.website);
    } else {
      Alert.alert("Invalid link", "Cannot open this registration link.");
    }
  };
  return (
    <Pressable
      style={{ marginBottom: hp(6), marginRight: 15 }}
      onPress={handleRegister}
    >
      <View
        style={{
          padding: hp(1.5),
          flexDirection: "column",
          gap: hp(2),
          backgroundColor: "#09192D",
          borderRadius: theme.radius.xxl,
          maxWidth: hp(28),
          //maxHeight: hp(30),
          //minHeight: hp(29),
        }}
      >
        <Image
          source={{ uri: getuserImagesrc(item.image) }}
          style={styles.image}
        />
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default Contentcard;

const styles = StyleSheet.create({
  image: {
    height: hp(16),
    width: hp(25),
    resizeMode: "cover",
    borderRadius: theme.radius.xxl,
  },
  title: {
    fontSize: hp(2),
    marginBottom: hp(1),
    fontWeight: "400",
    color: "white",
  },
});
