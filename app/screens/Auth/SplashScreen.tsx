import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useAppTheme } from '@/components/theme/ThemeContext';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const { theme, accentColor } = useAppTheme();
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/auth/welcome'), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View className={theme === 'dark' ? 'dark flex-1 bg-white' : 'flex-1 bg-white'}>
      {/* Accent shapes */}
      <View style={{ position: 'absolute', top: -80, right: -60, width: 220, height: 220, backgroundColor: accentColor, borderRadius: 120, opacity: 0.9 }} />
      <View style={{ position: 'absolute', bottom: -90, left: -70, width: 260, height: 260, backgroundColor: accentColor, borderRadius: 150, opacity: 0.7 }} />

      <View className="flex-1 items-center justify-center">
        <View style={{ width: 110, height: 110, borderRadius: 24, backgroundColor: '#fff', elevation: 6, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: accentColor }} className="text-3xl font-extrabold">🏋️</Text>
        </View>
        <Text className="mt-4 text-xl font-semibold text-slate-800">FitManage</Text>
      </View>
    </View>
  );
}
