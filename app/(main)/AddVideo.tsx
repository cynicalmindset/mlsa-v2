import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/authcontext";
import { hp } from "@/helpers/common";
import { getuserImagesrc } from "@/services/imageService";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
//import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

//const insert = useSafeAreaInsets();

const AddSponsors = () => {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { user } = useAuth();

  const onpick = async (isImage: boolean) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission required");
      return;
    }

    const result = isImage
      ? await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.7,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          quality: 1,
        });

    if (!result.canceled) {
      setFile(result.assets[0]);
      console.log(result.assets[0].type); // image | video
    }
  };

  const islocalfile = (file: any) => {
    if (!file) return null;
    if (typeof file == "object") return true;
  };
  const getFiletype = (file: ImagePicker.ImagePickerAsset) => {
    if (!file) return null;
    if (islocalfile(file)) {
      return file.type;
    }
    // chekc for remote file
  };

  const onsubmit = async () => {
    console.log("file", file);
    if (!file) {
      Alert.alert("post", "add something bro");
      return;
    }
    let data = {
      file,
      userId: user?.id,
    };
  };
  const [loading, setloading] = useState(false);

  const getFileUri = (file: any) => {
    if (!file) return null;
    if (islocalfile(file)) {
      return file.uri;
    }
    return getuserImagesrc(file)?.uri;
  };

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Header title="Add Moments" showavatar={true} />
        <View
          style={{
            flexDirection: "column",
            gap: hp(4),
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp(10),
          }}
        >
          {file && (
            <View
              style={{
                height: hp(30),
                width: "90%",
                borderRadius: theme.radius.xxl,
                overflow: "hidden",
                borderCurve: "continuous",
              }}
            >
              {file.type === "video" ? (
                <Video
                  source={{ uri: file.uri }}
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                  isLooping
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <Image
                  source={{ uri: getFileUri(file) }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              )}
            </View>
          )}

          <View
            style={{
              backgroundColor: theme.colors.lightPrimary,
              padding: 16,
              flexDirection: "row",
              gap: 20,
              borderRadius: theme.radius.xxl,
            }}
          >
            <Pressable
              style={{
                height: hp(6),
                width: hp(6),
                alignItems: "center",

                justifyContent: "center",
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => onpick(false)}
            >
              <Icon name="video" size={30} color="white" />
            </Pressable>
            <Pressable
              style={{
                height: hp(6),
                width: hp(6),
                alignItems: "center",

                justifyContent: "center",
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => onpick(true)}
            >
              <Icon name="image" size={30} color="white" />
            </Pressable>
            <Pressable
              style={{
                height: hp(6),
                width: hp(6),
                alignItems: "center",

                justifyContent: "center",
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => setFile(null)}
            >
              <Icon name="delete" size={30} color="white" />
            </Pressable>
          </View>

          <Text
            style={{
              color: theme.colors.offwhite,
              marginTop: hp(4),
              // alignItems: "center",
              // justifyContent: "center",
              opacity: 0.6,
            }}
          >
            Make sure file is not big app in surving on free tier
          </Text>
        </View>
        <View style={{ marginTop: hp(10) }}>
          <Button
            title="Upload gng"
            buttonstyle={{
              height: hp(6.2),
            }}
            loading={loading}
            onPress={onsubmit}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddSponsors;

const styles = StyleSheet.create({});
