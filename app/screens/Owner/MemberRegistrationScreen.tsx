import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, Pressable } from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@/components/theme/ThemeContext';

export default function MemberRegistrationScreen() {
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending' | 'Advance'>('Paid');
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Bar */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900 dark:text-gray-100">Register Member</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color={accent} style={{ marginRight: 12 }} />
            <Image source={{ uri: 'https://i.pravatar.cc/50' }} className="w-8 h-8 rounded-full" />
          </View>
        </View>

        {/* Form */}
        <View className="px-4 mt-3">
          <View className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-gray-800"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            {/* Name */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Member Name</Text>
            <TextInput placeholder="Enter full name" placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#94a3b8'}
              className="border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-950 mb-4" />

            {/* Phone */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Phone Number</Text>
            <TextInput placeholder="Enter phone number" keyboardType="phone-pad" placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#94a3b8'}
              className="border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-950 mb-4" />

            {/* Email */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Email</Text>
            <TextInput placeholder="Enter email" keyboardType="email-address" placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#94a3b8'}
              className="border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-950 mb-4" />

            {/* Address */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Address</Text>
            <TextInput placeholder="Enter address" placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#94a3b8'} multiline
              className="border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-3 text-slate-900 dark:text-gray-100 bg-white dark:bg-slate-950 mb-4" />

            {/* Assign Gym/Branch (Dropdown placeholder) */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Assign Gym/Branch</Text>
            <Pressable className="border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-3 flex-row items-center justify-between mb-4 bg-white dark:bg-slate-950">
              <Text className="text-slate-900 dark:text-gray-100">Select a gym/branch</Text>
              <IconMC name="menu-down" size={22} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
            </Pressable>

            {/* Membership Plan (Dropdown placeholder) */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Membership Plan</Text>
            <Pressable className="border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-3 flex-row items-center justify-between mb-4 bg-white dark:bg-slate-950">
              <Text className="text-slate-900 dark:text-gray-100">Select a plan</Text>
              <IconMC name="menu-down" size={22} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
            </Pressable>

            {/* Payment Status Chips */}
            <Text className="text-slate-700 dark:text-gray-300 text-sm mb-2">Payment Status</Text>
            <View className="flex-row gap-2 mb-4">
              {(['Paid','Pending','Advance'] as const).map((s) => (
                <Pressable key={s} onPress={() => setPaymentStatus(s)}
                  className={`px-4 py-2 rounded-full border ${paymentStatus === s ? 'border-2' : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-gray-800'}`}
                  style={paymentStatus === s ? { backgroundColor: accent, borderColor: accent } : undefined}
                >
                  <Text className={`${paymentStatus === s ? 'text-white' : 'text-slate-700 dark:text-gray-300'} text-sm`}>{s}</Text>
                </Pressable>
              ))}
            </View>

            {/* Submit */}
            <Pressable className="rounded-xl py-3 px-4 items-center justify-center mt-1" style={{ backgroundColor: accent }}>
              <Text className="text-white font-medium">Register Member</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

    </View>
  );
}