import React, { useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export default function OwnerDashboardScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const navigation = useNavigation<any>();
  // Demo data (replace with API once available)
  const members = [
    { id: 'm1', name: 'Amit Sharma', joinedAt: new Date(), renewalsThisMonth: 0, plan: 'Gold', expiresAt: new Date(Date.now() + 3*24*3600*1000) },
    { id: 'm2', name: 'Priya Verma', joinedAt: new Date(Date.now() - 2*24*3600*1000), renewalsThisMonth: 1, plan: 'Silver', expiresAt: new Date(Date.now() + 1*24*3600*1000) },
    { id: 'm3', name: 'Rahul Singh', joinedAt: new Date(), renewalsThisMonth: 0, plan: 'Gold', expiresAt: new Date() },
    { id: 'm4', name: 'Sneha Iyer', joinedAt: new Date(Date.now() - 7*24*3600*1000), renewalsThisMonth: 1, plan: 'Platinum', expiresAt: new Date(Date.now() + 10*24*3600*1000) },
    { id: 'm5', name: 'Karan Mehta', joinedAt: new Date(), renewalsThisMonth: 0, plan: 'Silver', expiresAt: new Date(Date.now() + 24*3600*1000) },
    { id: 'm6', name: 'Riya Kapoor', joinedAt: new Date(Date.now() - 15*24*3600*1000), renewalsThisMonth: 1, plan: 'Gold', expiresAt: new Date(Date.now() + 2*24*3600*1000) },
    { id: 'm7', name: 'Dev Patel', joinedAt: new Date(Date.now() - 1*24*3600*1000), renewalsThisMonth: 0, plan: 'Gold', expiresAt: new Date(Date.now() + 5*24*3600*1000) },
  ];
  const enquiriesToday = 4;

  const today = new Date();
  const fmtDate = today.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

  const metrics = useMemo(() => {
    const totalActive = members.length; // demo
    const expiringSoon = members.filter(m => (m.expiresAt.getTime() - today.getTime()) <= 7*24*3600*1000 && m.expiresAt >= startOfDay).length;
    const expiringToday = members.filter(m => m.expiresAt >= startOfDay && m.expiresAt <= endOfDay).length;
    const todaysNew = members.filter(m => m.joinedAt >= startOfDay && m.joinedAt <= endOfDay).length;
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0, 23, 59, 59, 999);
    const monthNew = members.filter(m => m.joinedAt >= monthStart && m.joinedAt <= monthEnd).length;
    const monthRenew = members.filter(m => m.renewalsThisMonth > 0).length;
    const topExpiring = [...members].sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime()).slice(0, 5);
    const topNew = [...members].sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime()).slice(0, 5);
    return { totalActive, expiringSoon, expiringToday, todaysNew, monthNew, monthRenew, topExpiring, topNew };
  }, [members]);

  const locations = [
    {
      name: "Fitness Hub - Downtown",
      address: "123 Main St, Anytown",
      status: "Active",
    },
    {
      name: "Powerhouse Gym - Uptown",
      address: "456 Oak Ave, Big City",
      status: "Inactive",
    },
    {
      name: "Elite Fitness - East",
      address: "789 Pine Rd, Smallville",
      status: "Active",
    },
    {
      name: "Iron Grip Gym - West",
      address: "321 Maple Ln, Metropolis",
      status: "Active",
    },
  ];

  return (
    <ScreenWrapper title="Owner Dashboard" theme={theme}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <ScrollView>
          {/* Top: Date + Today's New Joinings */}
          <View className="px-4 pt-2">
            <View className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center justify-between"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <View>
                <Text className="text-xs text-slate-600 dark:text-gray-400">Today</Text>
                <Text className="text-base font-semibold text-slate-900 dark:text-gray-100">{fmtDate}</Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-slate-600 dark:text-gray-400">Today's New Joinings</Text>
                <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{metrics.todaysNew}</Text>
              </View>
            </View>
          </View>

          {/* Row 1: Total Active Members + Expiring Soon */}
          <View className="px-4 pt-3">
            <View className="flex-row gap-4">
              <Pressable onPress={() => navigation.navigate('Members', { screen: 'MemberList' })}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
                <IconMC name="account-group-outline" size={28} color={accent} style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{metrics.totalActive}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-400">Active Members</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Members', { screen: 'MemberList' })}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
                <IconMC name="calendar-alert" size={28} color={accent} style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{metrics.expiringSoon}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-400">Expiring Soon (7d)</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Row 2: Expiring Today + Today's Enquiry */}
          <View className="px-4 pt-3">
            <View className="flex-row gap-4">
              <Pressable onPress={() => navigation.navigate('Members', { screen: 'MemberList' })}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
                <IconMC name="calendar-today" size={28} color={accent} style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{metrics.expiringToday}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-400">Expiring Today</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Enquiry', { screen: 'EnquiryList' })}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
                <IconMC name="email-outline" size={28} color={accent} style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{enquiriesToday}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-400">Today's Enquiries</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* This Month */}
          <View className="px-4 pt-4">
            <Text className="text-sm font-semibold text-slate-900 dark:text-gray-100 mb-2">This Month</Text>
            <View className="flex-row gap-4">
              <Pressable onPress={() => navigation.navigate('Members', { screen: 'MemberList' })}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
                <IconMC name="account-plus-outline" size={28} color={accent} style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{metrics.monthNew}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-400">New Members</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Members', { screen: 'MemberList' })}
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
                <IconMC name="autorenew" size={28} color={accent} style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">{metrics.monthRenew}</Text>
                  <Text className="text-xs text-slate-600 dark:text-gray-400">Renewals</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="px-4 pt-4 gap-3">
            <Pressable
              className="rounded-xl py-3 px-4 flex-row items-center justify-center"
              style={{ backgroundColor: accent }}
              onPress={() => navigation.navigate('Gyms')}
            >
              <IconMC
                name="home-plus-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-medium">Add Gym/Branch</Text>
            </Pressable>
            <Pressable
              className="rounded-xl py-3 px-4 flex-row items-center justify-center"
              style={{ backgroundColor: accent }}
              onPress={() => navigation.navigate('Staff', { screen: 'StaffRegistrationScreen' })}
            >
              <IconMC
                name="account-plus-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-medium">Add Staff</Text>
            </Pressable>
            <Pressable
              className="rounded-xl py-3 px-4 flex-row items-center justify-center"
              style={{ backgroundColor: accent }}
              onPress={() => navigation.navigate('Members', { screen: 'MemberRegistrationScreen' })}
            >
              <IconMC
                name="account-plus-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-medium">Register Member</Text>
            </Pressable>
          </View>

          {/* My Locations */}
          <View className="px-4 mt-4">
            <Text className="text-base font-semibold text-slate-900 dark:text-gray-100 mb-2">
              My Locations
            </Text>
            <View className="gap-2">
              {locations.map((loc, idx) => (
                <View
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 rounded-lg flex-row items-center justify-between py-3 px-4"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <View className="flex-row items-center max-w-[75%]">
                    <IconMC
                      name="map-marker-outline"
                      size={20}
                      color={accent}
                      style={{ marginRight: 8 }}
                    />
                    <View>
                      <Text className="text-slate-900 dark:text-gray-100 font-semibold">
                        {loc.name}
                      </Text>
                      <Text className="text-xs text-slate-600 dark:text-gray-400">
                        {loc.address}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      loc.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <Text className="text-white text-xs">{loc.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Tables: Top 5 Expiring Members */}
          <View className="px-4 mt-6">
            <Text className="text-base font-semibold text-slate-900 dark:text-gray-100 mb-2">Top 5 Expiring Members</Text>
            <View className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <View className="flex-row px-3 py-2 bg-slate-50 dark:bg-slate-800/60">
                <Text className="flex-1 text-xs font-semibold text-slate-600 dark:text-gray-300">Name</Text>
                <Text className="w-24 text-xs font-semibold text-slate-600 dark:text-gray-300">Plan</Text>
                <Text className="w-28 text-xs font-semibold text-slate-600 dark:text-gray-300">Expires</Text>
              </View>
              {metrics.topExpiring.map((m) => (
                <Pressable key={m.id} onPress={() => navigation.navigate('Members', { screen: 'MemberList' })} className="flex-row px-3 py-3 border-t border-slate-200 dark:border-slate-800">
                  <Text className="flex-1 text-sm text-slate-900 dark:text-gray-100">{m.name}</Text>
                  <Text className="w-24 text-sm text-slate-700 dark:text-gray-300">{m.plan}</Text>
                  <Text className="w-28 text-sm text-slate-700 dark:text-gray-300">{m.expiresAt.toLocaleDateString()}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Tables: Top 5 New Members */}
          <View className="px-4 mt-6 mb-6">
            <Text className="text-base font-semibold text-slate-900 dark:text-gray-100 mb-2">Top 5 New Members</Text>
            <View className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <View className="flex-row px-3 py-2 bg-slate-50 dark:bg-slate-800/60">
                <Text className="flex-1 text-xs font-semibold text-slate-600 dark:text-gray-300">Name</Text>
                <Text className="w-24 text-xs font-semibold text-slate-600 dark:text-gray-300">Plan</Text>
                <Text className="w-28 text-xs font-semibold text-slate-600 dark:text-gray-300">Joined</Text>
              </View>
              {metrics.topNew.map((m) => (
                <Pressable key={m.id} onPress={() => navigation.navigate('Members', { screen: 'MemberList' })} className="flex-row px-3 py-3 border-t border-slate-200 dark:border-slate-800">
                  <Text className="flex-1 text-sm text-slate-900 dark:text-gray-100">{m.name}</Text>
                  <Text className="w-24 text-sm text-slate-700 dark:text-gray-300">{m.plan}</Text>
                  <Text className="w-28 text-sm text-slate-700 dark:text-gray-300">{m.joinedAt.toLocaleDateString()}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
