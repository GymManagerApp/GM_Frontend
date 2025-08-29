import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { getObjectItem } from "@/app/hooks/useLocalStorage";

interface UserDetails {
  token?: string | null;
}

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function checkToken() {
      const userDetails: UserDetails = await getObjectItem("userDetails") || {};
      const token = userDetails?.token;
      if (token) router.replace('/navigation/OwnerNavigator');
      else router.replace('/navigation/AuthNavigator');
    }
    checkToken();
  }, []);
  return null;
}
