import Icon from "@/assets/icons";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { createEvent } from "@/services/EventService";
import { getuserImagesrc } from "@/services/imageService";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
//import { View } from "react-native-reanimated/lib/typescript/Animated";

// const insert = useSafeAreaInsets();
const AddEvent = () => {
  const getFileUri = (file: any) => {
    if (!file) return null;
    if (typeof file === "object") return file.uri;
    return getuserImagesrc(file);
  };
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [showStart, setShowStart] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      if (
        !title.trim() ||
        !description.trim() ||
        !file ||
        !location.trim() ||
        !startDate ||
        !endDate
      ) {
        alert("Please fill all required fields");
        return;
      }

      if (endDate < startDate) {
        alert("End date must be after start date");
        return;
      }

      setloading(true);

      const res = await createEvent({
        title,
        description,
        poster: file,
        location,
        start_time: startDate,
        end_time: endDate,
        website,
      });

      if (!res.success) {
        alert(res.msg);
        setloading(false);
        router.back();
        return;
      }

      alert("Event created successfully 🎉");

      // reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setWebsite("");
      setFile(null);
      setStartDate(null);
      setEndDate(null);
    } catch (err) {
      console.log("event submit error", err);
      alert("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  const onpick = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 5],
      quality: 0.6,
    });
    if (!res.canceled) {
      setFile(res.assets[0]);
    }
  };
  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(2), marginTop: hp(2) }}>
        <Header title="Add Event" showavatar={true} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: hp(14) }}
      >
        <View
          style={{
            marginHorizontal: wp(4),
            marginVertical: hp(2),
            flexDirection: "column",
            gap: hp(3),
          }}
        >
          {file && (
            <View
              style={{
                height: hp(65),
                width: "100%",
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
              placeholder="Enter Event Name"
              placeholderTextColor={theme.colors.offwhite}
              style={{ color: theme.colors.offwhite }}
              value={title}
              onChangeText={setTitle}
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
              onPress={onpick}
            >
              <Icon name="image" strokeWidth={1.5} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputdes}>
            <TextInput
              placeholder="Enter Event Description"
              placeholderTextColor={theme.colors.offwhite}
              style={[{ color: theme.colors.offwhite }, styles.multilineInput]}
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter Event Location"
              placeholderTextColor={theme.colors.offwhite}
              style={{ color: theme.colors.offwhite }}
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter Website"
              placeholderTextColor={theme.colors.offwhite}
              style={{ color: theme.colors.offwhite }}
              value={website}
              onChangeText={setWebsite}
            />
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowStart(true)}
          >
            <Text style={{ color: startDate ? theme.colors.offwhite : "#aaa" }}>
              {startDate ? startDate.toDateString() : "Select Event Start Date"}
            </Text>
            <Icon name="plus" strokeWidth={1.5} style={styles.icon} />
          </TouchableOpacity>

          {showStart && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              onChange={(e, d) => {
                setShowStart(false);
                if (d) setStartDate(d);
              }}
            />
          )}

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowEnd(true)}
          >
            <Text style={{ color: endDate ? theme.colors.offwhite : "#aaa" }}>
              {endDate ? endDate.toDateString() : "Select Event End Date"}
            </Text>
            <Icon name="plus" strokeWidth={1.5} style={styles.icon} />
          </TouchableOpacity>

          {showEnd && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              onChange={(e, d) => {
                setShowEnd(false);
                if (d) setEndDate(d);
              }}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <Button
          title="Upload"
          buttonstyle={styles.btn2}
          onPress={onSubmit}
          loading={loading}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddEvent;

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
  inputdes: {
    padding: hp(1.2),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xl,
    color: theme.colors.offwhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // height: hp(18),
  },
  multilineInput: {
    minHeight: hp(12),
    backgroundColor: theme.colors.lightPrimary,
    borderRadius: theme.radius.xl,
    padding: hp(1.5),
    color: theme.colors.offwhite,
  },
  btn: {
    alignItems: "center",
    position: "absolute",
    bottom: hp(3),
    left: 0,
    right: 0,
  },
  btn2: {
    width: "90%",
  },
});
