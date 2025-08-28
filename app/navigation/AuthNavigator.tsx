// src/navigation/AuthNavigator.tsx

import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import GymDetailsScreen from "../screens/Auth/GymDetailsScreen";
import OwnerNavigator from "./OwnerNavigator";
import { View, ActivityIndicator } from "react-native";
import { getObjectItem, removeItem } from "../hooks/useLocalStorage";
import { isTokenExpired } from "../utils/tokenValidation";

const Stack = createStackNavigator();

interface UserDetails {
  token: string;
  role?: string;
  exp?: number; // Token expiration timestamp
  [key: string]: any;
}

export default function AuthNavigator() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedUserDetails: UserDetails | null = await getObjectItem("userDetails");
      console.log("Stored userDetails:", storedUserDetails);
      
      if (storedUserDetails) {
        
        if (storedUserDetails.token && !isTokenExpired(storedUserDetails.token)) {
          // Token is valid, set user details
          setUserDetails(storedUserDetails);
        } else {
          // Token is expired, clear storage
          console.log("Token expired, clearing storage");
          await removeItem("userDetails");
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      setUserDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If user has valid token, redirect to OwnerNavigator
  if (userDetails && userDetails.token) {
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
