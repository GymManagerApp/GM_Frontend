import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnquiryFormScreen() {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"general" | "membership" | "feedback" | "complaint">("general");

  const validate = () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert("Validation", "Please fill in all required fields.");
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Validation", "Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const newEnquiry = {
      subject: subject.trim(),
      sender: name.trim(),
      email: email.trim(),
      message: message.trim(),
      status: "Open" as const,
      createdAt: new Date().toISOString(),
    };
    navigation.navigate("EnquiryList", { newEnquiry });
  };

  return (
    <ScreenWrapper title="Submit Enquiry" theme={theme}>
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
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Subject</Text>
              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="How can we help?"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Message</Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Write your message"
                placeholderTextColor={placeholderColor}
                multiline
                numberOfLines={5}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Type</Text>
              <View className="flex-row flex-wrap gap-2 mb-2">
                {([
                  { key: "general", label: "General" },
                  { key: "membership", label: "Membership" },
                  { key: "feedback", label: "Feedback" },
                  { key: "complaint", label: "Complaint" },
                ] as { key: "general" | "membership" | "feedback" | "complaint"; label: string }[]).map((opt) => {
                  const selected = type === opt.key;
                  return (
                    <Pressable
                      key={opt.key}
                      onPress={() => setType(opt.key)}
                      className={`px-3 py-2 rounded-lg border ${selected ? "" : "bg-white dark:bg-slate-800"}`}
                      style={{
                        borderColor: selected ? accent : theme === "dark" ? "#334155" : "#e2e8f0",
                        backgroundColor: selected ? accent : undefined,
                      }}
                    >
                      <Text className={`text-sm ${selected ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View className="flex-row gap-3 mt-3">
                <Pressable
                  onPress={handleSubmit}
                  className="flex-1 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: accent }}
                >
                  <Text className="text-white font-semibold">Submit Enquiry</Text>
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
