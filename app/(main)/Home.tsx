import logo from "@/assets/illustration/Group_5.png";
import project from "@/assets/illustration/project.jpeg";
import Avatar from "@/components/Avatar";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp, wp } from "@/helpers/common";
import { supabase } from "@/lib/supabase";
//import { useRoute } from "@react-navigation/native";
import funny from "@/assets/illustration/funny.jpeg";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//import { View } from "react-native-reanimated/lib/typescript/Animated";
import group from "@/assets/illustration/group.jpeg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const insert = useSafeAreaInsets();
  // const onpress = async () => {
  //   if (user?.role === "admin") {
  //     router.push("/admin");
  //   }
  // };
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
          <Pressable
            onPress={() => {
              if (user?.role === "admin") {
                router.push("/admin");
              } else {
                Alert.alert("Access denied");
              }
            }}
          >
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

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: hp(4),
          }}
        >
          {/* HEADER CARDs  */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={styles.headercard}>
                {/* //<Text>hi</Text> */}
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "column",
                    //alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={styles.left}>
                    <Text
                      style={{
                        fontSize: hp(4),
                        fontWeight: "500",
                        color: "white",
                        //marginBottom: 3,
                        //marginTop: -6,
                        //marginTop: 2,
                      }}
                    >
                      MLSA
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        opacity: 0.7,
                        fontSize: hp(1.5),
                        //marginBottom: 10,
                        marginTop: -3,
                      }}
                    >
                      Know how this all got Started!
                    </Text>
                    <Pressable
                      style={{
                        backgroundColor: "#552BD4",
                        padding: 8,
                        alignItems: "center",
                        borderRadius: theme.radius.sm,
                        borderCurve: "continuous",
                        maxWidth: 100,
                        marginTop: 4,
                      }}
                      onPress={() => {
                        router.navigate("/Society");
                      }}
                    >
                      <Text style={{ color: "white" }}>Details</Text>
                    </Pressable>
                  </View>

                  <View style={styles.right}>
                    <Image style={styles.headerimg} source={group}></Image>
                  </View>
                </View>
              </View>

              <View style={styles.headercard}>
                {/* //<Text>hi</Text> */}
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "column",
                    //alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={styles.left}>
                    <Text
                      style={{
                        fontSize: hp(3.5),
                        fontWeight: "500",
                        color: "white",
                        //marginBottom: 3,
                        //marginTop: -6,
                        //marginTop: 2,
                      }}
                    >
                      Gallery
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        opacity: 0.7,
                        fontSize: hp(1.5),
                        //marginBottom: 10,
                        marginTop: -3,
                      }}
                    >
                      Some of our most memorial moments
                    </Text>
                    <Pressable
                      style={{
                        backgroundColor: "#10a151ff",
                        padding: 8,
                        alignItems: "center",
                        borderRadius: theme.radius.sm,
                        borderCurve: "continuous",
                        maxWidth: 100,
                        marginTop: 4,
                      }}
                      onPress={() => {
                        router.navigate("/Society");
                      }}
                    >
                      <Text style={{ color: "white" }}>Explore</Text>
                    </Pressable>
                  </View>

                  <View style={styles.right}>
                    <Image style={styles.headerimg} source={funny}></Image>
                  </View>
                </View>
              </View>

              <View style={styles.headercard}>
                {/* //<Text>hi</Text> */}
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "column",
                    //alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={styles.left}>
                    <Text
                      style={{
                        fontSize: hp(3.5),
                        fontWeight: "500",
                        color: "white",
                        //marginBottom: 3,
                        //marginTop: -6,
                        //marginTop: 2,
                      }}
                    >
                      Projects
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        opacity: 0.7,
                        fontSize: hp(1.5),
                        //marginBottom: 10,
                        marginTop: -3,
                      }}
                    >
                      thats what make us {"\n"}Stand out!
                    </Text>
                    <Pressable
                      style={{
                        backgroundColor: "#ff8843ff",
                        padding: 8,
                        alignItems: "center",
                        borderRadius: theme.radius.sm,
                        borderCurve: "continuous",
                        maxWidth: 100,
                        marginTop: 4,
                      }}
                      onPress={() => {
                        router.navigate("/Society");
                      }}
                    >
                      <Text style={{ color: "white" }}>Explore</Text>
                    </Pressable>
                  </View>

                  <View style={styles.right}>
                    <Image style={styles.headerimg} source={project}></Image>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* SPONSORS */}
          <View
            style={{
              //backgroundColor: "white",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: hp(3),
                fontWeight: "700",
                marginLeft: hp(2),
              }}
            >
              Sponsors
            </Text>
          </View>

          {/* SPONSORS LOGO SECTIONS */}
        </View>
      </View>
      {/* BOTTOM BARRRRRRRRRRRRRRRR */}
      {/* <View
        style={{
          paddingBottom: insert.bottom,
          alignItems: "center",
          marginBottom: wp(4),
        }}
      >
        <Bottombar />
      </View> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: wp(2),
    backgroundColor: theme.colors.primary,
    marginHorizontal: hp(2),
    //alignItems: "center",
    //justifyContent:'center'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //backgroundColor: "white",
    //marginHorizontal: wp(4),
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
  headercard: {
    backgroundColor: "#09192D",
    height: hp(20),
    width: width - wp(10), // 👈 key change
    marginTop: hp(2),
    borderRadius: theme.radius.xxl,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
  },
  left: {
    flexDirection: "column",
    position: "absolute",
    //left: wp(5),
    width: "50%",
    //backgroundColor: "white",
    //justifyContent: "space-between",
    gap: 16,
  },
  right: {
    // width: "50%",
    //backgroundColor: "white",
    position: "absolute",
    height: hp(12),
    width: "50%",
    right: 0,
    top: hp(2.5),
    transform: [{ rotate: "2deg" }, { scale: 1.05 }],
  },
  headerimg: {
    height: "100%",
    width: "100%",
    borderRadius: theme.radius.lg,
    //resizeMode: "contain",
  },
});
