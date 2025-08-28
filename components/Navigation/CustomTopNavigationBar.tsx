import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  SharedValue,
} from "react-native-reanimated";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";

const NAVBAR_HEIGHT = 56;

type Props = {
  title: string;
  scrollY: SharedValue<number>;
  theme?: "light" | "dark"; // optional; defaults to ThemeContext
  onNotificationPress?: () => void;
  profileImageUri?: string;
};

export default function TopNavigationBar({
  title,
  scrollY,
  theme: themeProp,
  onNotificationPress,
  profileImageUri,
}: Props) {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const currentTheme = themeProp || theme;
  const accent = accentColor || (currentTheme === 'dark' ? '#4EA1FF' : '#1d74f5');
  const previousScroll = useSharedValue(0);
  const translateYShared = useSharedValue(0);

  const SHOW_THRESHOLD = 10; // minimum delta to trigger show on scroll up
  const TOP_POSITION_THRESHOLD = 200; // distance from top where nav bar is always shown

  useDerivedValue(() => {
    const diff = scrollY.value - previousScroll.value;
    previousScroll.value = scrollY.value;

    if (scrollY.value <= TOP_POSITION_THRESHOLD) {
      // Always show navbar when near top
      translateYShared.value = withTiming(0, { duration: 250 });
    } else if (diff > 0) {
      // Scroll down: hide navbar immediately
      translateYShared.value = withTiming(-NAVBAR_HEIGHT, { duration: 250 });
    } else if (diff < 0 && Math.abs(diff) > SHOW_THRESHOLD) {
      // Scroll up with enough delta: show navbar
      translateYShared.value = withTiming(0, { duration: 250 });
    }
    // else keep current state (no sudden flickers)
  });

  // Animated style using translateYShared
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYShared.value }],
  }));

  // Derive colors based on theme to avoid dependency on external Colors map
  const colors = {
    background: currentTheme === 'dark' ? '#0f172a' : '#ffffff',
    text: currentTheme === 'dark' ? '#e5e7eb' : '#0f172a',
    borderTop: currentTheme === 'dark' ? '#1f2937' : '#e2e8f0',
    iconActive: accent,
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.borderTop,
        },
      ]}
    >
      <View style={styles.content} pointerEvents="auto">
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={onNotificationPress || (() => navigation.navigate('Notifications'))}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <IconMC name="bell-outline" size={24} color={colors.iconActive} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={profileImageUri ? { uri: profileImageUri } : undefined}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: NAVBAR_HEIGHT,
    width: "100%",
    borderBottomWidth: 1,
    position: "absolute",
    top: 0,
    zIndex: 1000,
    elevation: 10,
  },
  content: {
    paddingHorizontal: 16,
    height: NAVBAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 16,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ccc",
  },
});
