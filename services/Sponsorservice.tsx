import { supabase } from "@/lib/supabase";
import { uploadfile } from "./imageService";

export const createSponsor = async ({
  name,
  file,
  website,
}: {
  name: string;
  file: any;
  website?: string;
}) => {
  try {
    if (!name) {
      return { success: false, msg: "Sponsor name required" };
    }

    if (!file || typeof file !== "object") {
      return { success: false, msg: "Logo required" };
    }

    const uploadRes = await uploadfile("sponsorLogos", file.uri, true);

    if (!uploadRes.success) {
      return uploadRes;
    }

    const { data, error } = await supabase
      .from("sponsors")
      .insert({
        name,
        logo: uploadRes.data,
        website: website?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.log("createSponsor error", error);
      return { success: false, msg: "could not add sponsor" };
    }

    return { success: true, data: data };
  } catch (err) {
    console.log("createSponsor error", err);
    return { success: false, msg: "could not add sponsor" };
  }
};

export const fetchSponsors = async () => {
  try {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("getSponsors error", error);
      return { success: false, data: data ?? [] }; // ✅ ALWAYS return data
    }

    return { success: true, data: data ?? [] }; // ✅ safe fallback
  } catch (err) {
    console.log("getSponsors error", err);
    return { success: false, data: [] }; // ✅ SAME SHAPE
  }
};
