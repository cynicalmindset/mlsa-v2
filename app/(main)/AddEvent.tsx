import Icon from "@/assets/icons";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import React from "react";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const AddEvent = () => {
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Header title="Add Event" showavatar={true} />
      </View>
      <ScrollView pagingEnabled showsHorizontalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: wp(4),
            marginVertical: hp(2),
            flexDirection: "column",
            gap: hp(3),
          }}
        >
          <View style={styles.input}>
            <TextInput
              placeholder="Enter Event Name"
              placeholderTextColor={theme.colors.offwhite}
              style={{ color: theme.colors.offwhite }}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.md,
                opacity: 0.6,
                flexDirection: "row",
                gap: hp(2),
              }}
            >
              <Icon name="image" strokeWidth={1.5} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputdes}>
            <TextInput
              placeholder="Enter Event Description"
              placeholderTextColor={theme.colors.offwhite}
              style={[{ color: theme.colors.offwhite }, styles.multilineInput]}
              multiline
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter Event Location"
              placeholderTextColor={theme.colors.offwhite}
              style={{ color: theme.colors.offwhite }}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  input: {
    padding: hp(1.2),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xl,
    color: theme.colors.offwhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    color: theme.colors.offwhite,
  },
  inputdes: {
    padding: hp(1.2),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xl,
    color: theme.colors.offwhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // height: hp(18),
  },
  multilineInput: {
    minHeight: hp(12),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xl,
    padding: hp(1.5),
    color: theme.colors.offwhite,
  },
});
