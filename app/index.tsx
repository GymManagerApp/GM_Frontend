import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { token, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (token) router.replace('/navigation/OwnerNavigator');
    else router.replace('/navigation/AuthNavigator');
  }, [loading, token]);
  return null;
}
