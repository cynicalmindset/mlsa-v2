import { AuthProvider, useAuth } from "@/context/authcontext";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/userService";
import { User } from "@supabase/supabase-js";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
//import {Stack} from 'expo-router';

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const router = useRouter();
  const { setAuth, setUserData } = useAuth();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user", session?.user?.id);
      if (session) {
        //set auth
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        // navigate
        router.replace("/Home");
      } else {
        // set auth
        setAuth(null);
        // welcome screen
        router.replace("/");
      }
    });
  }, []);
  const updateUserData = async (user: User, email: string | undefined) => {
    let res = await getUserData(user?.id);
    // console.log("got user data: ", res);
    if (res.success) setUserData({ ...res.data, email });
  };
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
