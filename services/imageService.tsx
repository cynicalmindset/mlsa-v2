import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

export const getuserImagesrc = (imagePath: string | null) => {
  if (!imagePath) {
    return require("../assets/illustration/avatar.jpeg");
  }

  if (imagePath.startsWith("file://")) {
    return imagePath;
  }

  const { data } = supabase.storage.from("uploads").getPublicUrl(imagePath);

  return data.publicUrl;
};

export const uploadfile = async (
  folderName: any,
  fileUri: any,
  isImage = true
) => {
  try {
    let fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    });
    let imageData = decode(fileBase64);
    let { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: isImage ? "image/*" : "video/*",
      });
    if (error) {
      console.log("file upload error", error);
      console.log("data", data);
      return { success: false, msg: "could not upload image" };
    }
    return { success: true, data: data?.path };
  } catch (error) {
    console.log("file upload error", error);
    return { success: false, msg: "could not upload image" };
  }
};

export const getFilePath = (folderName: any, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};
