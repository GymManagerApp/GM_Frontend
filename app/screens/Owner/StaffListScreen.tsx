import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Alert, FlatList } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import { listGymUsers, deleteGymUser, getGymUserById, type GymUser } from "@/app/services/gymUsers";

type Staff = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status?: "active" | "pending" | "inactive";
};

export default function StaffListScreen() {
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<Staff[]>([]);
  const isFocused = useIsFocused();

  const mapGymUserToStaff = (gu: GymUser): Staff => ({
    id: gu._id,
    name: gu.userInfo?.name || "",
    email: gu.userInfo?.email || "",
    phone: gu.userInfo?.phone || "",
    role: gu.role === 0 ? "Admin" : "Staff",
    status: gu.isActive === 1 ? "active" : "inactive",
  });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const list = await listGymUsers();
      setStaff((list || []).map(mapGymUserToStaff));
    } catch (e: any) {
      console.error("Failed to load staff:", e?.message || e);
      Alert.alert("Error", e?.response?.data?.message || e?.message || "Failed to load staff");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleViewDetails = useCallback(async (id: string) => {
    try {
      const gu = await getGymUserById(id);
      const item = mapGymUserToStaff(gu);
      navigation.navigate("DetailsDrawer", {
        type: "member",
        item: { ...item, status: item.status, role: item.role },
        title: "Staff Details",
      });
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message || e?.message || "Failed to load staff details");
    }
  }, [navigation]);

  const handleEdit = useCallback(async (id: string) => {
    try {
      const gu = await getGymUserById(id);
      const s = mapGymUserToStaff(gu);
      navigation.navigate("StaffRegistrationScreen", { editId: id, preset: { ...s, gymId: gu.gymId } });
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message || e?.message || "Failed to load staff for edit");
    }
  }, [navigation]);

  useEffect(() => {
    if (isFocused) load();
  }, [isFocused, load]);

  const filtered = useMemo(
    () =>
      staff.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.email.toLowerCase().includes(query.toLowerCase()) ||
          s.phone.toLowerCase().includes(query.toLowerCase()) ||
          s.role.toLowerCase().includes(query.toLowerCase())
      ),
    [query, staff]
  );

  const badgeStyle = (s?: Staff["status"]) => {
    switch (s) {
      case "active":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/40",
          text: "text-emerald-700 dark:text-emerald-300",
          label: "Active",
        };
      case "pending":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/40",
          text: "text-amber-700 dark:text-amber-300",
          label: "Pending",
        };
      case "inactive":
      default:
        return {
          bg: "bg-rose-100 dark:bg-rose-900/40",
          text: "text-rose-700 dark:text-rose-300",
          label: "Inactive",
        };
    }
  };

  return (
    <ScreenWrapper title="Staff" theme={theme} scroll={false}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          nestedScrollEnabled
          removeClippedSubviews
          windowSize={7}
          initialNumToRender={10}
          ListHeaderComponent={
            <View className="px-4 mt-1">
              <View className="flex-row items-center border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900">
                <IconMC
                  name="magnify"
                  size={20}
                  color={theme === "dark" ? "#94a3b8" : "#64748b"}
                />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search staff by name, role, email or phone"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#94a3b8"}
                  className="ml-2 flex-1 text-slate-900 dark:text-gray-100"
                />
              </View>
              {/* Add New Staff Button */}
              <Pressable
                onPress={() => navigation.navigate("StaffRegistrationScreen")}
                className="mt-3 rounded-xl px-4 py-3 flex-row items-center justify-center"
                style={{ backgroundColor: accent }}
              >
                <IconMC
                  name="account-plus-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-white font-semibold">Add New Staff</Text>
              </Pressable>
            </View>
          }
          ListEmptyComponent={
            <View className="px-4 mt-3">
              {loading ? (
                <Text className="text-slate-600 dark:text-gray-300 mb-3">Loading staff...</Text>
              ) : (
                <Text className="text-slate-600 dark:text-gray-300 mb-3">No staff found</Text>
              )}
            </View>
          }
          renderItem={({ item: s, index: idx }) => {
            const active = selected === idx;
            const b = badgeStyle(s.status);
            return (
              <View
                key={s.id}
                className={`p-4 mb-3 rounded-xl bg-white dark:bg-slate-900 flex-row items-center justify-between ${
                  active
                    ? "border-2"
                    : "border border-slate-200 dark:border-gray-800"
                }`}
                style={
                  active
                    ? {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 1,
                        borderColor: accent,
                      }
                    : {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 1,
                      }
                }
              >
                <View className="flex-1 pr-3">
                  <Text className="text-slate-900 dark:text-gray-100 font-semibold">
                    {s.name}
                  </Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-300 mt-1">
                    {s.role}
                  </Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                    {s.email}
                  </Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                    {s.phone}
                  </Text>
                  <View className="mt-2 flex-row items-center">
                    <View
                      className={`self-start px-2 py-1 rounded-full ${b.bg}`}
                    >
                      <Text className={`text-[10px] ${b.text}`}>
                        {b.label}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => { console.log('[StaffList] View pressed', s.id); handleViewDetails(s.id); }}
                      className="ml-3 rounded-lg px-2 py-1"
                      style={{ backgroundColor: accent }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text className="text-white text-[11px]">
                        View Details
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View className="ml-3 items-center">
                  <Pressable
                    onPress={() => { console.log('[StaffList] Edit pressed', s.id); handleEdit(s.id); }}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-2"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <IconMC
                      name="pencil-outline"
                      size={18}
                      color={theme === "dark" ? "#cbd5e1" : "#475569"}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      Alert.alert("Delete Staff", `Are you sure you want to delete ${s.name || "this staff"}?`, [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: async () => {
                            try {
                              await deleteGymUser(s.id);
                              await load();
                            } catch (e: any) {
                              Alert.alert("Error", e?.response?.data?.message || e?.message || "Failed to delete staff");
                            }
                          },
                        },
                      ]);
                    }}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <IconMC
                      name="trash-can-outline"
                      size={18}
                      color={theme === "dark" ? "#f87171" : "#ef4444"}
                    />
                  </Pressable>
                </View>
              </View>
            );
          }}
          ListFooterComponent={<View style={{ height: 8 }} />}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </ScreenWrapper>
  );
}
