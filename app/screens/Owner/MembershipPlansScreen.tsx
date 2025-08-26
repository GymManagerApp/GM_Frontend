import React from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export default function MembershipPlansScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8"; // slate-500 (dark) / slate-400 (light)
  return (
    <ScreenWrapper title="Add New Plan" theme={theme}>
      <View className="flex-1 bg-slate-50 dark:bg-[#0B1220]">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Card: Create New Plan */}
          <View className="px-4 mt-2">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              {/* Plan Name */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Plan Name</Text>
              <TextInput
                placeholder="e.g., Premium Plus"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              {/* Description */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Description</Text>
              <TextInput
                placeholder="Short description of the plan"
                placeholderTextColor={placeholderColor}
                multiline
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                    Price (USD)
                  </Text>
                  <TextInput
                    placeholder="$0.00"
                    placeholderTextColor={placeholderColor}
                    keyboardType="decimal-pad"
                    className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
                  />
                </View>
                <View className="w-32">
                  <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                    Duration (Months)
                  </Text>
                  <TextInput
                    placeholder="1"
                    placeholderTextColor={placeholderColor}
                    keyboardType="number-pad"
                    className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
                  />
                </View>
              </View>

              {/* Key Features */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Key Features</Text>
              <TextInput
                placeholder="Comma-separated or one per line"
                placeholderTextColor={placeholderColor}
                multiline
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              {/* Actions */}
              <View className="mt-2 flex-row gap-3">
                <Pressable
                  className="flex-1 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: accent }}
                >
                  <Text className="text-white font-semibold">Submit Plan</Text>
                </Pressable>
                <Pressable className="flex-1 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl py-3 items-center justify-center">
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
