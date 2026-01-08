import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createDomain = async ({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: any;
}) => {
  try {
    if (!name || !description || !image) {
      return { success: false, msg: "all fields req" };
    }
    const uploadres = await uploadfile("DomainIMG", image.uri, true);
    if (!uploadres.success) {
      return uploadres;
    }
    const { data, error } = await supabase
      .from("domains")
      .insert({
        name,
        description,
        image: uploadres.data,
      })
      .select()
      .single();

    if (error) {
      console.log("createDomain error", error);
      return { success: false, msg: "could not add Domain" };
    }
    return { success: true, data: data };
  } catch (err) {
    console.log("createDomain error", err);
    return { success: false, msg: "could not add Domain" };
  }
};

export const fetchDomain = async () => {
  try {
    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("FetchDomain error", error);

      return { success: false, msg: "could not fetch Domain" };
    }
    return { success: true, data: data ?? [] };
  } catch (err) {
    console.log("FetchDomain error", err);

    return { success: false, msg: "could not fetch Domain" };
  }
};
