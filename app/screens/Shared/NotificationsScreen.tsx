import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@/components/theme/ThemeContext';

type Category = 'All' | 'Payments' | 'Renewals' | 'General';
type Status = 'unread' | 'read';

type NotificationItem = {
  id: string;
  category: Exclude<Category, 'All'>;
  status: Status;
  sender: 'GymLink System' | 'Membership Team' | 'Gym Management' | 'System Admin';
  message: string;
  time: string;
  icon: string;
};

const initialData: NotificationItem[] = [
  { id: '1', category: 'Payments', status: 'unread', sender: 'GymLink System', message: 'Payment received for Plan Gold - $49.99', time: 'Just now', icon: 'cash-fast' },
  { id: '2', category: 'Renewals', status: 'unread', sender: 'Membership Team', message: 'Membership renewal due in 3 days for John D.', time: '5 min ago', icon: 'refresh' },
  { id: '3', category: 'General', status: 'read', sender: 'Gym Management', message: 'New Zumba class added to the weekly schedule.', time: '2 hours ago', icon: 'bullhorn' },
  { id: '4', category: 'Payments', status: 'read', sender: 'System Admin', message: 'Payout initiated to your bank account.', time: 'Yesterday', icon: 'bank-transfer' },
];

export default function NotificationsScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === 'dark' ? '#4EA1FF' : '#1d74f5');
  const [active, setActive] = useState<Category>('All');
  const [items, setItems] = useState<NotificationItem[]>(initialData);

  const data = useMemo(() => {
    if (active === 'All') return items;
    return items.filter(n => n.category === active);
  }, [active, items]);

  const markAsRead = (id: string) => {
    setItems(prev => prev.map(n => (n.id === id ? { ...n, status: 'read' } : n)));
  };

  const Tab = ({ label }: { label: Category }) => {
    const isActive = active === label;
    return (
      <Pressable onPress={() => setActive(label)} className={`px-3 py-2 rounded-full mr-2 ${isActive ? '' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-gray-800'}`}
        style={{ backgroundColor: isActive ? accent : undefined, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: isActive ? 0.15 : 0.05, shadowRadius: 3, elevation: isActive ? 2 : 1 }}
      >
        <Text className={`text-xs ${isActive ? 'text-white' : 'text-slate-700 dark:text-gray-300'}`}>{label}</Text>
      </Pressable>
    );
  };

  const Badge = ({ status }: { status: Status }) => {
    const isUnread = status === 'unread';
    return (
      <View className={`px-2 py-1 rounded-full ${isUnread ? 'bg-rose-100 dark:bg-rose-900/40' : 'bg-slate-100 dark:bg-gray-800'}`}>
        <Text className={`text-[10px] ${isUnread ? 'text-rose-700 dark:text-rose-300' : 'text-slate-600 dark:text-gray-300'}`}>{isUnread ? 'Unread' : 'Read'}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className="px-4 pt-6 pb-2 bg-white dark:bg-slate-950">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-slate-900 dark:text-gray-100">Notifications</Text>
            <View className="w-9 h-9 rounded-full bg-slate-200 dark:bg-gray-700" />
          </View>
        </View>

        {/* Filter Tabs */}
        <View className="px-4 mt-2 flex-row">
          <Tab label="All" />
          <Tab label="Payments" />
          <Tab label="Renewals" />
          <Tab label="General" />
        </View>

        {/* List */}
        <View className="px-4 mt-3">
          {data.map((n) => (
            <View key={n.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-3 mb-3 flex-row border border-slate-200 dark:border-gray-800"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
            >
              <View className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center mr-3">
                <IconMC name={n.icon} size={20} color={accent} />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-slate-900 dark:text-gray-100 font-semibold text-sm">{n.sender}</Text>
                  <Badge status={n.status} />
                </View>
                <Text className="text-slate-700 dark:text-gray-300 text-xs mt-1">{n.message}</Text>
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-[11px] text-slate-500 dark:text-gray-400">{n.time}</Text>
                  <View className="flex-row items-center">
                    <Pressable className="mr-4">
                      <Text className="text-[12px]" style={{ color: accent }}>View Details</Text>
                    </Pressable>
                    {n.status === 'unread' && (
                      <Pressable onPress={() => markAsRead(n.id)}>
                        <Text className="text-[12px] text-emerald-600 dark:text-emerald-400">Mark as Read</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}