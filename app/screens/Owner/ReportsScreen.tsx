import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ReportsScreen() {
    return (
        <View className="flex-1 bg-white">
             <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
               {/* Top Section */}
               <View className="px-4 pt-6 pb-2 flex-row items-center justify-between">
                 <Text className="text-xl font-semibold text-slate-900">Billing</Text>
                 <View className="flex-row items-center">
                   <IconMC name="bell-outline" size={22} color="#1d74f5" style={{ marginRight: 12 }} />
                   <Image source={{ uri: 'https://i.pravatar.cc/50' }} className="w-8 h-8 rounded-full" />
                 </View>
               </View>
       
               {/* Body */}
               <View className="px-4 mt-4 gap-4">
                 <View className="bg-slate-50 rounded-xl p-6 items-center justify-center"
                   style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
                   <IconMC name="credit-card-outline" size={36} color="#94a3b8" />
                   <Text className="mt-2 text-slate-600">No billing records yet</Text>
                 </View>
               </View>
             </ScrollView>
           </View>
    );
}