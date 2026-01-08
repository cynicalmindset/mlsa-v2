import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { createContent } from "@/services/contentService";
import { getuserImagesrc } from "@/services/imageService";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import { useSafeAreaInsets } from "react-native-safe-area-context";

//import { View } from "react-native-reanimated/lib/typescript/Animated";

const AddContent = () => {
  const [title, settitle] = useState("");
  const [website, setwebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const onsubmit = async () => {
    setLoading(true);

    const res = await createContent({
      title,
      website,
      image,
    });

    if (!res.success) {
      alert(res.msg);
      setLoading(false);
      return;
    }

    alert("Content added successfully 🎉");
    settitle("");
    setwebsite("");
    setimage(null);
    setLoading(false);
  };

  const islocalfile = (file: any) => {
    if (!file) return null;
    if (typeof file == "object") return true;
  };
  const [image, setimage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const getFileUri = (image: any) => {
    if (!image) return null;
    if (typeof image === "object") return image.uri;
    return getuserImagesrc(image);
  };

  const onpick = async (p0: boolean) => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 4],
      quality: 0.6,
    });
    if (!res.canceled) {
      setimage(res.assets[0]);
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
        {image && (
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
              source={{ uri: getFileUri(image) }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.input}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor={theme.colors.offwhite}
            style={{ color: theme.colors.offwhite }}
            value={title}
            onChangeText={settitle}
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
                setimage(null);
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

export default AddContent;

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
