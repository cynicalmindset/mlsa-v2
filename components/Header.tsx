import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Backbutton from "./Backbutton";

interface HeaderProps {
  title: string;
  showbackbuttno: boolean;
  mb?: number;
}

const Header = ({ title, showbackbuttno = true, mb = 10 }: HeaderProps) => {
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showbackbuttno && (
        <View style={styles.back}>
          <Backbutton router={router} />
        </View>
      )}
      <Text style={styles.text}>{title || ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  back: {
    position: "absolute",
    left: 0,
  },
  text: {
    color: "white",
    fontWeight: "400",
    fontSize: 18,
  },
});
