// src/navigation/OwnerNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
import ProfileScreen from "../screens/Shared/ProfileScreen";
import NotificationsScreen from "../screens/Shared/NotificationsScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import DetailsDrawer from "../screens/Shared/DetailsDrawer";
import CustomTabBar from "@/components/Navigation/CustomBottomNavBar";
import GymRegistrationScreen from "../screens/Owner/GymRegistrationScreen";
import EnquiryListScreen from "../screens/Owner/EnquiryListScreen";
import EnquiryFormScreen from "../screens/Owner/EnquiryFormScreen";

// Stack for nested flows (like add/edit forms)
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Gym stack (list + add/edit details)
function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

function GymStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Gyms" component={GymManagementScreen} />
      <Stack.Screen name="GymRegistrationScreen" component={GymRegistrationScreen} />
      <Stack.Screen name="EnquiryList" component={EnquiryListScreen} />
      <Stack.Screen name="EnquiryForm" component={EnquiryFormScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
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
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

// Staff stack (users tab)
function StaffStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffList" component={StaffListScreen} />
      <Stack.Screen name="StaffRegistrationScreen" component={StaffRegistrationScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

// Plans stack (list + create/edit plan)
function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MembershipPlansList" component={MembershipPlansListScreen} />
      <Stack.Screen name="MembershipPlansScreen" component={MembershipPlansScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

// Profile stack to support notifications navigation from Profile tab
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

// Enquiry stack (list + form)
function EnquiryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EnquiryList" component={EnquiryListScreen} />
      <Stack.Screen name="EnquiryForm" component={EnquiryFormScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Members" component={MemberStack} />
      <Tab.Screen name="Plus" component={DashboardStack} />
      <Tab.Screen name="Staff" component={StaffStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />

      {/* Hidden tabs (accessible via Quick Actions) */}
      <Tab.Screen
        name="Gyms"
        component={GymStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Gyms";
          return {
            tabBarStyle: routeName === "Reports" ? { display: "none" } : undefined,
            headerShown: false,
          };
        }}
      />
      <Tab.Screen name="Plans" component={PlansStack} />
      <Tab.Screen name="Enquiry" component={EnquiryStack} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
    </Tab.Navigator>
  );
}

function RootWithModal() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="DetailsDrawer"
        component={DetailsDrawer}
        options={{
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </RootStack.Navigator>
  );
}

export default function OwnerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Root" component={RootWithModal} />
    </Drawer.Navigator>
  );
}
