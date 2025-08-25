import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "./useColorScheme.web";

// Example ThemeContext (replace with your own context or prop)

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const theme = useColorScheme(); // 'light' or 'dark'
  // const theme = "dark";

  // Define colors for light and dark modes
  const colors = {
    light: {
      background: "#fff",
      borderTop: "#e2e8f0", // slate-200
      shadowColor: "#000",
      iconActive: "#1d74f5",
      iconInactive: "#888",
      textActive: "#1d74f5",
      textInactive: "#94a3b8",
    },
    dark: {
      background: "#121212",
      borderTop: "#272727",
      shadowColor: "#000",
      iconActive: "#22c55e", // green-500
      iconInactive: "#888",
      textActive: "#22c55e",
      textInactive: "#94a3b8",
    },
  };

  const mode = theme === "dark" ? colors.dark : colors.light;

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: mode.background,
        borderTopWidth: 1,
        borderTopColor: mode.borderTop,
        shadowColor: mode.shadowColor,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Mapping route name to icon names
        let iconName = "circle"; // fallback
        const label = options.tabBarLabel ?? options.title ?? route.name;

        switch (route.name) {
          case "Dashboard":
            iconName = "view-dashboard-outline";
            break;
          case "Users":
            iconName = "account-group-outline";
            break;
          case "Gyms":
            iconName = "dumbbell";
            break;
          case "Members":
            iconName = "account-group-outline";
            break;
          case "Billing":
            iconName = "credit-card-outline";
            break;
          case "Staff":
            iconName = "account-multiple-outline";
            break;
          case "Plans":
            iconName = "book-outline";
            break;
          case "Payments":
            iconName = "cash-multiple";
            break;
          case "Reports":
            iconName = "chart-box-outline";
            break;
          case "Profile":
            iconName = "account-outline";
            break;
          default:
            break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <IconMC
              name={iconName}
              size={24}
              color={isFocused ? mode.iconActive : mode.iconInactive}
            />
            <Text
              style={{
                fontSize: 12,
                color: isFocused ? mode.textActive : mode.textInactive,
                marginTop: 2,
              }}
            >
              {String(label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
