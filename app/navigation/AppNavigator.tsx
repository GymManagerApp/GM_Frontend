// src/navigation/AppNavigator.tsx

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import OwnerNavigator from "./OwnerNavigator";
import StaffNavigator from "./StaffNavigator";
import SuperAdminNavigator from "./SuperAdminNavigator";

export default function AppNavigator() {
//   const { user, isLoading } = useContext(AuthContext);

    const user = {
        role: "owner",
    };

    const isLoading = false;

  if (isLoading) {
    // You can show a splash/loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        user.role === "owner" ? (
          <OwnerNavigator />
        ) : user.role === "staff" ? (
          <StaffNavigator />
        ) : user.role === "superadmin" ? (
          <SuperAdminNavigator />
        ) : (
          // Add member navigator here if needed in future
          <OwnerNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
