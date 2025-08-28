import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";

export default function GymManagementScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [gyms, setGyms] = useState<
    { name: string; address: string; email: string; note: string; status: "Active" | "Maintenance" | "Closed" }[]
  >([
    {
      name: "Fitness Hub - Downtown",
      address: "123 Main St, Anytown",
      email: "downtown@fitnesshub.com",
      note: "Operating normally",
      status: "Active" as const,
    },
    {
      name: "Powerhouse Gym - Uptown",
      address: "456 Oak Ave, Big City",
      email: "uptown@powerhouse.com",
      note: "Equipment maintenance scheduled",
      status: "Maintenance" as const,
    },
    {
      name: "Iron Grip Gym - West",
      address: "321 Maple Ln, Metropolis",
      email: "west@irongrip.com",
      note: "Temporarily closed for renovation",
      status: "Closed" as const,
    },
  ]);

  const badgeColor = (status: "Active" | "Maintenance" | "Closed") => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Maintenance":
        return "bg-yellow-500";
      case "Closed":
        return "bg-red-500";
      default:
        return "bg-slate-400";
    }
  };

  // If we navigated back from GymRegistrationScreen with a newGym, append it
  useEffect(() => {
    const newGym = route?.params?.newGym;
    if (newGym) {
      setGyms((prev) => [newGym, ...prev]);
      // Clear param so it doesn't re-add on re-render
      try {
        navigation.setParams({ newGym: undefined });
      } catch {}
    }
  }, [route?.params?.newGym]);

  return (
    <ScreenWrapper title="Gym Management" theme={theme}>
      <View className="flex-1 bg-white dark:bg-slate-950">
        <View className="flex-row gap-4 px-4 pt-6 pb-4">
          {/* Left: Gym/Branch Management */}
          <View className="flex-1">
            {/* Add New Button */}
            <Pressable
              onPress={() => navigation.navigate("GymRegistrationScreen")}
              className="rounded-xl py-3 px-4 flex-row items-center justify-center mt-1"
              style={{ backgroundColor: accent }}
            >
              <IconMC
                name="home-plus-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-medium">Add New Gym/Branch</Text>
            </Pressable>

            {/* Your Gyms */}
            <Text className="mt-5 mb-2 text-base font-semibold text-slate-900 dark:text-gray-100">
              Your Gyms
            </Text>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 24 }}
              className=""
            >
              {gyms.map((g, idx) => (
                <View
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-xl p-4 mb-3 border border-slate-200 dark:border-gray-800"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-2">
                      <Text className="text-slate-900 dark:text-gray-100 font-semibold">
                        {g.name}
                      </Text>
                      <Text className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                        {g.address}
                      </Text>
                      <Text className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                        {g.email}
                      </Text>
                      <Text className="text-xs text-slate-500 dark:text-gray-500 mt-2">
                        {g.note}
                      </Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded-full ${badgeColor(
                        g.status
                      )}`}
                    >
                      <Text className="text-white text-[10px]">{g.status}</Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("DetailsDrawer", {
                        type: "gym",
                        item: g,
                        title: "Gym Details",
                      })
                    }
                    className="self-start rounded-lg py-2 px-3 mt-3 flex-row items-center"
                    style={{ backgroundColor: accent }}
                  >
                    <IconMC
                      name="eye-outline"
                      size={16}
                      color="#fff"
                      style={{ marginRight: 6 }}
                    />
                    <Text className="text-white text-sm">View Details</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
