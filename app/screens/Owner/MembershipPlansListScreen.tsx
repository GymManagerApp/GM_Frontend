import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import { listMembershipPlans, deleteMembershipPlan } from "@/app/services/membershipPlans";

type Plan = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  durationInMonths: number;
  benefits?: string[];
  bonus?: string;
  freeMonths?: number;
};

export default function MembershipPlansListScreen() {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await listMembershipPlans();
      const normalized: Plan[] = (Array.isArray(data) ? data : []).map((p: any) => ({
        _id: p._id,
        name: p.name,
        description: p.description,
        image: p.image,
        price: Number(p.price ?? 0),
        durationInMonths: Number(p.durationInMonths ?? p.duration ?? 0),
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        bonus: p.bonus,
        freeMonths: p.freeMonths != null ? Number(p.freeMonths) : undefined,
      }));
      setPlans(normalized);
    } catch (e) {
      console.warn("Failed to load plans", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // Reload when screen gains focus (after create/update/delete navigations)
  useFocusEffect(
    useCallback(() => {
      loadPlans();
      return () => {};
    }, [])
  );

  const filteredPlans = useMemo(
    () =>
      plans.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          (p.description || "").toLowerCase().includes(query.toLowerCase())
      ),
    [plans, query]
  );

  const onEdit = (plan: Plan) => {
    navigation.navigate("MembershipPlansScreen", { editId: plan._id });
  };

  const onDelete = (plan: Plan) => {
    Alert.alert("Delete Plan", `Are you sure you want to delete "${plan.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMembershipPlan(plan._id);
            loadPlans();
          } catch (e: any) {
            const msg = e?.response?.data?.message || e?.message || "Failed to delete";
            Alert.alert("Error", msg);
          }
        },
      },
    ]);
  };

  return (
    <ScreenWrapper title="Membership Plans" theme={theme}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Search + Add New */}
          <View className="w-full px-4 mt-1 flex flex-col gap-3 items-start">
            <View className="flex-1 flex-row items-center border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900">
              <IconMC
                name="magnify"
                size={20}
                color={theme === "dark" ? "#94a3b8" : "#64748b"}
              />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search plans..."
                placeholderTextColor={theme === "dark" ? "#9ca3af" : "#94a3b8"}
                className="ml-2 flex-1 text-slate-900 dark:text-gray-100"
              />
            </View>
            <Pressable
              onPress={() => navigation.navigate("MembershipPlansScreen")}
              className="rounded-xl px-4 py-3 flex-row items-center justify-center w-full"
              style={{ backgroundColor: accent }}
            >
              <IconMC
                name="file-plus-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text className="text-white font-medium">Add New Plan</Text>
            </Pressable>
          </View>

          {/* Plans List */}
          <View className="px-4 mt-2">
            {filteredPlans.map((p) => {
              const active = p._id === selected;
              return (
                <Pressable
                  key={p._id}
                  onPress={() => setSelected(p._id)}
                  className={`flex-row items-center p-4 mb-3 rounded-xl bg-white dark:bg-slate-900 ${
                    active
                      ? "border-2"
                      : "border border-slate-200 dark:border-gray-800"
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
                  {p.image ? (
                    <Image
                      source={{ uri: p.image }}
                      className="w-16 h-16 rounded-lg mr-3"
                    />
                  ) : (
                    <View className="w-16 h-16 rounded-lg mr-3 bg-slate-200 dark:bg-slate-800 items-center justify-center">
                      <IconMC name="image-off-outline" size={20} color={theme === "dark" ? "#94a3b8" : "#64748b"} />
                    </View>
                  )}
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-slate-900 dark:text-gray-100 font-semibold">
                        {p.name}
                      </Text>
                      {!!p.bonus && (
                        <View className="bg-orange-500 px-2 py-1 rounded-full">
                          <Text className="text-white text-[10px]">Bonus</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      className="text-xs text-slate-600 dark:text-gray-300 mt-1"
                      numberOfLines={2}
                    >
                      {p.description || ""}
                    </Text>
                    <View className="flex-row items-center justify-between mt-2">
                      <View className="flex-row items-center">
                        <Text
                          className="font-semibold mr-3"
                          style={{ color: accent }}
                        >
                          {(() => {
                            try {
                              return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(p.price);
                            } catch {
                              return `₹${p.price.toFixed(2)}`;
                            }
                          })()}
                        </Text>
                        <Text className="text-slate-500 dark:text-gray-400 text-xs">
                          {p.durationInMonths} months
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => navigation.navigate("DetailsDrawer", { type: "plan", item: p, title: "Plan Details" })}
                        className="rounded-lg px-2 py-1"
                        style={{ backgroundColor: accent }}
                      >
                        <Text className="text-white text-[11px]">
                          View Details
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View className="ml-3 items-center">
                    <Pressable onPress={() => onEdit(p)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-2">
                      <IconMC
                        name="pencil-outline"
                        size={18}
                        color={theme === "dark" ? "#cbd5e1" : "#475569"}
                      />
                    </Pressable>
                    <Pressable onPress={() => onDelete(p)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                      <IconMC
                        name="trash-can-outline"
                        size={18}
                        color={theme === "dark" ? "#f87171" : "#ef4444"}
                      />
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
