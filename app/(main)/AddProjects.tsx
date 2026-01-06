import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { supabase } from "@/lib/supabase";
import { getuserImagesrc, uploadfile } from "@/services/imageService";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddProjects = () => {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!res.canceled) {
      setImage(res.assets[0]);
    }
  };

  const onSubmit = async () => {
    try {
      if (!title || !description || !github || !image) {
        Alert.alert("Error", "Please enter all details");
        return;
      }

      setLoading(true);

      // upload image
      const uploadRes = await uploadfile("projects", image.uri, true);

      if (!uploadRes.success) {
        Alert.alert("Upload failed", uploadRes.msg);
        return;
      }

      const { error } = await supabase.from("projects").insert({
        title: title.trim(),
        description: description.trim(),
        image: uploadRes.data,
        github: github.trim(),
      });

      if (error) {
        console.log("Project insert error", error);
        Alert.alert("Error", "Could not add project");
        return;
      }

      Alert.alert("Success", "Project added 🎉");
      setTitle("");
      setDescription("");
      setGithub("");
      setImage(null);
    } catch (err) {
      console.log("onSubmit error", err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getFileUri = (file: any) => {
    if (!file) return null;
    if (typeof file === "object") return file.uri;
    return getuserImagesrc(file);
  };

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(3), flex: 1 }}>
        <View style={{ marginTop: hp(2), marginBottom: hp(3) }}>
          <Header title="Add Project" showavatar />
        </View>
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
            placeholder="Enter Project Name"
            placeholderTextColor={theme.colors.offwhite}
            style={styles.text}
            value={title}
            onChangeText={setTitle}
          />

          <TouchableOpacity onPress={pickImage} style={styles.imageBtn}>
            <Icon name="image" strokeWidth={1.5} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Desc , keep as less as posib , 3-5 liner "
            placeholderTextColor={theme.colors.offwhite}
            style={styles.text}
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Github link"
            placeholderTextColor={theme.colors.offwhite}
            style={styles.text}
            value={github}
            onChangeText={setGithub}
          />
        </View>

        <View
          style={{
            marginTop: "auto",
            paddingBottom: insets.bottom + hp(2),
          }}
        >
          <Button title="Upload" loading={loading} onPress={onSubmit} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddProjects;

const styles = StyleSheet.create({
  input: {
    padding: hp(1.2),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(3),
  },
  text: {
    color: theme.colors.offwhite,
    flex: 1,
  },
  imageBtn: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    opacity: 0.6,
  },
  icon: {
    color: theme.colors.offwhite,
  },
});
