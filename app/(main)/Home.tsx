import logo from "@/assets/illustration/Group_5.png";
import Avatar from "@/components/Avatar";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp, wp } from "@/helpers/common";
import { supabase } from "@/lib/supabase";
//import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const Home = () => {
  const router = useRouter();
  const onpress = () => {};
  const { setAuth, user } = useAuth();
  const onlogout = async () => {
    setAuth(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("cant sign out ehh wtf");
    }
  };
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={onpress}>
            <Image source={logo} style={styles.headerlogo} />
          </Pressable>
          <Text style={styles.text}>Home</Text>
          <Pressable
            onPress={() => {
              router.navigate("/Profile");
            }}
          >
            <Avatar
              uri={user?.image}
              size={hp(4.3)}
              rounded={theme.radius.sm}
            />
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: wp(2),
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //backgroundColor: "white",
    marginHorizontal: wp(4),
  },
  headerlogo: {
    height: hp(8),
    width: wp(10),
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontWeight: "400",
    fontSize: 18,
  },
  avatar: {
    height: hp(12),
    width: wp(12),
  },
});
