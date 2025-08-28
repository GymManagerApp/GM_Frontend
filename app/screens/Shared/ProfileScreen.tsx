import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { InteractionManager } from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { theme, toggleTheme, accentColor, setAccentColor } = useAppTheme();
  const { logout } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@gym.com");
  const [phone, setPhone] = useState("+91 98765 43210");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifNewMembers, setNotifNewMembers] = useState(true);
  const [notifPayments, setNotifPayments] = useState(true);
  const [notifSchedule, setNotifSchedule] = useState(false);
  const [notifPromos, setNotifPromos] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const placeholder = theme === "dark" ? "#6b7280" : "#94a3b8";
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const accentStyle = useMemo(() => ({ backgroundColor: accent }), [accent]);
  const accentTextStyle = useMemo(() => ({ color: "#ffffff" }), []);
  const cardShadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  } as const;

  return (
    <ScreenWrapper title="Profile & Settings" theme={theme}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <View style={{ paddingBottom: 40 }}>
          {/* Header */}
          <View className="px-4 pt-6 pb-2">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4 flex-row items-center justify-between border border-slate-200 dark:border-gray-800"
              style={cardShadow}
            >
              <Text className="text-lg font-semibold text-slate-900 dark:text-gray-100">
                Color Theme
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center mr-3">
                  <IconMC
                    name={
                      theme === "dark"
                        ? "moon-waning-crescent"
                        : "white-balance-sunny"
                    }
                    size={18}
                    color={theme === "dark" ? "#9ca3af" : "#64748b"}
                    style={{ marginRight: 6 }}
                  />
                  <Switch
                    value={theme === "dark"}
                    onValueChange={toggleTheme}
                    trackColor={{ true: accent, false: "#cbd5e1" }}
                    thumbColor={"#ffffff"}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Accent Color Picker */}
          <View className="px-4 mt-2">
            <View className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800">
              <Text className="text-slate-900 dark:text-gray-100 font-semibold mb-3">
                Accent Color
              </Text>
              <Text className="text-slate-600 dark:text-gray-400 text-xs mb-3">
                Choose the primary accent used for buttons, icons, and
                highlights.
              </Text>
              <View className="flex-row flex-wrap -mx-1">
                {[
                  "#1d74f5",
                  "#4EA1FF",
                  "#10b981",
                  "#22c55e",
                  "#f59e0b",
                  "#ef4444",
                  "#8b5cf6",
                  "#14b8a6",
                  "#3b82f6",
                  "#e11d48",
                ].map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => setAccentColor(c)}
                    className="m-1"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: c,
                      borderWidth: c === accent ? 3 : 0,
                      borderColor: theme === "dark" ? "#e5e7eb" : "#111827",
                    }}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Personal Information */}
          <View className="px-4 mt-2">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800"
              style={cardShadow}
            >
              <Text className="text-slate-900 dark:text-gray-100 font-semibold mb-3">
                Personal Information
              </Text>

              <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">
                Full Name
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Jane Doe"
                placeholderTextColor={placeholder}
                className="border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-200 mb-4 bg-white dark:bg-slate-800"
              />

              <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor={placeholder}
                className="border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-200 mb-4 bg-white dark:bg-slate-800"
              />

              <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+91 90000 00000"
                placeholderTextColor={placeholder}
                className="border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-200 mb-4 bg-white dark:bg-slate-800"
              />

              {/* Role Badge */}
              <View className="flex-row items-center justify-between mt-1">
                <View className="flex-row items-center">
                  <Text className="text-slate-700 dark:text-gray-300 text-sm mr-3">
                    Role
                  </Text>
                  <View
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: theme === "dark" ? "#0b1220" : "#eff6ff",
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#1e3a8a" : "#bfdbfe",
                    }}
                  >
                    <Text className="text-[10px]" style={{ color: accent }}>
                      Owner
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable
                className="mt-4 rounded-xl py-3 items-center justify-center"
                style={accentStyle}
              >
                <Text className="font-semibold" style={accentTextStyle}>
                  Save Changes
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Security */}
          <View className="px-4 mt-3">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800"
              style={cardShadow}
            >
              <Text className="text-slate-900 dark:text-gray-100 font-semibold mb-3">
                Security
              </Text>

              <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">
                Current Password
              </Text>
              <TextInput
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="••••••••"
                placeholderTextColor={placeholder}
                className="border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-200 mb-4 bg-white dark:bg-slate-800"
              />

              <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">
                New Password
              </Text>
              <TextInput
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="••••••••"
                placeholderTextColor={placeholder}
                className="border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-200 mb-4 bg-white dark:bg-slate-800"
              />

              <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">
                Confirm Password
              </Text>
              <TextInput
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                placeholderTextColor={placeholder}
                className="border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-200 mb-4 bg-white dark:bg-slate-800"
              />

              <Pressable
                className="mt-2 rounded-xl py-3 items-center justify-center"
                style={accentStyle}
              >
                <Text className="font-semibold" style={accentTextStyle}>
                  Update Password
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Notification Preferences */}
          <View className="px-4 mt-3">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800"
              style={cardShadow}
            >
              <Text className="text-slate-900 dark:text-gray-100 font-semibold mb-3">
                Notification Preferences
              </Text>

              {[
                {
                  label: "New member registrations",
                  value: notifNewMembers,
                  setter: setNotifNewMembers,
                },
                {
                  label: "Payment reminders",
                  value: notifPayments,
                  setter: setNotifPayments,
                },
                {
                  label: "Class schedule updates",
                  value: notifSchedule,
                  setter: setNotifSchedule,
                },
                {
                  label: "Promotional offers",
                  value: notifPromos,
                  setter: setNotifPromos,
                },
              ].map((t) => (
                <View
                  key={t.label}
                  className="flex-row items-center justify-between py-2"
                >
                  <Text className="text-slate-700 dark:text-gray-300">
                    {t.label}
                  </Text>
                  <Switch
                    value={t.value}
                    onValueChange={t.setter as any}
                    trackColor={{
                      true: theme === "dark" ? "#4EA1FF" : "#1d74f5",
                      false: "#cbd5e1",
                    }}
                    thumbColor={"#ffffff"}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Danger Zone */}
          <View className="px-4 mt-3">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800"
              style={cardShadow}
            >
              <Text className="text-rose-600 font-semibold mb-2">
                Danger Zone
              </Text>
              <Text className="text-slate-600 dark:text-gray-400 text-xs mb-3">
                Deleting your account is irreversible. All data will be
                permanently removed.
              </Text>
              <Pressable className="bg-rose-600 dark:bg-rose-500 rounded-xl py-3 items-center justify-center">
                <Text className="text-white font-semibold">Delete Account</Text>
              </Pressable>
            </View>
          </View>

          {/* Logout */}
          <View className="px-4 mt-4 mb-6">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-rose-600 dark:bg-rose-500 rounded-xl py-3 items-center justify-center"
              onPressIn={() => console.log('[Logout] onPressIn')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              disabled={loggingOut}
              style={{ opacity: loggingOut ? 0.7 : 1 }}
              onPress={async () => {
                if (loggingOut) return;
                setLoggingOut(true);
                try {
                  console.log('[Logout] onPress');
                  await logout();
                  console.log('[Logout] token cleared, navigating to root');
                  router.replace('/');
                } finally {
                  if (isMounted.current) setLoggingOut(false);
                }
              }}
              onPressOut={async () => {
                // Fallback in case onPress gets canceled by a slight scroll
                if (loggingOut) return;
                console.log('[Logout] onPressOut fallback');
                setLoggingOut(true);
                try {
                  await logout();
                  router.replace('/');
                } finally {
                  if (isMounted.current) setLoggingOut(false);
                }
              }}
            >
              <Text className="text-white font-semibold">{loggingOut ? 'Logging out...' : 'Logout'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
