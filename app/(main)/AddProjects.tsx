import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddProjects = () => {
  const insert = useSafeAreaInsets();
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View
        style={{
          marginHorizontal: hp(3),
          flex: 1,
        }}
      >
        {/* headerr */}
        <View style={{ marginTop: hp(2) }}>
          <Header title="Add Project" showavatar={true} />
        </View>

        {/* FORMMMMMMMM */}

        <View style={styles.input}>
          <TextInput
            placeholder="Enter Project Name"
            placeholderTextColor={theme.colors.offwhite}
            style={{ color: theme.colors.offwhite }}

            // value={name}
            // onChangeText={setName}
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
        <View style={styles.input}>
          <TextInput
            placeholder="Description"
            placeholderTextColor={theme.colors.offwhite}
            style={{ color: theme.colors.offwhite }}
            multiline
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Github link"
            placeholderTextColor={theme.colors.offwhite}
            style={{ color: theme.colors.offwhite }}
          />
        </View>
        <View
          style={{ paddingBottom: insert.bottom + hp(2), marginTop: "auto" }}
        >
          <Button title="Upload" />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddProjects;

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
    marginTop: hp(3),
  },
  icon: {
    color: theme.colors.offwhite,
  },
});
