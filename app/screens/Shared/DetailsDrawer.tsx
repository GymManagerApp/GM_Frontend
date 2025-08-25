import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@/components/theme/ThemeContext';

// Generic typing for route params
export type DetailsDrawerParams = {
  type: 'gym' | 'member' | 'plan' | 'notification' | 'location';
  item: any;
  title?: string;
};

export default function DetailsDrawer() {
  const route = useRoute<RouteProp<Record<string, DetailsDrawerParams>, string>>();
  const navigation = useNavigation<any>();
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');

  const params = route.params as DetailsDrawerParams;
  const { type, item } = params || { type: 'notification', item: {} };

  const Section = ({ label, value }: { label: string; value?: any }) => (
    <View className="mb-2">
      <Text className="text-[11px] text-slate-500 dark:text-gray-400 mb-0.5">{label}</Text>
      <Text className="text-sm text-slate-900 dark:text-gray-100">{String(value ?? '-')}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-black/40">
      {/* Backdrop */}
      <Pressable className="flex-1" onPress={() => navigation.goBack()} />

      {/* Bottom Sheet */}
      <View className="bg-white dark:bg-slate-900 rounded-t-2xl p-4 border-t border-slate-200 dark:border-gray-800"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 10 }}>
        {/* Handle */}
        <View className="items-center mb-3">
          <View className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-gray-700" />
        </View>

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-semibold text-slate-900 dark:text-gray-100">
            {params?.title || `View ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </Text>
          <Pressable onPress={() => navigation.goBack()} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
            <IconMC name="close" size={18} color={theme === 'dark' ? '#cbd5e1' : '#475569'} />
          </Pressable>
        </View>

        <ScrollView className="max-h-[70%]" showsVerticalScrollIndicator={false}>
          {type === 'gym' && (
            <View>
              <Section label="Name" value={item?.name} />
              <Section label="Address" value={item?.address} />
              <Section label="Email" value={item?.email} />
              <Section label="Note" value={item?.note} />
              <Section label="Status" value={item?.status} />
            </View>
          )}

          {type === 'member' && (
            <View>
              <Section label="Name" value={item?.name} />
              <Section label="Email" value={item?.email} />
              <Section label="Phone" value={item?.phone} />
              <Section label="Status" value={item?.status} />
            </View>
          )}

          {type === 'plan' && (
            <View>
              <Section label="Name" value={item?.name} />
              <Section label="Description" value={item?.desc} />
              <Section label="Price" value={item?.price} />
              <Section label="Duration (months)" value={item?.durationMonths} />
              {item?.popular != null && <Section label="Popular" value={item?.popular ? 'Yes' : 'No'} />}
            </View>
          )}

          {type === 'notification' && (
            <View>
              <Section label="Sender" value={item?.sender} />
              <Section label="Category" value={item?.category} />
              <Section label="Message" value={item?.message} />
              <Section label="Time" value={item?.time} />
              <Section label="Status" value={item?.status} />
            </View>
          )}

          {type === 'location' && (
            <View>
              <Section label="Name" value={item?.name} />
              <Section label="Address" value={item?.address} />
              <Section label="Status" value={item?.status} />
            </View>
          )}
        </ScrollView>

        <Pressable className="mt-3 rounded-xl py-3 items-center" style={{ backgroundColor: accent }} onPress={() => navigation.goBack()}>
          <Text className="text-white font-medium">Close</Text>
        </Pressable>
      </View>
    </View>
  );
}
