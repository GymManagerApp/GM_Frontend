// src/navigation/OwnerNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import DashboardScreen from "../screens/Owner/DashboardScreen";
import GymManagementScreen from "../screens/Owner/GymManagementScreen";
import MemberRegistrationScreen from "../screens/Owner/MemberRegistrationScreen";
import MembershipPlansListScreen from "../screens/Owner/MembershipPlansListScreen";
import MembershipPlansScreen from "../screens/Owner/MembershipPlansScreen";
import ReportsScreen from "../screens/Owner/ReportsScreen";
import MemberListScreen from "../screens/Owner/MemberListScreen";
import StaffListScreen from "../screens/Owner/StaffListScreen";
import StaffRegistrationScreen from "../screens/Owner/StaffRegistrationScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import CustomTabBar from "@/components/CustomBottomNavBar";

// Stack for nested flows (like add/edit forms)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Gym stack (list + add/edit details)
function GymStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Gyms" component={GymManagementScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      {/* Example: Add/Edit Gym */}
      {/* <Stack.Screen name="AddGym" component={AddGymScreen} /> */}
    </Stack.Navigator>
  );
}

// Member stack
function MemberStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MemberList" component={MemberListScreen} />
      <Stack.Screen name="MemberRegistrationScreen" component={MemberRegistrationScreen} />
    </Stack.Navigator>
  );
}

// Staff stack (users tab)
function StaffStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffList" component={StaffListScreen} />
      <Stack.Screen name="StaffRegistrationScreen" component={StaffRegistrationScreen} />
    </Stack.Navigator>
  );
}

// Plans stack (list + create/edit plan)
function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MembershipPlansList" component={MembershipPlansListScreen} />
      <Stack.Screen name="MembershipPlansScreen" component={MembershipPlansScreen} />
    </Stack.Navigator>
  );
}

export default function OwnerNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      {/* Gym stack with No bottom navbar for Reports screen */}
      <Tab.Screen
        name="Gyms"
        component={GymStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Gyms";

          return {
            tabBarStyle:
              routeName === "Reports" ? { display: "none" } : undefined,
            // you can also hide header here if needed
            headerShown: false,
          };
        }}
      />
      <Tab.Screen name="Staff" component={StaffStack} />
      <Tab.Screen name="Members" component={MemberStack} />
      <Tab.Screen name="Plans" component={PlansStack} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
    </Tab.Navigator>
  );
}
