import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createContent = async ({
  title,
  website,
  image,
}: {
  title: string;
  website: string;
  image: any;
}) => {
  try {
    if (!title || !website || !image) {
      return { success: false, msg: "all fields req" };
    }
    const uploadres = await uploadfile("contentBanner", image.uri, true);
    if (!uploadres.success) {
      return uploadres;
    }
    const { data, error } = await supabase
      .from("content")
      .insert({
        title,
        website,
        image: uploadres.data,
      })
      .select()
      .single();

    if (error) {
      console.log("createContent error", error);
      return { success: false, msg: "could not add Content" };
    }
    return { success: true, data: data };
  } catch (err) {
    console.log("createContent error", err);
    return { success: false, msg: "could not add Content" };
  }
};

export const fetchContent = async () => {
  try {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("FetchContent error", error);

      return { success: false, msg: "could not fetch Content" };
    }
    return { success: true, data: data ?? [] };
  } catch (err) {
    console.log("FetchContent error", err);

    return { success: false, msg: "could not fetch Content" };
  }
};
