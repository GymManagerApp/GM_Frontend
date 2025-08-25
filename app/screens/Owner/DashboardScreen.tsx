import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@/components/theme/ThemeContext';

export default function OwnerDashboardScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');
  const navigation = useNavigation<any>();
  const locations = [
    { name: 'Fitness Hub - Downtown', address: '123 Main St, Anytown', status: 'Active' },
    { name: 'Powerhouse Gym - Uptown', address: '456 Oak Ave, Big City', status: 'Inactive' },
    { name: 'Elite Fitness - East', address: '789 Pine Rd, Smallville', status: 'Active' },
    { name: 'Iron Grip Gym - West', address: '321 Maple Ln, Metropolis', status: 'Active' },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Top Section */}
        <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-slate-900 dark:text-gray-100">Owner Dashboard</Text>
          <View className="flex-row items-center">
            <IconMC name="bell-outline" size={22} color={accent} style={{ marginRight: 12 }} />
            <Image source={{ uri: 'https://i.pravatar.cc/50' }} className="w-8 h-8 rounded-full" />
          </View>
        </View>

        {/* Metric Cards */}
        <View className="px-4">
          <View className="flex-row gap-4">
            <View className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <IconMC name="home-outline" size={30} color={accent} style={{ marginRight: 8 }} />
              <View>
                <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">5</Text>
                <Text className="text-xs text-slate-600 dark:text-gray-400">Gyms/Branches</Text>
              </View>
            </View>
            <View className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
              <IconMC name="account-group-outline" size={30} color={accent} style={{ marginRight: 8 }} />
              <View>
                <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">120</Text>
                <Text className="text-xs text-slate-600 dark:text-gray-400">Active Members</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 pt-2">
          <View className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex-row items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 }}>
            <IconMC name="credit-card-outline" size={28} color={accent} style={{ marginRight: 8 }} />
            <View>
              <Text className="text-2xl font-bold text-slate-900 dark:text-gray-100">$8</Text>
              <Text className="text-xs text-slate-600 dark:text-gray-400">Upcoming Payments</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-4 pt-4 gap-3">
          <Pressable className="rounded-xl py-3 px-4 flex-row items-center justify-center" style={{ backgroundColor: accent }} onPress={() => navigation.navigate('Gyms')}>
            <IconMC name="home-plus-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-medium">Add Gym/Branch</Text>
          </Pressable>
          <Pressable className="rounded-xl py-3 px-4 flex-row items-center justify-center" style={{ backgroundColor: accent }} onPress={() => navigation.navigate('Staff', { screen: 'StaffRegistrationScreen' })}>
            <IconMC name="account-plus-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-medium">Add Staff</Text>
          </Pressable>
          <Pressable className="rounded-xl py-3 px-4 flex-row items-center justify-center" style={{ backgroundColor: accent }} onPress={() => navigation.navigate('Members', { screen: 'MemberRegistrationScreen' })}>
            <IconMC name="account-plus-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-medium">Register Member</Text>
          </Pressable>
        </View>

        {/* My Locations */}
        <View className="px-4 mt-4">
          <Text className="text-base font-semibold text-slate-900 dark:text-gray-100 mb-2">My Locations</Text>
          <View className="gap-2">
            {locations.map((loc, idx) => (
              <View
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800 rounded-lg flex-row items-center justify-between py-3 px-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
              >
                <View className="flex-row items-center max-w-[75%]">
                  <IconMC name="map-marker-outline" size={20} color={accent} style={{ marginRight: 8 }} />
                  <View>
                    <Text className="text-slate-900 dark:text-gray-100 font-semibold">{loc.name}</Text>
                    <Text className="text-xs text-slate-600 dark:text-gray-400">{loc.address}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className={`self-end px-2 py-1 rounded-full ${loc.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}> 
                    <Text className="text-white text-xs">{loc.status}</Text>
                  </View>
                  <Pressable onPress={() => navigation.navigate('DetailsDrawer', { type: 'location', item: loc, title: 'Location Details' })}
                            className="mt-2 self-end rounded-lg py-1.5 px-2"
                            style={{ backgroundColor: accent }}>
                    <Text className="text-white text-[11px]">View Details</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      
    </View>
  );
}
