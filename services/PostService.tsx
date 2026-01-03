import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createorupdate = async (post: any) => {
  try {
    let media_url = null;
    let media_type = null;

    if (post.file && typeof post.file === "object") {
      const isImage = post.file.type === "image";
      const folderName = isImage ? "postImage" : "postVideos";

      const uploadRes = await uploadfile(folderName, post.file.uri, isImage);

      if (!uploadRes.success) return uploadRes;

      media_url = uploadRes.data;
      media_type = isImage ? "image" : "video";
    }

    const { data, error } = await supabase.from("posts").insert({
      user_id: post.userId,
      caption: post.caption,
      media_url,
      media_type,
    });

    if (error) {
      console.log("create post error", error);
      return { success: false };
    }

    return { success: true, data };
  } catch (err) {
    console.log("create post error", err);
    return { success: false };
  }
};

export const fetchPost = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("post fetch error", error);
      return { success: false, data: null };
    }

    return { success: true, data };
  } catch (err) {
    console.log("post fetch error", err);
    return { success: false, data: null };
  }
};
