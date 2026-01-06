import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const Projectcard = ({ item }: { item: any }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: getuserImagesrc(item.image) }}
        style={styles.image}
        contentFit="cover"
      />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Button title="Github" buttonstyle={styles.btn} />
    </View>
  );
};

export default Projectcard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xxl,
    padding: hp(1.5),
    marginBottom: hp(3),
  },
  image: {
    height: hp(22),
    width: "100%",
    borderRadius: theme.radius.xl,
  },
  title: {
    marginTop: hp(2),
    fontSize: hp(2.2),
    fontWeight: "600",
    color: theme.colors.offwhite,
  },
  description: {
    marginTop: hp(2),
    fontSize: hp(1.7),
    color: theme.colors.offwhite,
    opacity: 0.8,
  },
  btn: {
    marginTop: hp(2),
    //marginBottom: hp(0.5),
  },
});
