import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createEvent = async ({
  title,
  description,
  poster,
  location,
  start_time,
  end_time,
  website,
}: {
  title: string;
  description: string;
  poster: any;
  location: string;
  start_time: Date;
  end_time: Date;
  website?: string;
}) => {
  try {
    if (
      !title ||
      !description ||
      !poster ||
      !location ||
      !start_time ||
      !end_time
    ) {
      return { success: false, msg: "All fields are required" };
    }

    const uploadRes = await uploadfile("eventPosters", poster.uri, true);

    if (!uploadRes.success) {
      return uploadRes;
    }

    const { data, error } = await supabase
      .from("events")
      .insert({
        title: title.trim(),
        description: description.trim(),
        poster: uploadRes.data,
        location: location.trim(),
        start_time: start_time.toISOString(),
        end_time: end_time.toISOString(),
        website: website?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.log("create event error", error);
      return { success: false, msg: "could not create event" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("create event error", error);
    return { success: false, msg: "could not create event" };
  }
};

export const fetchEvents = async () => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("getEvent error", error);
      return { success: false, data: data ?? [] };
    }
    return { success: true, data: data ?? [] };
  } catch (err) {
    console.log("getEvent error", err);
    return { success: false, data: [] };
  }
};

export const fetchEventById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("fetchEventById error", error);
      return { success: false, data: null };
    }

    return { success: true, data };
  } catch (err) {
    console.log("fetchEventById error", err);
    return { success: false, data: null };
  }
};
