// src/navigation/OwnerNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Import Screens
import DashboardScreen from "../screens/Owner/DashboardScreen";
import GymManagementScreen from "../screens/Owner/GymManagementScreen";
import MemberRegistrationScreen from "../screens/Owner/MemberRegistrationScreen";
import MembershipPlansScreen from "../screens/Owner/MembershipPlansScreen";
import PaymentTrackingScreen from "../screens/Owner/PaymentTrackingScreen";
import ReportsScreen from "../screens/Owner/ReportsScreen";
import ProfileScreen from "../screens/Shared/ProfileScreen";

// Stack for nested flows (like add/edit forms)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Gym stack (list + add/edit details)
function GymStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Gyms" component={GymManagementScreen} />
      {/* Example: Add/Edit Gym */}
      {/* <Stack.Screen name="AddGym" component={AddGymScreen} /> */}
    </Stack.Navigator>
  );
}

// Member stack
function MemberStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Members" component={MemberRegistrationScreen} />
      {/* Example: Add/Edit Member */}
      {/* <Stack.Screen name="MemberDetails" component={MemberDetailsScreen} /> */}
    </Stack.Navigator>
  );
}

export default function OwnerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF", // Vibrant blue
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "Dashboard":
              iconName = "home";
              break;
            case "Gyms":
              iconName = "business";
              break;
            case "Members":
              iconName = "people";
              break;
            case "Plans":
              iconName = "list";
              break;
            case "Payments":
              iconName = "cash";
              break;
            case "Reports":
              iconName = "bar-chart";
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
      <Tab.Screen name="Gyms" component={GymStack} />
      <Tab.Screen name="Members" component={MemberStack} />
      <Tab.Screen name="Plans" component={MembershipPlansScreen} />
      <Tab.Screen name="Payments" component={PaymentTrackingScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
