import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenWrapper = {
  children: React.ReactNode;
  bg?: string;
};

const ScreenWrapper = ({ children, bg }: ScreenWrapper) => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = top > 0 ? top + 5 : 30;
  const paddingBottom = bottom > 0 ? bottom + 1 : 15;
  return (
    <View style={{ flex: 1, paddingTop, paddingBottom, backgroundColor: bg }}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
