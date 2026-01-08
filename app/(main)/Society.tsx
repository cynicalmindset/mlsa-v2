import gang from "@/assets/dummy/group1.jpg";
import logo from "@/assets/illustration/Group_5.png";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { fetchDomain } from "@/services/DomainService";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

const Society = () => {
  const [domians, setdomains] = useState([]);
  useEffect(() => {
    getdomain();
  }, []);
  const getdomain = async () => {
    let res = await fetchDomain();
    console.log("Domainsss", res.data);
    if (res.success && Array.isArray(res.data)) {
      setdomains([...res.data]);
    }
  };
  const insert = useSafeAreaInsets();
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      {/* HEADER */}
      <View style={{ marginHorizontal: hp(2), marginVertical: wp(2) }}>
        <Header title="Know us" showavatar={true} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: hp(2),
          paddingVertical: hp(2),
        }}
      >
        {/* HERO IMAGE */}
        <View
          style={{
            marginTop: hp(0.5),
            //backgroundColor: "white",
            height: hp(20),
            width: "100%",
            marginBottom: hp(4),
          }}
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: theme.radius.xxl,
            }}
            source={gang}
          ></Image>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: theme.colors.offwhite,
              fontSize: hp(1),
              marginTop: -hp(2),
              marginBottom: hp(3),
            }}
          >
            Members of MLSA 2023
          </Text>
        </View>

        {/* MLSA TITLE WITH LOGO */}
        <View
          style={{
            //backgroundColor: "white",
            flexDirection: "row",
            // marginHorizontal: hp(1),
            gap: 10,
            alignItems: "center",
            marginBottom: hp(2),
          }}
        >
          <Image
            source={logo}
            style={{
              height: hp(4),
              width: wp(6),
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: hp(2.1),
              fontWeight: "600",
            }}
          >
            Microsoft Student Learn Ambessador
          </Text>
        </View>

        {/* ABOUT FALNA DHIMKANA */}
        <View>
          <Text style={{ color: "white", fontSize: hp(2) }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
            diam laoreet, tincidunt tortor ut, porttitor neque. Nam lacinia
            pharetra ante, id elementum ipsum auctor nec. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Duis non neque dui. Nam porta lacinia augue ut pellentesque. Morbi
            eget eros erat. Proin efficitur, risus quis vestibulum vestibulum,
            nulla est mollis sapien, nec bibendum arcu augue sed nibh. Cras sed
            ante arcu. Quisque maximus dictum libero et pretium. Vivamus
            pulvinar odio sed enim semper, ac aliquam sem venenatis. Sed
            suscipit nisl et ligula aliquam, a rutrum dui interdum. Integer sed
            est neque. Integer faucibus ultricies neque, a rutrum erat ultrices
            vel. Donec mauris lorem, gravida vel tempor ac, maximus eget libero.
            Aliquam erat volutpat.
          </Text>
        </View>
        {/* MEMBERSSSSSSSSSSSS */}
        <View
          style={{
            alignItems: "center",
            marginTop: hp(4),
          }}
        >
          <Text style={{ color: "white", fontSize: hp(3), fontWeight: "500" }}>
            Our Domains
          </Text>
          {/* DOMAIN CARDSSSSSS */}

          <View></View>
        </View>
      </ScrollView>
      <View
        style={{ paddingBottom: insert.bottom + hp(1), alignItems: "center" }}
      >
        <Button title="Visit Our Website" buttonstyle={styles.btn} />
      </View>
    </ScreenWrapper>
  );
};

export default Society;

const styles = StyleSheet.create({
  btn: {
    width: "90%",
  },
});
