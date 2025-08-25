// src/navigation/StaffNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/Staff/DashboardScreen";
import MemberRegistrationScreen from "../screens/Staff/MemberRegistrationScreen";
import PaymentTrackingScreen from "../screens/Staff/PaymentTrackingScreen";
import NotificationsScreen from "../screens/Staff/NotificationsScreen";
import ProfileScreen from "../screens/Shared/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Member stack
function MemberStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Members" component={MemberRegistrationScreen} />
      {/* Add member details/edit screens here */}
    </Stack.Navigator>
  );
}

export default function StaffNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "Dashboard":
              iconName = "home";
              break;
            case "Members":
              iconName = "people";
              break;
            case "Payments":
              iconName = "cash";
              break;
            case "Notifications":
              iconName = "notifications";
              break;
            case "Profile":
              iconName = "person";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Members" component={MemberStack} />
      <Tab.Screen name="Payments" component={PaymentTrackingScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
