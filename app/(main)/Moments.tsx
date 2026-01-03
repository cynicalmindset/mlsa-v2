import Header from "@/components/Header";
import Postcard from "@/components/Postcard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { fetchPost } from "@/services/PostService";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
//import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const AddSponsors = () => {
  const insert = useSafeAreaInsets();
  const [post, setpost] = useState();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    let res = await fetchPost();
    console.log("Postssss", res.data);
    if (res.success && Array.isArray(res.data)) {
      setpost([...res.data]);
    }
  };
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Header title="Core Memories" showavatar={true} />
        <View
          style={{
            flexDirection: "column",
            gap: hp(4),
          }}
        >
          <FlatList
            data={post}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: wp(4),
              paddingBottom: hp(12),
            }}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Postcard item={item} />}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddSponsors;

const styles = StyleSheet.create({});
