import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import TopNavigationBar from "./CustomTopNavigationBar";
import { useAppTheme } from "@/components/theme/ThemeContext";

type ScreenWrapperProps = {
  title: string;
  theme?: "light" | "dark"; // optional; defaults to ThemeContext
  children: React.ReactNode;
};

export default function ScreenWrapper({ title, theme, children }: ScreenWrapperProps) {
  const scrollY = useSharedValue(0);
  const navigation = useNavigation<any>();
  const { theme: ctxTheme } = useAppTheme();
  const currentTheme = theme || ctxTheme;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flex: 1 }}>
      <TopNavigationBar
        title={title}
        scrollY={scrollY}
        theme={currentTheme}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />
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
