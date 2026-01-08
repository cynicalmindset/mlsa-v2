import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { supabase } from "@/lib/supabase";
import { getuserImagesrc, uploadfile } from "@/services/imageService";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
} from "react-native-reanimated/lib/typescript/Animated";
//import { useSafeAreaInsets } from "react-native-safe-area-context";

//import { View } from "react-native-reanimated/lib/typescript/Animated";

const AddSponsors = () => {
  const [name, setName] = useState("");
  const [website, setwebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const onsubmit = async () => {
    try {
      if (!name.trim()) {
        alert("Please enter sponsor name");
        return;
      }

      if (!file) {
        alert("Please select a logo");
        return;
      }

      setLoading(true);

      // upload logo to storage
      const uploadRes = await uploadfile(
        "sponsorLogos",
        file.uri,
        true // image only
      );

      if (!uploadRes.success) {
        alert(uploadRes.msg || "Logo upload failed");
        setLoading(false);
        return;
      }

      // insert sponsor in DB
      const { error } = await supabase.from("sponsors").insert({
        name: name.trim(),
        logo: uploadRes.data, // storage path
        website: website.trim() || null,
      });

      if (error) {
        console.log("createSponsor error", error);
        alert("Could not add sponsor");
        setLoading(false);
        return;
      }

      // success
      alert("Sponsor added successfully 🎉");
      setName("");
      setwebsite("");
      setFile(null);
    } catch (err) {
      console.log("onsubmit error", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const islocalfile = (file: any) => {
    if (!file) return null;
    if (typeof file == "object") return true;
  };
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const getFileUri = (file: any) => {
    if (!file) return null;
    if (typeof file === "object") return file.uri;
    return getuserImagesrc(file);
  };

  const onpick = async (p0: boolean) => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.6,
    });
    if (!res.canceled) {
      setFile(res.assets[0]);
    }
  };
  //const insert = useSafeAreaInsets();

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Header title="Add Sponsor" showavatar={true} />
      </View>
      <View
        style={{
          flexDirection: "column",
          marginHorizontal: hp(2),
          gap: hp(4),
          marginTop: hp(4),
          alignItems: "center",
        }}
      >
        {file && (
          <View
            style={{
              height: hp(40),
              width: "90%",
              borderRadius: theme.radius.xxl,
              overflow: "hidden",
              borderCurve: "continuous",
              alignItems: "center",
              flexDirection: "column",
              gap: hp(4),
            }}
          >
            <Image
              source={{ uri: getFileUri(file) }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.input}>
          <TextInput
            placeholder="Enter Brand Name"
            placeholderTextColor={theme.colors.offwhite}
            style={{ color: theme.colors.offwhite }}
            value={name}
            onChangeText={setName}
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
            onPress={() => onpick(true)}
          >
            <Icon name="image" strokeWidth={1.5} style={styles.icon} />
            <TouchableOpacity
              onPress={() => {
                setFile(null);
              }}
            >
              <Icon name="delete" strokeWidth={1.5} style={styles.icon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: hp(1.2),
            backgroundColor: theme.colors.lightPrimary,
            borderRadius: theme.radius.xl,
            color: theme.colors.offwhite,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextInput
            placeholder="Enter Website"
            placeholderTextColor={theme.colors.offwhite}
            style={{ color: theme.colors.offwhite }}
            value={website}
            onChangeText={setwebsite}
          />
        </View>
        <View
          style={{
            height: hp(50),
            width: "100%",
            backgroundColor: theme.colors.lightPrimary,
            alignItems: "center",
            padding: 4,
            borderRadius: theme.radius.xxl,
          }}
        >
          {/* <ScrollView>
            <FlatList/>
          </Scrollview> */}
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: hp(4),
          width: "100%",
        }}
      >
        <Button
          title="Upload"
          buttonstyle={styles.btn}
          onPress={onsubmit}
          loading={loading}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddSponsors;

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
  btn: {
    // marginHorizontal: hp(2),

    width: "90%",
  },
});
