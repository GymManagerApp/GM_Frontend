import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Image, Pressable, TextInput } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

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
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Bar */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900">Gym Plans</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color="#1d74f5" style={{ marginRight: 12 }} />
            <View className="w-8 h-8 rounded-full bg-slate-200" />
          </View>
        </View>

        {/* Search + Add New */}
        <View className="px-4 mt-1 flex-row gap-3 items-center">
          <View className="flex-1 flex-row items-center border border-slate-200 rounded-xl px-3 py-2 bg-white">
            <IconMC name="magnify" size={20} color="#64748b" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search plans..."
              placeholderTextColor="#94a3b8"
              className="ml-2 flex-1 text-slate-900"
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate("MembershipPlansScreen")}
            className="bg-[#1d74f5] rounded-xl px-4 py-3 flex-row items-center"
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
                className={`flex-row items-center p-4 mb-3 rounded-xl bg-white ${
                  active ? "border-2 border-[#1d74f5]" : "border border-slate-200"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <Image source={{ uri: p.image }} className="w-16 h-16 rounded-lg mr-3" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-slate-900 font-semibold">{p.name}</Text>
                    {p.popular && (
                      <View className="bg-orange-500 px-2 py-1 rounded-full">
                        <Text className="text-white text-[10px]">Popular</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs text-slate-600 mt-1" numberOfLines={2}>
                    {p.desc}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-[#1d74f5] font-semibold mr-3">${p.price.toFixed(2)}</Text>
                    <Text className="text-slate-500 text-xs">{p.durationMonths} months</Text>
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
