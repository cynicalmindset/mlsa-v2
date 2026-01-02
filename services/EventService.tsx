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
