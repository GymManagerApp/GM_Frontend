import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";

export default function GymRegistrationScreen() {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8";

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"Active" | "Maintenance" | "Closed">("Active");

  const handleSave = () => {
    if (!name.trim() || !address.trim()) return;
    const newGym = {
      name: name.trim(),
      address: address.trim(),
      email: email.trim(),
      note: note.trim(),
      status,
    };
    // Try to send back to list screen; consumer can handle via params
    try {
      navigation.navigate("GymManagementScreen", { newGym });
    } catch {
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper title="Register Gym/Branch" theme={theme}>
      <View className="flex-1 bg-slate-50 dark:bg-[#0B1220]">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="px-4 mt-2">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Gym/Branch Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Fitness Hub - East"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="123 Main St, City"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="contact@gym.com"
                keyboardType="email-address"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Note</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Any notes (optional)"
                placeholderTextColor={placeholderColor}
                multiline
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Status</Text>
              <View className="flex-row gap-2 mb-2">
                {([
                  { key: "Active", icon: "check-circle-outline" },
                  { key: "Maintenance", icon: "wrench-outline" },
                  { key: "Closed", icon: "close-circle-outline" },
                ] as { key: "Active" | "Maintenance" | "Closed"; icon: string }[]).map((s) => {
                  const selected = status === s.key;
                  return (
                    <Pressable
                      key={s.key}
                      onPress={() => setStatus(s.key)}
                      className={`px-3 py-2 rounded-lg border ${selected ? "" : "bg-white dark:bg-slate-800"}`}
                      style={{
                        borderColor: selected ? accent : theme === "dark" ? "#334155" : "#e2e8f0",
                        backgroundColor: selected ? accent : undefined,
                      }}
                    >
                      <View className="flex-row items-center">
                        <IconMC
                          name={s.icon as any}
                          size={16}
                          color={selected ? "#fff" : theme === "dark" ? "#cbd5e1" : "#334155"}
                          style={{ marginRight: 6 }}
                        />
                        <Text className={`text-sm ${selected ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>
                          {s.key}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <View className="flex-row gap-3 mt-3">
                <Pressable
                  onPress={handleSave}
                  className="flex-1 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: accent }}
                >
                  <Text className="text-white font-semibold">Save</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.goBack()}
                  className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: theme === "dark" ? "transparent" : "#fff" }}
                >
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
