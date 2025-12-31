import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const Admin = () => {
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View
        style={{
          marginHorizontal: hp(3),
          marginVertical: wp(2),
        }}
      >
        <Header title="Admin Pannel" showavatar={true} />

        {/* CONTROLSSSS */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: hp(4),
            marginTop: hp(10),
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              gap: hp(4),
            }}
          >
            <Pressable
              style={{
                height: hp(12),
                width: hp(12),
                backgroundColor: theme.colors.lightPrimary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radius.xxl,
              }}
            >
              <Text style={{ color: "white", opacity: 0.6 }}>Attendance</Text>
            </Pressable>
            <Pressable
              style={{
                height: hp(12),
                width: hp(12),
                backgroundColor: theme.colors.lightPrimary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radius.xxl,
              }}
            >
              <Text style={{ color: "white", opacity: 0.6 }}>Event</Text>
            </Pressable>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              gap: hp(4),
            }}
          >
            <Pressable
              style={{
                height: hp(12),
                width: hp(12),
                backgroundColor: theme.colors.lightPrimary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radius.xxl,
              }}
            >
              <Text style={{ color: "white", opacity: 0.6 }}>Gallery</Text>
            </Pressable>
            <Pressable
              style={{
                height: hp(12),
                width: hp(12),
                backgroundColor: theme.colors.lightPrimary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radius.xxl,
              }}
            >
              <Text style={{ color: "white", opacity: 0.6 }}>Sponsors</Text>
            </Pressable>
          </View>
        </View>

        {/* BANNER IAMGE */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp(8),
          }}
        >
          <Text
            style={{
              color: theme.colors.offwhite,
              fontSize: hp(1.4),
              opacity: 0.6,
            }}
          >
            App still in construction many shit needs work
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Admin;

const styles = StyleSheet.create({});
