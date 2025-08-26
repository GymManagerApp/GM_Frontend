import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export type EnquiryStatus = "Open" | "Resolved" | "Pending";
export type Enquiry = {
  id: string;
  subject: string;
  sender: string;
  email?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string; // ISO string
};

export default function EnquiryListScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8";

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "All">("All");
  const [items, setItems] = useState<Enquiry[]>([
    {
      id: "1",
      subject: "Membership Pricing",
      sender: "Alice Johnson",
      email: "alice@example.com",
      message: "Could you share the details for annual membership?",
      status: "Open",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      subject: "Equipment Maintenance",
      sender: "Bob Smith",
      email: "bob@example.com",
      message: "The treadmill in the west corner makes noise.",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600_000).toISOString(),
    },
    {
      id: "3",
      subject: "Great Staff!",
      sender: "Chris P.",
      email: "chris@example.com",
      message: "Kudos to the trainers for helping me out last week!",
      status: "Resolved",
      createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    },
  ]);

  // Append new enquiry from form
  useEffect(() => {
    const newEnquiry: Enquiry | undefined = route?.params?.newEnquiry;
    if (newEnquiry) {
      setItems((prev) => [{ ...newEnquiry, id: String(Date.now()) }, ...prev]);
      try {
        navigation.setParams({ newEnquiry: undefined });
      } catch {}
    }
  }, [route?.params?.newEnquiry]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((it) => {
      const matchesQuery =
        it.subject.toLowerCase().includes(q) ||
        it.sender.toLowerCase().includes(q) ||
        it.message.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" ? true : it.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [items, query, statusFilter]);

  const badgeClass = (s: EnquiryStatus) => {
    switch (s) {
      case "Open":
        return "bg-blue-500";
      case "Resolved":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <ScreenWrapper title="Enquiries" theme={theme}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="px-4 pt-4">
            {/* Search */}
            <View className="flex-row items-center border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900">
              <IconMC name="magnify" size={20} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search by subject, sender, or message"
                placeholderTextColor={placeholderColor}
                className="flex-1 ml-2 text-slate-900 dark:text-slate-100"
              />
            </View>

            {/* Filters */}
            <View className="flex-row gap-2 mt-3">
              {(["All", "Open", "Pending", "Resolved"] as const).map((s) => {
                const selected = statusFilter === s;
                return (
                  <Pressable
                    key={s}
                    onPress={() => setStatusFilter(s)}
                    className={`px-3 py-2 rounded-lg border ${selected ? "" : "bg-white dark:bg-slate-800"}`}
                    style={{
                      borderColor: selected ? accent : theme === "dark" ? "#334155" : "#e2e8f0",
                      backgroundColor: selected ? accent : undefined,
                    }}
                  >
                    <Text className={`text-sm ${selected ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>{s}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Add New Enquiry */}
            <Pressable
              onPress={() => navigation.navigate("EnquiryForm")}
              className="rounded-xl px-4 py-3 flex-row items-center justify-center mt-3"
              style={{ backgroundColor: accent }}
            >
              <IconMC name="email-plus-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text className="text-white font-medium">New Enquiry</Text>
            </Pressable>

            {/* List */}
            <View className="mt-4">
              {filtered.map((it) => (
                <View
                  key={it.id}
                  className="bg-white dark:bg-slate-900 rounded-xl p-4 mb-3 border border-slate-200 dark:border-gray-800"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-2">
                      <Text className="text-slate-900 dark:text-gray-100 font-semibold">{it.subject}</Text>
                      <View className="flex-row items-center mt-1">
                        <IconMC name="account" size={14} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
                        <Text className="ml-1 text-xs text-slate-600 dark:text-gray-400">{it.sender}</Text>
                        <Text className="mx-2 text-xs text-slate-400 dark:text-gray-600">•</Text>
                        <IconMC name="clock-outline" size={14} color={theme === "dark" ? "#9ca3af" : "#64748b"} />
                        <Text className="ml-1 text-xs text-slate-600 dark:text-gray-400">
                          {new Date(it.createdAt).toLocaleString()}
                        </Text>
                      </View>
                      <Text className="text-xs text-slate-500 dark:text-gray-500 mt-2" numberOfLines={2}>
                        {it.message}
                      </Text>
                    </View>
                    <View className={`px-2 py-1 rounded-full ${badgeClass(it.status)}`}>
                      <Text className="text-white text-[10px]">{it.status}</Text>
                    </View>
                  </View>

                  <View className="flex-row gap-2 mt-3">
                    <Pressable
                      onPress={() =>
                        navigation.navigate("DetailsDrawer", {
                          type: "enquiry",
                          title: "Enquiry Details",
                          item: it,
                        })
                      }
                      className="rounded-lg py-2 px-3 flex-row items-center"
                      style={{ backgroundColor: accent }}
                    >
                      <IconMC name="eye-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                      <Text className="text-white text-sm">View Details</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
