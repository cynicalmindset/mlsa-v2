import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/authcontext";
import { supabase } from "@/lib/supabase";

import React from "react";
import { Alert, Button, StyleSheet, Text } from "react-native";

const Home = () => {
  const { setAuth } = useAuth();
  const onlogout = async () => {
    setAuth(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("cant sign out ehh wtf");
    }
  };
  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title="Logout" onPress={onlogout}></Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
