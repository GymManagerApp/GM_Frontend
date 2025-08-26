import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export default function StaffRegistrationScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
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
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        Active: {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        },
        Pending: {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
        },
        Inactive: {
          bg: "bg-rose-50",
          text: "text-rose-700",
          border: "border-rose-200",
        },
      };
    const c = colors[label];
    return (
      <Pressable
        onPress={() => setStatus(label)}
        className={`px-3 py-2 rounded-full border ${c.border} ${
          active ? c.bg : "bg-white"
        }`}
      >
        <Text className={`text-xs ${c.text}`}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <ScreenWrapper title="Add New Staff" theme={theme}>
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Form Card */}
          <View className="px-4 mt-2">
            <View
              className="bg-white rounded-xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <Text className="text-slate-700 text-sm mb-2">Staff Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Imran Khan"
                placeholderTextColor="#94a3b8"
                className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4"
              />

              <Text className="text-slate-700 text-sm mb-2">Phone Number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="e.g., +91 98765 43210"
                placeholderTextColor="#94a3b8"
                className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4"
              />

              <Text className="text-slate-700 text-sm mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="staff@gym.com"
                placeholderTextColor="#94a3b8"
                className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4"
              />

              {/* Role select placeholder */}
              <Text className="text-slate-700 text-sm mb-2">Role</Text>
              <Pressable className="border border-slate-200 rounded-lg px-3 py-3 flex-row items-center justify-between mb-4">
                <Text
                  className={`text-slate-900 ${role ? "" : "text-slate-400"}`}
                >
                  {role || "Select a role"}
                </Text>
                <IconMC name="chevron-down" size={18} color="#94a3b8" />
              </Pressable>

              {/* Assign Gym placeholder */}
              <Text className="text-slate-700 text-sm mb-2">
                Assign Gym/Branch
              </Text>
              <Pressable className="border border-slate-200 rounded-lg px-3 py-3 flex-row items-center justify-between mb-4">
                <Text
                  className={`text-slate-900 ${gym ? "" : "text-slate-400"}`}
                >
                  {gym || "Select a gym"}
                </Text>
                <IconMC name="chevron-down" size={18} color="#94a3b8" />
              </Pressable>

              {/* Employment Status Chips */}
              <Text className="text-slate-700 text-sm mb-2">
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
                <Pressable className="flex-1 bg-white border border-slate-200 rounded-xl py-3 items-center justify-center">
                  <Text className="text-slate-700 font-semibold">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
