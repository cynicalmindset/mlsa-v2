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

// FETCH EVENTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsssssss

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

//EVENT LIKESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

export const likeEvent = async (eventId: string, userId: string) => {
  const { error } = await supabase.from("event_likes").insert({
    event_id: eventId,
    user_id: userId,
  });

  if (error) {
    console.log("likeEvent error", error);
    return { success: false };
  }

  return { success: true };
};

export const unlikeEvent = async (eventId: string, userId: string) => {
  const { error } = await supabase
    .from("event_likes")
    .delete()
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (error) {
    console.log("unlikeEvent error", error);
    return { success: false };
  }

  return { success: true };
};

export const getEventLikesCount = async (eventId: string) => {
  const { count } = await supabase
    .from("event_likes")
    .select("*", { count: "exact", head: true })
    .eq("event_id", eventId);

  return count || 0;
};

//COMENTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

export const addEventComment = async (
  eventId: string,
  userId: string,
  comment: string
) => {
  if (!comment.trim()) {
    return { success: false, msg: "Empty comment" };
  }

  const { error } = await supabase.from("event_comments").insert({
    event_id: eventId,
    user_id: userId,
    comment: comment.trim(),
  });

  if (error) {
    console.log("addEventComment error", error);
    return { success: false };
  }

  return { success: true };
};

export const getEventComments = async (eventId: string) => {
  const { data, error } = await supabase
    .from("event_comments")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("getEventComments error", error);
    return [];
  }

  return data || [];
};
