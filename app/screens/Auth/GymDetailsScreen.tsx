import React, { useMemo, useRef, useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useAppTheme } from "@/components/theme/ThemeContext";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hook";
import { RootState } from "@/app/store/store";
import { addGym } from "@/app/slice/gymSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GymDetailsScreen() {
  const { theme, accentColor } = useAppTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addGymData = useAppSelector(
    (state: RootState) => state.gymSlc.addGymData
  );

  const [gymName, setGymName] = useState("");
  const [city, setCity] = useState("");
  const cityRef = useRef<TextInput>(null);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!gymName.trim()) e.gymName = "Required";
    if (!city.trim()) e.city = "Required";
    return e;
  }, [gymName, city]);

  const canSave = Object.keys(errors).length === 0;

  const labelCls = theme === "dark" ? "text-slate-300" : "text-slate-700";
  const inputBorder =
    theme === "dark" ? "dark:border-slate-700" : "border-slate-200";
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8";
  const helperErr = "text-red-500 mt-1 text-xs";

  const Field = ({
    label,
    value,
    onChangeText,
    placeholder,
    inputRef,
    returnKeyType,
    onSubmitEditing,
  }: {
    label: string;
    value: string;
    onChangeText: (t: string) => void;
    placeholder: string;
    inputRef?: React.RefObject<TextInput>;
    returnKeyType?: "next" | "done";
    onSubmitEditing?: () => void;
  }) => (
    <View className="w-full mb-3">
      <Text className={`${labelCls} text-sm mb-2`}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(t) => onChangeText(t)}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        editable
        ref={inputRef}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={returnKeyType !== "next"}
        selectionColor={accentColor}
        cursorColor={accentColor}
        className={`border ${inputBorder} rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800`}
      />
    </View>
  );

  const onSave = async () => {
    if (!canSave) return;
    try {
      console.log("dispatching addGym");
      console.log("gymName", gymName);
      console.log("city", city);
      // Dispatch and wait for the actual response
      await dispatch(addGym({ name: gymName, city })).unwrap();
      // Navigate only if success
      router.replace("/navigation/OwnerNavigator");
    } catch (error: any) {
      // Thunk failed
      console.log("❌ Error while adding gym:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View className="flex-1 bg-white dark:bg-[#0B1220]">
          <View
            style={{
              backgroundColor: accentColor,
              height: 180,
              borderBottomLeftRadius: 36,
              borderBottomRightRadius: 36,
            }}
          />

          <View className="px-5 -mt-16">
            <View
              className="rounded-3xl bg-white p-5 dark:bg-slate-900"
              style={{
                borderWidth: 1,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 6 },
                elevation: 4,
              }}
            >
              <Text className="text-xl font-semibold text-slate-900 mb-4">
                Gym Details
              </Text>
              <Field
                label="Gym Name"
                value={gymName}
                onChangeText={setGymName}
                placeholder="Your gym name"
                returnKeyType="next"
                onSubmitEditing={() => cityRef.current?.focus()}
              />
              {errors.gymName ? (
                <Text className={helperErr}>{errors.gymName}</Text>
              ) : null}

              <Field
                label="City"
                value={city}
                onChangeText={setCity}
                placeholder="City"
                inputRef={cityRef}
                returnKeyType="done"
              />
              {errors.city ? (
                <Text className={helperErr}>{errors.city}</Text>
              ) : null}

              <Pressable
                onPress={onSave}
                disabled={!canSave}
                style={{ backgroundColor: canSave ? accentColor : "#94a3b8" }}
                className="rounded-full mt-2 py-3 items-center"
              >
                <Text className="text-white font-semibold">
                  Save & Continue
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
