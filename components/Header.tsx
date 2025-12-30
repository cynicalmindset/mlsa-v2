import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp } from "@/helpers/common";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";
import Backbutton from "./Backbutton";

interface HeaderProps {
  title: string;
  showbackbuttno: boolean;
  mb?: number;
  showavatar: boolean;
  user?: { image: string };
}

const Header = ({
  title,
  showbackbuttno = true,
  mb = 10,
  showavatar = false,
}: //user,
HeaderProps) => {
  const { setAuth, user } = useAuth();
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showbackbuttno && (
        <View style={styles.back}>
          <Backbutton router={router} />
        </View>
      )}

      <Text style={styles.text}>{title || ""}</Text>
      {showavatar && (
        <Pressable
          style={{
            position: "absolute",
            right: 0,
          }}
          onPress={() => {
            router.navigate("/Profile");
          }}
        >
          <Avatar
            uri={user?.image || ""}
            size={hp(4.3)}
            rounded={theme.radius.sm}
          />
        </Pressable>
      )}
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
