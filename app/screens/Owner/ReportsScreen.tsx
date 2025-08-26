import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export default function ReportsScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  return (
    <ScreenWrapper title="Reports" theme={theme}>
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Body */}
          <View className="px-4 mt-4 gap-4">
            <View
              className="bg-slate-50 rounded-xl p-6 items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <IconMC name="credit-card-outline" size={36} color="#94a3b8" />
              <Text className="mt-2 text-slate-600">
                No billing records yet
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
