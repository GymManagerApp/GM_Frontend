import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";

type Member = {
  name: string;
  email: string;
  phone: string;
  status?: "active" | "pending" | "inactive";
};

export default function MemberListScreen() {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const members: Member[] = [
    { name: "Aman Verma", email: "aman@example.com", phone: "+91 98765 43210", status: "active" },
    { name: "Priya Shah", email: "priya@example.com", phone: "+91 97654 32109", status: "pending" },
    { name: "Rahul Singh", email: "rahul@example.com", phone: "+91 96543 21098", status: "inactive" },
  ];

  const filtered = useMemo(
    () =>
      members.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.email.toLowerCase().includes(query.toLowerCase()) ||
          m.phone.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const badgeStyle = (s?: Member["status"]) => {
    switch (s) {
      case "active":
        return { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300", label: "Active" };
      case "pending":
        return { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", label: "Pending" };
      case "inactive":
      default:
        return { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-300", label: "Inactive" };
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Top Bar */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900 dark:text-gray-100">Members</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color={accent} style={{ marginRight: 12 }} />
            <View className="w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-700" />
          </View>
        </View>

        {/* Search */}
        <View className="px-4 mt-1">
          <View className="flex-row items-center border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900">
            <IconMC name="magnify" size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search members by name, email or phone"
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#94a3b8'}
              className="ml-2 flex-1 text-slate-900 dark:text-gray-100"
            />
          </View>
          {/* Add New Member Button */}
          <Pressable
            onPress={() => navigation.navigate("MemberRegistrationScreen")}
            className="mt-3 rounded-xl px-4 py-3 flex-row items-center justify-center"
            style={{ backgroundColor: accent }}
          >
            <IconMC name="account-plus-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text className="text-white font-semibold">Add New Member</Text>
          </Pressable>
        </View>

        {/* List */}
        <View className="px-4 mt-3">
          {filtered.map((m, idx) => {
            const active = selected === idx;
            const b = badgeStyle(m.status);
            return (
              <Pressable
                key={`${m.email}-${idx}`}
                onPress={() => setSelected(idx)}
                className={`p-4 mb-3 rounded-xl bg-white dark:bg-slate-900 flex-row items-center justify-between ${
                  active ? "border-2" : "border border-slate-200 dark:border-gray-800"
                }`}
                style={active ? { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1, borderColor: accent } : { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
              >
                <View className="flex-1 pr-3">
                  <Text className="text-slate-900 dark:text-gray-100 font-semibold">{m.name}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-300 mt-1">{m.email}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">{m.phone}</Text>
                  <View className="mt-2">
                    <View className={`self-start px-2 py-1 rounded-full ${b.bg}`}>
                      <Text className={`text-[10px] ${b.text}`}>{b.label}</Text>
                    </View>
                  </View>
                </View>
                <View className="ml-3 items-center">
                  <Pressable className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-2">
                    <IconMC name="pencil-outline" size={18} color={theme === 'dark' ? '#cbd5e1' : '#475569'} />
                  </Pressable>
                  <Pressable className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <IconMC name="trash-can-outline" size={18} color={theme === 'dark' ? '#f87171' : '#ef4444'} />
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
