import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

type Staff = {
  name: string;
  email: string;
  phone: string;
  role: string;
  status?: "active" | "pending" | "inactive";
};

export default function StaffListScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const staff: Staff[] = [
    { name: "Anita Rao", email: "anita@gym.com", phone: "+91 98200 11111", role: "Trainer", status: "active" },
    { name: "Karan Mehta", email: "karan@gym.com", phone: "+91 98111 22222", role: "Reception", status: "pending" },
    { name: "Vikas Kumar", email: "vikas@gym.com", phone: "+91 98000 33333", role: "Manager", status: "inactive" },
  ];

  const filtered = useMemo(
    () =>
      staff.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.email.toLowerCase().includes(query.toLowerCase()) ||
          s.phone.toLowerCase().includes(query.toLowerCase()) ||
          s.role.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const badgeStyle = (s?: Staff["status"]) => {
    switch (s) {
      case "active":
        return { bg: "bg-emerald-100", text: "text-emerald-700", label: "Active" };
      case "pending":
        return { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" };
      case "inactive":
      default:
        return { bg: "bg-rose-100", text: "text-rose-700", label: "Inactive" };
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Top Bar */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900">Staff</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color="#1d74f5" style={{ marginRight: 12 }} />
            <View className="w-8 h-8 rounded-full bg-slate-200" />
          </View>
        </View>

        {/* Search */}
        <View className="px-4 mt-1">
          <View className="flex-row items-center border border-slate-200 rounded-xl px-3 py-2 bg-white">
            <IconMC name="magnify" size={20} color="#64748b" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search staff by name, role, email or phone"
              placeholderTextColor="#94a3b8"
              className="ml-2 flex-1 text-slate-900"
            />
          </View>
          {/* Add New Staff Button */}
          <Pressable
            onPress={() => navigation.navigate("StaffRegistrationScreen")}
            className="mt-3 bg-[#1d74f5] rounded-xl px-4 py-3 flex-row items-center justify-center"
          >
            <IconMC name="account-plus-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text className="text-white font-semibold">Add New Staff</Text>
          </Pressable>
        </View>

        {/* List */}
        <View className="px-4 mt-3">
          {filtered.map((s, idx) => {
            const active = selected === idx;
            const b = badgeStyle(s.status);
            return (
              <Pressable
                key={`${s.email}-${idx}`}
                onPress={() => setSelected(idx)}
                className={`p-4 mb-3 rounded-xl bg-white flex-row items-center justify-between ${
                  active ? "border-2 border-[#1d74f5]" : "border border-slate-200"
                }`}
                style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
              >
                <View className="flex-1 pr-3">
                  <Text className="text-slate-900 font-semibold">{s.name}</Text>
                  <Text className="text-xs text-slate-600 mt-1">{s.role}</Text>
                  <Text className="text-xs text-slate-600 mt-0.5">{s.email}</Text>
                  <Text className="text-xs text-slate-600 mt-0.5">{s.phone}</Text>
                  <View className="mt-2">
                    <View className={`self-start px-2 py-1 rounded-full ${b.bg}`}>
                      <Text className={`text-[10px] ${b.text}`}>{b.label}</Text>
                    </View>
                  </View>
                </View>
                <View className="ml-3 items-center">
                  <Pressable className="p-2 rounded-full bg-slate-100 mb-2">
                    <IconMC name="pencil-outline" size={18} color="#475569" />
                  </Pressable>
                  <Pressable className="p-2 rounded-full bg-slate-100">
                    <IconMC name="trash-can-outline" size={18} color="#ef4444" />
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
