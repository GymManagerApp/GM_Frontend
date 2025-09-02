import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Alert } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import { createGymUser, updateGymUser } from "@/app/services/gymUsers";
import { listGyms, type Gym } from "@/app/services/gyms";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function StaffRegistrationScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Admin" | "Staff">("Staff");
  const [gymId, setGymId] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [gymDropdownOpen, setGymDropdownOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const editingId: string | undefined = route.params?.editId;
  const preset = route.params?.preset as
    | { name?: string; email?: string; phone?: string; role?: string; status?: string }
    | undefined;

  useEffect(() => {
    if (preset) {
      setName(preset.name || "");
      setEmail(preset.email || "");
      setPhone(preset.phone || "");
      if (preset.role === "Admin" || preset.role === "Staff") setRole(preset.role);
      if ((preset as any).gymId) {
        setGymId((preset as any).gymId);
        setGymDropdownOpen(false);
      }
    }
  }, [preset]);

  useEffect(() => {
    // Load gyms for dropdown
    (async () => {
      try {
        const res = await listGyms();
        setGyms(res || []);
      } catch (e) {
        // non-blocking; user can still type gymId manually if needed
        console.warn('Failed to load gyms list');
      }
    })();
  }, []);

  const roleNumber = useMemo(() => (role === "Admin" ? 0 : 1), [role]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setRole("Staff");
    setGymId("");
    setGymDropdownOpen(false);
  };

  const onSubmit = async () => {
    if (!name && !email) {
      Alert.alert("Validation", "Please enter at least a name or email.");
      return;
    }
    if (!gymId) {
      Alert.alert("Validation", "Please enter a Gym ID to assign.");
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        await updateGymUser(editingId, {
          gymId,
          role: roleNumber,
          userInfo: { name, email, phone },
        });
      } else {
        await createGymUser({
          gymId,
          role: roleNumber,
          userInfo: { name, email, phone },
        });
      }
      Alert.alert("Success", `Staff ${editingId ? "updated" : "created"} successfully.`);
      resetForm();
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message || e?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenWrapper title="Add New Staff" theme={theme} scroll={false}>
      <View className="flex-1 bg-white dark:bg-slate-900">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80 }}
          style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Form Card */}
          <View className="px-4 mt-2">
            <View
              className="bg-white dark:bg-slate-800 rounded-xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Staff Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Imran Khan"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="e.g., +91 98765 43210"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 mb-4"
              />

              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="staff@gym.com"
                placeholderTextColor={placeholderColor}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 mb-4"
              />

              {/* Role chips */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Role</Text>
              <View className="flex-row gap-2 mb-4">
                {(["Admin", "Staff"] as const).map(r => (
                  <Pressable
                    key={r}
                    onPress={() => setRole(r)}
                    className={`px-3 py-2 rounded-full border ${
                      role === r
                        ? theme === "dark" ? "bg-slate-700 border-slate-600" : "bg-slate-100 border-slate-300"
                        : theme === "dark" ? "border-slate-700" : "border-slate-200"
                    }`}
                  >
                    <Text className={`text-xs ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>{r}</Text>
                  </Pressable>
                ))}
              </View>

              {/* Assign Gym dropdown */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Assign Gym</Text>
              <Pressable
                onPress={() => setGymDropdownOpen(o => !o)}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 flex-row items-center justify-between"
              >
                <Text className={`${gymId ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}>
                  {gymId ? gyms.find(g => g._id === gymId)?.name || gymId : 'Select a gym'}
                </Text>
                <IconMC name={gymDropdownOpen ? 'chevron-up' : 'chevron-down'} size={18} color={theme === 'dark' ? '#9ca3af' : '#94a3b8'} />
              </Pressable>
              {gymDropdownOpen && (
                <View className="mt-2 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <ScrollView style={{ maxHeight: 240 }}>
                    {gyms.map(g => (
                      <Pressable
                        key={g._id}
                        onPress={() => { setGymId(g._id); setGymDropdownOpen(false); }}
                        className={`px-3 py-3 ${gymId === g._id ? (theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100') : ''}`}
                      >
                        <Text className="text-slate-900 dark:text-slate-100">{g.name}</Text>
                      </Pressable>
                    ))}
                    {gyms.length === 0 && (
                      <View className="px-3 py-3">
                        <Text className="text-slate-500 dark:text-slate-400">No gyms found</Text>
                      </View>
                    )}
                  </ScrollView>
                </View>
              )}

              {/* Employment Status removed as requested */}

              <View className="mt-2 flex-row gap-3">
                <Pressable
                  onPress={onSubmit}
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: accent, opacity: submitting ? 0.7 : 1 }}
                >
                  <Text className="text-white font-semibold">{editingId ? "Update Staff" : "Register Staff"}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    resetForm();
                    navigation.goBack();
                  }}
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 items-center justify-center"
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold">
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
