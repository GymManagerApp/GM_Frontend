import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Image, Pressable, TextInput } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";

type Plan = {
  name: string;
  desc: string;
  image: string;
  price: number;
  durationMonths: number;
  popular?: boolean;
};

export default function MembershipPlansListScreen() {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");

  const plans: Plan[] = [
    {
      name: "Starter",
      desc: "Great for beginners starting out",
      image: "https://picsum.photos/seed/starter/100",
      price: 19.99,
      durationMonths: 1,
    },
    {
      name: "Pro Fitness",
      desc: "Access all classes and trainers",
      image: "https://picsum.photos/seed/pro/100",
      price: 49.99,
      durationMonths: 3,
      popular: true,
    },
    {
      name: "Elite Annual",
      desc: "Priority booking and premium perks",
      image: "https://picsum.photos/seed/elite/100",
      price: 149.0,
      durationMonths: 12,
    },
  ];

  const filteredPlans = useMemo(
    () =>
      plans.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.desc.toLowerCase().includes(query.toLowerCase())
      ),
    [plans, query]
  );

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Bar */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900 dark:text-gray-100">Gym Plans</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color={accent} style={{ marginRight: 12 }} />
            <View className="w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-700" />
          </View>
        </View>

        {/* Search + Add New */}
        <View className="px-4 mt-1 flex-row gap-3 items-center">
          <View className="flex-1 flex-row items-center border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900">
            <IconMC name="magnify" size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search plans..."
              placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#94a3b8'}
              className="ml-2 flex-1 text-slate-900 dark:text-gray-100"
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate("MembershipPlansScreen")}
            className="rounded-xl px-4 py-3 flex-row items-center"
            style={{ backgroundColor: accent }}
          >
            <IconMC name="file-plus-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text className="text-white font-medium">Add New Plan</Text>
          </Pressable>
        </View>

        {/* Plans List */}
        <View className="px-4 mt-2">
          {filteredPlans.map((p, idx) => {
            const active = idx === selected;
            return (
              <Pressable
                key={p.name}
                onPress={() => setSelected(idx)}
                className={`flex-row items-center p-4 mb-3 rounded-xl bg-white dark:bg-slate-900 ${
                  active ? "border-2" : "border border-slate-200 dark:border-gray-800"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 1,
                  ...(active ? { borderColor: accent } : null),
                }}
              >
                <Image source={{ uri: p.image }} className="w-16 h-16 rounded-lg mr-3" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-slate-900 dark:text-gray-100 font-semibold">{p.name}</Text>
                    {p.popular && (
                      <View className="bg-orange-500 px-2 py-1 rounded-full">
                        <Text className="text-white text-[10px]">Popular</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs text-slate-600 dark:text-gray-300 mt-1" numberOfLines={2}>
                    {p.desc}
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                      <Text className="font-semibold mr-3" style={{ color: accent }}>${p.price.toFixed(2)}</Text>
                      <Text className="text-slate-500 dark:text-gray-400 text-xs">{p.durationMonths} months</Text>
                    </View>
                    <Pressable
                      onPress={() => navigation.navigate('DetailsDrawer', { type: 'plan', item: p, title: 'Plan Details' })}
                      className="rounded-lg px-2 py-1"
                      style={{ backgroundColor: accent }}
                    >
                      <Text className="text-white text-[11px]">View Details</Text>
                    </Pressable>
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
