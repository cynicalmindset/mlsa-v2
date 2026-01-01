import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createorupdate = async (post: any) => {
  try {
    if (post.userId) {
      post.user_id = post.userId;
      delete post.userId;
    }
    // handle local picked file
    if (post.file && typeof post.file === "object") {
      const isImage = post.file.type === "image";
      const folderName = isImage ? "postImage" : "postVideos";

      const fileResult = await uploadfile(folderName, post.file.uri, isImage);

      if (!fileResult.success) {
        return fileResult;
      }

      post.media_url = fileResult.data;
      post.media_type = isImage ? "image" : "video";

      delete post.file;
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log("createPost error", error);
      return { success: false, msg: "could not create your post aww" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("createPost error", error);
    return { success: false, msg: "could not create your post aww" };
  }
};
