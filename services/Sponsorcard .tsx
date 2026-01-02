import { hp } from "@/helpers/common";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
import { supabaseUrl } from "@/constants";

const Sponsorcard = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {}}
      style={{
        alignItems: "center",
        marginRight: 20,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          source={{
            uri: `${supabaseUrl}/storage/v1/object/public/uploads/${item.logo}`,
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      <Text
        style={{
          marginTop: hp(1.5),
          fontSize: 12,
          color: "#fff",
          textAlign: "center",
          maxWidth: 70,
          opacity: 0.7,
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Sponsorcard;

const styles = StyleSheet.create({});
