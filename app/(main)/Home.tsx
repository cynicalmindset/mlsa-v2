import logo from "@/assets/illustration/Group_5.png";
import project from "@/assets/illustration/project.jpeg";
import Avatar from "@/components/Avatar";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp, wp } from "@/helpers/common";
//import { useRoute } from "@react-navigation/native";
import funny from "@/assets/illustration/funny.jpeg";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//import { View } from "react-native-reanimated/lib/typescript/Animated";
import group from "@/assets/illustration/group.jpeg";
import Eventcards from "@/components/Eventcards";
import { fetchEvents } from "@/services/EventService";
import Sponsorcard from "@/services/Sponsorcard ";
import { fetchSponsors } from "@/services/Sponsorservice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
const { width } = Dimensions.get("window");

const Home = () => {
  //const insert = useSafeAreaInsets()
  const router = useRouter();
  const insert = useSafeAreaInsets();
  // const onpress = async () => {
  //   if (user?.role === "admin") {
  //     router.push("/admin");
  //   }
  // };
  const { setAuth, user } = useAuth();
  // const onlogout = async () => {
  //   setAuth(false);
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     Alert.alert("cant sign out ehh wtf");
  //   }
  // };

  // const dummyEvents = [
  //   {
  //     title: "MLSA Orientation Meetup",
  //     description:
  //       "An introductory session for new members to understand MLSA, its vision, and upcoming opportunities.",
  //     poster: "https://picsum.photos/seed/event1/600/800",
  //     location: "KIIT Campus, Auditorium Hall",
  //     start_time: "2026-01-10T10:00:00",
  //     end_time: "2026-01-10T12:00:00",
  //     is_active: true,
  //     website: "https://mlsa.community/orientation",
  //   },
  //   {
  //     title: "UI/UX Design Workshop",
  //     description:
  //       "A hands-on workshop focused on design systems, spacing, grids, and real-world UX practices.",
  //     poster: "https://picsum.photos/seed/event2/600/800",
  //     location: "Design Lab, KIIT",
  //     start_time: "2026-01-15T14:00:00",
  //     end_time: "2026-01-15T17:00:00",
  //     is_active: true,
  //     website: "https://mlsa.community/uiux",
  //   },
  //   {
  //     title: "Hackathon: Build for Impact",
  //     description:
  //       "A 24-hour hackathon where teams build solutions for real-world problems using modern tech stacks.",
  //     poster: "https://picsum.photos/seed/event3/600/800",
  //     location: "Innovation Hub, KIIT",
  //     start_time: "2026-01-20T09:00:00",
  //     end_time: "2026-01-21T09:00:00",
  //     is_active: true,
  //     website: "https://mlsa.community/hackathon",
  //   },
  //   {
  //     title: "Tech Talk: AI in 2026",
  //     description:
  //       "An expert-led session discussing the future of artificial intelligence and its real-world impact.",
  //     poster: "https://picsum.photos/seed/event4/600/800",
  //     location: "Online (Live Session)",
  //     start_time: "2026-01-25T18:00:00",
  //     end_time: "2026-01-25T19:30:00",
  //     is_active: true,
  //     website: "https://mlsa.community/ai-talk",
  //   },
  //   {
  //     title: "Open Source Contribution Day",
  //     description:
  //       "A collaborative event focused on contributing to open-source projects and learning Git/GitHub workflows.",
  //     poster: "https://picsum.photos/seed/event5/600/800",
  //     location: "Computer Lab 3, KIIT",
  //     start_time: "2026-01-30T11:00:00",
  //     end_time: "2026-01-30T16:00:00",
  //     is_active: true,
  //     website: "https://mlsa.community/opensource",
  //   },
  // ];

  // const dummySponsors = [
  //   { id: "1", name: "Lighthouse", logo: require("@/assets/dummy/logo1.jpeg") },
  //   {
  //     id: "2",
  //     name: "Pixel Studio",
  //     logo: require("@/assets/dummy/logo2.jpeg"),
  //   },
  //   { id: "3", name: "Studio", logo: require("@/assets/dummy/logo3.jpeg") },
  //   { id: "4", name: "Spark AI", logo: require("@/assets/dummy/logo4.jpeg") },
  //   { id: "5", name: "Potato", logo: require("@/assets/dummy/logo5.jpeg") },
  // ];

  //sponsors fetching here
  const [sponsor, setsponsor] = useState([]);
  useEffect(() => {
    getSponsors();
  }, []);
  const getSponsors = async () => {
    let res = await fetchSponsors();
    console.log("sponsors", res.data);
    if (res.success && Array.isArray(res.data)) {
      setsponsor([...res.data]);
    }
  };

  //event fetching
  const [event, setevent] = useState([]);
  useEffect(() => {
    getevents();
  }, []);
  const getevents = async () => {
    let result = await fetchEvents();
    console.log("eventssssssssss", result);
    if (result.success && Array.isArray(result.data)) {
      setevent([...result.data]);
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
            gap: hp(3),
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
                        router.navigate("/Moments");
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
                        router.navigate("/Projects");
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
                fontWeight: "600",
                marginLeft: hp(0.7),
              }}
            >
              Sponsors
            </Text>
          </View>

          {/* SPONSORS LOGO SECTIONS */}

          <FlatList
            data={sponsor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: wp(3), paddingLeft: 0 }}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Sponsorcard item={item} />}
          />

          {/* EVENTSSSSSSSSSSS CARDSDSSSSSSS */}
          <FlatList
            data={event}
            horizontal
            showsHorizontalScrollIndicator={false}
            // showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingRight: wp(6),
              paddingLeft: 0,
            }}
            removeClippedSubviews={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Eventcards item={item} />}
          />
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
    width: width - wp(10),
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

//kya laawde mera code dekh ke judge kr rha? aysa maru gai na betichod gand fat ke hath me aajyegi 7 rang ka mut doge lawde suwar ki aulad
