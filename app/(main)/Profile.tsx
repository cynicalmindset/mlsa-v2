import Icon from "@/assets/icons";
import Avatar from "@/components/Avatar";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp, wp } from "@/helpers/common";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
//import { View } from "react-native-reanimated/lib/typescript/Animated";
import Pannel from "@/assets/illustration/Gradient.jpeg";
import Button from "@/components/Button";

const Profile = () => {
  const onlogout = async () => {
    setAuth(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("cant sign out ehh wtf");
    }
  };
  const handellogout = async () => {
    Alert.alert("Confirm", "Are you sure you want to logout ?", [
      {
        text: "Cancle",
        onPress: () => {
          Alert.alert("good boii");
        },
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: onlogout,
        style: "destructive",
      },
    ]);
  };
  const { user, setAuth } = useAuth();
  const router = useRouter();
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <UserHeader
        user={user}
        router={router}
        handellogout={handellogout}
      ></UserHeader>
    </ScreenWrapper>
  );
};

const UserHeader = ({
  user,
  router,
  handellogout,
}: {
  user: any;
  router: any;
  handellogout: () => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: wp(4),
        //paddingVertical:hp()
      }}
    >
      <View>
        <Header title="Profile" mb={50} />
        <TouchableOpacity style={styles.logout} onPress={handellogout}>
          <Icon name="logout" color={theme.colors.offwhite} />
        </TouchableOpacity>
      </View>
      {/* AVATAR IMAGE */}
      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarcontainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Pressable
              style={styles.editicon}
              onPress={() => router.push("Editprofile")}
            >
              <Icon
                name="edit"
                strokeWidth={2.5}
                size={20}
                color={theme.colors.offwhite}
              />
            </Pressable>
          </View>

          {/* USERNAME AND ALL DETAILS STUFF */}

          <View style={{ alignItems: "center", gap: 4, marginBottom: hp(3) }}>
            <Text style={styles.username}>{user && user.name}</Text>
            {user && user.bio && (
              <Text style={styles.bio}>{user && user.bio}</Text>
            )}
          </View>
          {/* EMAIl */}

          <View style={styles.emailbox}>
            <Icon name="mail" size={20} color={theme.colors.offwhite} />
            <Text style={styles.text}>{user && user.email}</Text>
          </View>

          {/* ROLES PANNEL */}
          <View style={styles.pannel}>
            <Image source={Pannel} style={styles.image}></Image>
            <View style={styles.overlay}>
              <Text style={styles.role}>{user && user.role}</Text>
            </View>
          </View>
          {/* ACTIVITY BUTTON */}
          <View style={styles.button}>
            <Button
              title="Activity"
              onPress={() => {
                router.navigate("/Activity");
              }}
            />
          </View>
          {/* FOOTER */}
          <View style={styles.footer}>
            <Text
              style={{
                color: theme.colors.offwhite,
                fontSize: 10,
                opacity: 0.4,
              }}
            >
              this app is in beta mode , for bugs contact
              yashraj.02594656@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },

  logout: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.lightPrimary,
    marginHorizontal: wp(2),
  },
  avatarcontainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editicon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: theme.colors.lightPrimary,
    // color: theme.colors.offwhite,
    //sshadowColor: "gray",
    //shadowOffset: { width: 0, height: 4 },
    //shadowOpacity: 0.4,
    //shadowRadius: 5,
    elevation: 7,
  },
  username: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.offwhite,
  },
  bio: {
    fontSize: hp(1.7),
    color: theme.colors.offwhite,
    opacity: 0.6,
    fontWeight: "400",
    marginTop: hp(2),
    paddingHorizontal: wp(10),
  },
  emailbox: {
    flexDirection: "row",
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.lg,
    padding: hp(2),
    gap: 15,
    marginTop: hp(2),
  },
  text: {
    color: theme.colors.offwhite,
  },
  pannel: {
    height: hp(20),
    width: wp(90),
    //alignItems: "center",
    marginTop: 20,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: theme.radius.xxl,
    //resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  role: {
    color: "white",
    fontSize: hp(3),
    fontWeight: "700",
  },
  button: {
    marginTop: hp(2),
  },
  footer: { alignItems: "center", marginTop: hp(10) },
});
