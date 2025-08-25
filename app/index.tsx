import React from "react";
import Gradient from "@/assets/Icons/Gradient";
import Logo from "@/assets/Icons/Logo";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";

import { Link } from "expo-router";

export default function Home() {
  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box className="absolute h-[500px] w-[500px] lg:w-[700px] lg:h-[700px]">
          <Gradient />
        </Box>
        <Box className="flex flex-1 items-center my-16 mx-5 lg:my-24 lg:mx-32">
          <Box className="gap-10 base:flex-col sm:flex-row justify-between sm:w-[80%] md:flex-1">
            <Box className="bg-background-template py-2 px-6 rounded-full items-center flex-column md:flex-row md:self-start">
              <Text className="text-typography-white font-normal">
                Get started by editing
              </Text>
              <Text className="text-typography-white font-medium ml-2">
                ./App.tsx
              </Text>
            </Box>
            <Link href="/navigation/OwnerNavigator">
              <Box className="bg-violet-800 py-2 px-6 rounded-full items-center flex-column sm:flex-row md:self-start">
                <Text className="text-typography-white font-normal">
                  Explore Owners Navigation
                </Text>
              </Box>
            </Link>
            <Link href="/navigation/SuperAdminNavigator">
              <Box className="bg-violet-800 py-2 px-6 rounded-full items-center flex-column sm:flex-row md:self-start">
                <Text className="text-typography-white font-normal">
                  Explore Super Admin Navigation
                </Text>
              </Box>
            </Link>
            <Link href="/navigation/StaffNavigator">
              <Box className="bg-violet-800 py-2 px-6 rounded-full items-center flex-column sm:flex-row md:self-start">
                <Text className="text-typography-white font-normal">
                  Explore Staff Navigation
                </Text>
              </Box>
            </Link>
          </Box>
          <Box className="flex-1 justify-center items-center h-[20px] w-[300px] lg:h-[160px] lg:w-[400px]">
            <Logo />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
