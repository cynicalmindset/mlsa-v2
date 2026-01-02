import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { fetchEventById } from "@/services/EventService";
import { getuserImagesrc } from "@/services/imageService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const insert = useSafeAreaInsets;
const EventDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getEvent();
  }, [id]);

  const getEvent = async () => {
    setLoading(true);
    const res = await fetchEventById(id);
    if (res.success) {
      setEvent(res.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Event not found
        </Text>
      </View>
    );
  }

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View
        style={{
          flex: 1,
          marginHorizontal: wp(3),
        }}
      >
        <View style={{ marginBottom: 6 }}>
          <Header title={event.title} showavatar={true} />
        </View>
        <ScrollView
          style={{
            backgroundColor: theme.colors.primary,
            marginBottom: hp(12),
          }}
        >
          {/* POSTER */}
          <View
            style={{
              alignItems: "center",
              marginTop: hp(2),
              borderRadius: theme.radius.xxl,
            }}
          >
            <Image
              source={{ uri: getuserImagesrc(event.poster) }}
              style={{
                width: "90%",
                height: hp(65),
                borderRadius: theme.radius.xxl,
                elevation: 6,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.18,
                shadowRadius: 10,
                shadowColor: "gray",
              }}
              resizeMode="cover"
            />
          </View>

          {/* CONTENT */}
          <View style={{ padding: hp(1) }}>
            <View
              style={{
                alignItems: "center",
                marginTop: hp(2),
                //borderColor: theme.colors.lightPrimary,
                // borderWidth: 2,
                padding: 4,
                justifyContent: "center",
                borderRadius: theme.radius.xxl,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: hp(3),
                  fontWeight: "700",
                  //marginBottom: hp(1),
                  padding: 4,
                }}
              >
                {event.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Icon
                name="location"
                size={18}
                //strokeWidth={2}
                style={{ color: theme.colors.offwhite }}
              /> */}
              <Text
                style={{
                  color: "white",
                  opacity: 0.7,
                  marginTop: hp(1),
                  fontSize: hp(1.7),
                }}
              >
                {event.location}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                gap: hp(4),
                backgroundColor: theme.colors.lightPrimary,
                //marginHorizontal: hp(1),
                marginTop: hp(3),
                borderRadius: theme.radius.xxl,
                padding: hp(4),
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: theme.colors.offwhite,
                    fontSize: hp(4),
                    alignContent: "center",
                  }}
                >
                  Details Card
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
                  marginTop: hp(2),
                  lineHeight: hp(2.4),
                }}
              >
                {event.description}
              </Text>
            </View>
            <View
              style={{
                //flexDirection: "column",
                gap: hp(4),
                backgroundColor: theme.colors.lightPrimary,
                //marginHorizontal: hp(1),
                marginTop: hp(3),
                borderRadius: theme.radius.xxl,
                padding: hp(2),
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", opacity: 0.8 }}>
                🗓 {new Date(event.start_time).toDateString()} –{" "}
                {new Date(event.end_time).toDateString()}
              </Text>
            </View>
          </View>
        </ScrollView>
        <Button title="Register Now" buttonstyle={styles.btn} />
      </View>
    </ScreenWrapper>
  );
};

export default EventDetails;
const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: hp(4),
    left: 0,
    right: 0,
  },
  icon: {
    alignItems: "center",
    color: "white+",
  },
});
