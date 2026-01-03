import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import { fetchUserById } from "@/services/userService";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Postcard = ({ item }: { item: any }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (item?.user_id) fetchUser();
  }, [item.user_id]);

  const fetchUser = async () => {
    const res = await fetchUserById(item.user_id);
    setUser(res);
  };

  return (
    <View style={styles.card}>
      {user && (
        <View style={styles.header}>
          <Image
            source={{ uri: getuserImagesrc(user.image) }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user.name ?? user.email}</Text>
        </View>
      )}

      {/* 🔹 MEDIA (IMAGE / VIDEO) */}
      {item.media_url && (
        <View style={styles.mediaWrapper}>
          {item.media_type === "video" ? (
            <Video
              source={{ uri: getuserImagesrc(item.media_url) }}
              style={styles.media}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              isLooping
            />
          ) : (
            <Image
              source={{ uri: getuserImagesrc(item.media_url) }}
              style={styles.media}
              contentFit="contain"
            />
          )}
        </View>
      )}

      {/* 🔹 CAPTION */}
      {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
    </View>
  );
};

export default Postcard;
const styles = StyleSheet.create({
  card: {
    // marginHorizontal: wp(4),
    marginVertical: hp(1.5),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.lg,
    overflow: "hidden",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp(1.5),
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: wp(2),
  },

  username: {
    color: "white",
    fontWeight: "600",
    fontSize: hp(1.8),
  },

  mediaWrapper: {
    width: "100%",
    height: hp(35),
    backgroundColor: "#000",
  },

  media: {
    width: "100%",
    height: "100%",
  },

  caption: {
    color: "white",
    padding: hp(1.5),
    fontSize: hp(1.7),
    lineHeight: hp(2.2),
  },
});
