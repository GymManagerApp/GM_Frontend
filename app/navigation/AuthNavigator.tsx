// src/navigation/AuthNavigator.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import GymDetailsScreen from "../screens/Auth/GymDetailsScreen";
import OwnerNavigator from "./OwnerNavigator";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user is authenticated, redirect to OwnerNavigator
  if (isAuthenticated) {
    return <OwnerNavigator />;
  }

  // Otherwise show auth screens
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="GymDetails" component={GymDetailsScreen} />
    </Stack.Navigator>
  );
}
