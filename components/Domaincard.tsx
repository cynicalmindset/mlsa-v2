import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Domaincard = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <Pressable
      style={styles.container}
      key={item.id}
      onPress={() => {
        router.push({
          pathname: "/domains/[id]",
          params: { id: item.id },
        });
      }}
    >
      <Image
        source={{ uri: getuserImagesrc(item.image) }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

export default Domaincard;

const styles = StyleSheet.create({
  image: {
    height: hp(25),
    width: hp(18),
    //resizeMode: "cover",
    borderRadius: theme.radius.xl,
    // marginRight: hp(3),
  },
  overlay: {
    position: "absolute",
    left: hp(1.2),
    bottom: hp(1.2),
    backgroundColor: "rgba(0,0,0,0.5)", // optional but recommended
    paddingHorizontal: hp(1),
    paddingVertical: hp(0.5),
    borderRadius: theme.radius.sm,
  },
  name: {
    color: "white",
    fontSize: hp(1.8),
    fontWeight: "600",
  },
  container: {
    position: "relative",
    marginRight: hp(3),
  },
});
