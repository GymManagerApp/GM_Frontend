import React from 'react';
import { View, Text, Pressable, ScrollView, InteractionManager } from 'react-native';
import { useRoute, useNavigation, RouteProp, CommonActions } from '@react-navigation/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@/components/theme/ThemeContext';

// Generic typing for route params
export type DetailsDrawerParams = {
  type: 'gym' | 'member' | 'plan' | 'notification' | 'location' | 'enquiry' | 'quickActions';
  item?: any;
  title?: string;
  // For quick actions
  actions?: { label: string; icon: string; route: string; params?: any }[];
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
    <View className="flex-1">
      {/* Backdrop (semi-transparent) */}
      <Pressable onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        className="bg-black/40"
      />

      {/* Bottom Sheet overlay (absolute, so it won't resize background) */}
      <View
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
        className="bg-white dark:bg-slate-900 rounded-t-2xl p-4 border-t border-slate-200 dark:border-gray-800"
      >
        {/* Handle */}
        <View className="items-center mb-3">
          <View className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-gray-700" />
        </View>

        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-semibold text-slate-900 dark:text-gray-100">
            {params?.title || `View ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </Text>
          {type !== 'quickActions' && (
            <Pressable onPress={() => navigation.goBack()} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <IconMC name="close" size={18} color={accent} />
            </Pressable>
          )}
        </View>

        <ScrollView className="max-h-[70%]" showsVerticalScrollIndicator={false}>
          {type === 'quickActions' && (
            <View className="flex-row flex-wrap gap-3">
              {(params?.actions || [
                { label: 'Gyms', icon: 'dumbbell', route: 'Gyms' },
                { label: 'Enquiry', icon: 'email-outline', route: 'Enquiry' },
                { label: 'Plans', icon: 'book-outline', route: 'Plans' },
                { label: 'Settings', icon: 'cog-outline', route: 'Profile' },
              ]).map((a) => (
                <Pressable
                  key={a.label}
                  onPress={() => {
                    // Dismiss the drawer first
                    navigation.goBack();
                    // Navigate after all close animations/interactions finish to avoid frozen UI
                    InteractionManager.runAfterInteractions(() => {
                      // Find the ancestor navigator that has 'MainTabs' in its route names
                      let targetNav: any = navigation;
                      let probe: any = navigation;
                      while (probe?.getParent?.()) {
                        const next = probe.getParent();
                        const routeNames = next?.getState?.()?.routeNames || [];
                        if (Array.isArray(routeNames) && routeNames.includes('MainTabs')) {
                          targetNav = next;
                          break;
                        }
                        probe = next;
                      }
                      targetNav.navigate('MainTabs', { screen: a.route });
                    });
                  }}
                  className="w-[47%] rounded-xl p-3 border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex-row items-center"
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: accent + '22' }}>
                    <IconMC name={a.icon as any} size={22} color={accent} />
                  </View>
                  <Text className="text-slate-900 dark:text-gray-100 font-medium">{a.label}</Text>
                </Pressable>
              ))}
            </View>
          )}

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

          {type === 'enquiry' && (
            <View>
              <Section label="Subject" value={item?.subject} />
              <Section label="Sender" value={item?.sender} />
              <Section label="Email" value={item?.email} />
              <Section label="Message" value={item?.message} />
              <Section label="Status" value={item?.status} />
              <Section label="Created" value={item?.createdAt} />
              <View className="flex-row gap-2 mt-3">
                <Pressable className="px-3 py-2 rounded-lg" style={{ backgroundColor: accent }} onPress={() => navigation.goBack()}>
                  <Text className="text-white text-sm">Mark Resolved</Text>
                </Pressable>
                <Pressable className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Text className="text-slate-700 dark:text-slate-300 text-sm">Reply</Text>
                </Pressable>
                <Pressable className="px-3 py-2 rounded-lg border border-red-300/50">
                  <Text className="text-red-600 text-sm">Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>

        {type !== 'quickActions' && (
          <Pressable
            className="mt-3 rounded-xl py-3 items-center"
            style={{ backgroundColor: accent }}
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-medium">Close</Text>
          </Pressable>
        )}
        {type === 'quickActions' && (
          <View className="items-center mt-3">
            <Pressable onPress={() => navigation.goBack()} className="w-12 h-12 rounded-full items-center justify-center bg-slate-100 dark:bg-slate-800">
              <IconMC name="close" size={22} color={accent} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
