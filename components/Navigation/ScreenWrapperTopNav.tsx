import React from "react";
import { View } from "react-native";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import TopNavigationBar from "./CustomTopNavigationBar";

type ScreenWrapperProps = {
  title: string;
  theme: "light" | "dark";
  children: React.ReactNode;
};

export default function ScreenWrapper({ title, theme, children }: ScreenWrapperProps) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flex: 1 }}>
      <TopNavigationBar title={title} scrollY={scrollY} theme={theme} />
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 56 + 16, paddingBottom: 80 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}
