import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createProject = async ({
  title,
  description,
  github,
  image,
}: {
  title: string;
  description: string;
  github?: string;
  image: any;
}) => {
  try {
    if (!title || !description) {
      return { success: false, msg: "All fields are required" };
    }

    if (!image || typeof image !== "object") {
      return { success: false, msg: "Image is required" };
    }

    const uploadRes = await uploadfile("projects", image.uri, true);

    if (!uploadRes.success) {
      return uploadRes;
    }
    const { data, error } = await supabase
      .from("projects")
      .insert({
        title,
        description,
        preview_image: uploadRes.data,
        github_link: github,
      })
      .select()
      .single();

    if (error) {
      console.log("CreateProject DB error:", error);
      return { success: false, msg: "Could not add project" };
    }

    return { success: true, data };
  } catch (err) {
    console.log("CreateProject error:", err);
    return { success: false, msg: "Something went wrong" };
  }
};

export const fetchSponsors = async () => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Projects error", error);
      return { success: false, data: data ?? [] };
    }

    return { success: true, data: data ?? [] };
  } catch (err) {
    console.log("Projects error", err);
    return { success: false, data: [] };
  }
};
