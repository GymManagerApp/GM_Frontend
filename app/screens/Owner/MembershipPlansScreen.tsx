import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@/components/theme/ThemeContext';

export default function MembershipPlansScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');
  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Bar */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900">Create/Edit Plan</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color={accent} style={{ marginRight: 12 }} />
            <View className="w-8 h-8 rounded-full bg-slate-200" />
          </View>
        </View>

        {/* Card: Create New Plan */}
        <View className="px-4 mt-2">
          <View className="bg-white rounded-xl p-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text className="text-slate-900 font-semibold mb-3">Create New Plan</Text>

            {/* Plan Name */}
            <Text className="text-slate-700 text-sm mb-2">Plan Name</Text>
            <TextInput placeholder="e.g., Premium Plus" placeholderTextColor="#94a3b8"
              className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4" />

            {/* Description */}
            <Text className="text-slate-700 text-sm mb-2">Description</Text>
            <TextInput placeholder="Short description of the plan" placeholderTextColor="#94a3b8" multiline
              className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4" />

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-slate-700 text-sm mb-2">Price (USD)</Text>
                <TextInput placeholder="$0.00" placeholderTextColor="#94a3b8" keyboardType="decimal-pad"
                  className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4" />
              </View>
              <View className="w-32">
                <Text className="text-slate-700 text-sm mb-2">Duration (Months)</Text>
                <TextInput placeholder="1" placeholderTextColor="#94a3b8" keyboardType="number-pad"
                  className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4" />
              </View>
            </View>

            {/* Key Features */}
            <Text className="text-slate-700 text-sm mb-2">Key Features</Text>
            <TextInput placeholder="Comma-separated or one per line" placeholderTextColor="#94a3b8" multiline
              className="border border-slate-200 rounded-lg px-3 py-3 text-slate-900 mb-4" />

            {/* Actions */}
            <View className="mt-2 flex-row gap-3">
              <Pressable className="flex-1 rounded-xl py-3 items-center justify-center" style={{ backgroundColor: accent }}>
                <Text className="text-white font-semibold">Submit Plan</Text>
              </Pressable>
              <Pressable className="flex-1 bg-white border border-slate-200 rounded-xl py-3 items-center justify-center">
                <Text className="text-slate-700 font-semibold">Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <View className="flex-row items-center justify-between">
          {[
            { key: 'Home', icon: 'home-outline' },
            { key: 'Plans', icon: 'clipboard-text-outline' },
            { key: 'Create Plan', icon: 'file-plus-outline' },
            { key: 'Profile', icon: 'account-circle-outline' },
          ].map((item) => {
            const active = item.key === 'Create Plan';
            return (
              <View key={item.key} className="items-center flex-1">
                <IconMC name={item.icon as any} size={22} color={active ? accent : '#64748b'} />
                <Text className={`text-xs mt-1 ${active ? '' : 'text-slate-500'}`} style={active ? { color: accent } : undefined}>{item.key}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}