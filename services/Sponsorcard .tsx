import { hp } from "@/helpers/common";
import React from "react";
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
//const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
import { supabaseUrl } from "@/constants";

const Sponsorcard = ({ item }: { item: any }) => {
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
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        handleRegister();
      }}
      style={{
        alignItems: "center",
        marginRight: 20,
        // justifyContent: "space-between",
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
