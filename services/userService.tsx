import { supabase } from "../lib/supabase";

export const getUserData = async (userId: any) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      return { success: false, msg: error?.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log("got error", error);
    return { success: false, msg: (error as Error).message };
  }
};

export const updateuser = async (userId: any, data: any) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);
    if (error) {
      return { success: false, msg: error?.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log("got error", error);
    return { success: false, msg: (error as Error).message };
  }
};
