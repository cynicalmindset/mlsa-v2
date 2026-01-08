import { hp, wp } from "@/helpers/common";

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";
import { supabaseUrl } from "@/constants";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";

const Eventcards = ({ item }: { item: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        router.push({
          pathname: "/event/[id]",
          params: { id: item.id },
        });
      }}
      style={{
        alignItems: "center",
        marginRight: 20,
        width: wp(48),
        marginBottom: hp(3),
        // justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: wp(48),
          //backgroundColor: "white",
          height: hp(35),
          marginTop: hp(2),
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: theme.radius.xl,
        }}
      >
        <Image
          source={{
            uri: `${supabaseUrl}/storage/v1/object/public/uploads/${item.poster}`,
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          marginTop: hp(3),
          fontSize: hp(2),
          color: "white",
          textAlign: "center",
          maxWidth: wp(40),
          fontWeight: "600",
          height: hp(5),
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Eventcards;

const styles = StyleSheet.create({});
