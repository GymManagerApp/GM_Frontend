import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export default function StaffRegistrationScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [gym, setGym] = useState("");
  const [status, setStatus] = useState<"Active" | "Pending" | "Inactive">(
    "Active"
  );

  const Chip = ({ label }: { label: "Active" | "Pending" | "Inactive" }) => {
    const active = status === label;
    const colors: Record<
      string,
      {
        bgLight: string;
        bgDark: string;
        textLight: string;
        textDark: string;
        borderLight: string;
        borderDark: string;
      }
    > = {
      Active: {
        bgLight: "bg-emerald-50",
        bgDark: "bg-emerald-900/20",
        textLight: "text-emerald-700",
        textDark: "text-emerald-300",
        borderLight: "border-emerald-200",
        borderDark: "border-emerald-700",
      },
      Pending: {
        bgLight: "bg-amber-50",
        bgDark: "bg-amber-900/20",
        textLight: "text-amber-700",
        textDark: "text-amber-300",
        borderLight: "border-amber-200",
        borderDark: "border-amber-700",
      },
      Inactive: {
        bgLight: "bg-rose-50",
        bgDark: "bg-rose-900/20",
        textLight: "text-rose-700",
        textDark: "text-rose-300",
        borderLight: "border-rose-200",
        borderDark: "border-rose-700",
      },
    };
    const c = colors[label];
    return (
      <Pressable
        onPress={() => setStatus(label)}
        className={`px-3 py-2 rounded-full border ${
          theme === "dark" ? c.borderDark : c.borderLight
        } ${
          active
            ? theme === "dark"
              ? c.bgDark
              : c.bgLight
            : "bg-white dark:bg-slate-900"
        }`}
      >
        <Text
          className={`text-xs ${theme === "dark" ? c.textDark : c.textLight}`}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <ScreenWrapper title="Add New Staff" theme={theme}>
      <View className="flex-1 bg-white dark:bg-slate-900">
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Form Card */}
          <View className="px-4 mt-2">
            <View
              className="bg-white dark:bg-slate-800 rounded-xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Staff Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Imran Khan"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="e.g., +91 98765 43210"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="staff@gym.com"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 mb-4"
              />

              {/* Role select placeholder */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Role
              </Text>
              <Pressable className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 flex-row items-center justify-between mb-4">
                <Text
                  className={`${
                    role
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {role || "Select a role"}
                </Text>
                <IconMC
                  name="chevron-down"
                  size={18}
                  color={theme === "dark" ? "#9ca3af" : "#94a3b8"}
                />
              </Pressable>

              {/* Assign Gym placeholder */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Assign Gym/Branch
              </Text>
              <Pressable className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 flex-row items-center justify-between mb-4">
                <Text
                  className={`${
                    gym
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {gym || "Select a gym"}
                </Text>
                <IconMC
                  name="chevron-down"
                  size={18}
                  color={theme === "dark" ? "#9ca3af" : "#94a3b8"}
                />
              </Pressable>

              {/* Employment Status Chips */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Employment Status
              </Text>
              <View className="flex-row gap-2 mb-2">
                <Chip label="Active" />
                <Chip label="Pending" />
                <Chip label="Inactive" />
              </View>

              <View className="mt-2 flex-row gap-3">
                <Pressable
                  className="flex-1 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: accent }}
                >
                  <Text className="text-white font-semibold">
                    Register Staff
                  </Text>
                </Pressable>
                <Pressable className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 items-center justify-center">
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold">
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
