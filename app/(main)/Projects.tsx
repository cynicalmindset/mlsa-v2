import Header from "@/components/Header";
import Projectcard from "@/components/Projectcard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { fetchProject } from "@/services/ProjectService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
//import {} from "react-native-reanimated/lib/typescript/Animated";

const Projects = () => {
  const router = useRouter();
  const [project, setproject] = useState([]);
  useEffect(() => {
    getporject();
  }, []);

  const getporject = async () => {
    let res = await fetchProject();
    console.log("projects", res.data);
    if (res.success && Array.isArray(res.data)) {
      setproject([...res.data]);
    }
  };

  return (
    <ScreenWrapper bg={theme.colors.primary}>
      <View style={{ marginHorizontal: hp(3) }}>
        <Header title="Projects" showavatar={true} />
      </View>
      <View
        style={{
          flex: 1,
          // alignItems: "center",
          marginTop: hp(4),
          //justifyContent: "center",
        }}
      >
        <FlatList
          data={project}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(4),
            paddingHorizontal: hp(3),
            //width: "90%",
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Projectcard item={item} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Projects;

const styles = StyleSheet.create({});
