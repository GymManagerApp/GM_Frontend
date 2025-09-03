import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Alert, Image, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/components/theme/ThemeContext";
import ScreenWrapper from "@/components/Navigation/ScreenWrapperTopNav";
import { useNavigation, useRoute } from "@react-navigation/native";
import { listGyms, type Gym } from "@/app/services/gyms";
import {
  createMembershipPlan,
  updateMembershipPlan,
  getMembershipPlanById,
} from "@/app/services/membershipPlans";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";

export default function MembershipPlansScreen() {
  const { theme, accentColor } = useAppTheme();
  const accent = accentColor || (theme === "dark" ? "#4EA1FF" : "#1d74f5");
  const placeholderColor = theme === "dark" ? "#64748b" : "#94a3b8"; // slate-500 (dark) / slate-400 (light)
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [gymId, setGymId] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [gymDropdownOpen, setGymDropdownOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [bonusMonths, setBonusMonths] = useState("");
  const [imagePreviewUri, setImagePreviewUri] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageMime, setImageMime] = useState<string>("");
  const [benefits, setBenefits] = useState<string[]>([""]);
  const benefitRefs = useRef<Array<TextInput | null>>([]);
  const [submitting, setSubmitting] = useState(false);

  const editingId: string | undefined = route.params?.editId;

  useEffect(() => {
    (async () => {
      try {
        const g = await listGyms();
        setGyms(g || []);
        if (!gymId && g?.[0]?._id) setGymId(g[0]._id);
      } catch (e) {
        console.warn("Failed to load gyms", e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!editingId) return;
    (async () => {
      try {
        const plan = await getMembershipPlanById(editingId);
        setGymId(plan.gymId || "");
        setName(plan.name || "");
        setDescription(plan.description || "");
        setPrice(String(plan.price ?? ""));
        setDurationInMonths(String(plan.durationInMonths ?? ""));
        setBonusMonths(plan?.bonus ? String(plan.bonus) : "");
        const img = (plan as any).image || "";
        setImagePreviewUri(img || "");
        setImageBase64("");
        setImageMime("");
        const bArr = Array.isArray(plan.benefits) ? plan.benefits : [];
        setBenefits(bArr.length ? bArr : [""]);
      } catch (e) {
        console.warn("Failed to load plan", e);
      }
    })();
  }, [editingId]);

  const resetForm = () => {
    setGymId("");
    setGymDropdownOpen(false);
    setName("");
    setDescription("");
    setPrice("");
    setDurationInMonths("");
    setBonusMonths("");
    setImagePreviewUri("");
    setImageBase64("");
    setImageMime("");
    setBenefits([""]);
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need access to your photos to select an image.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        // Use array of MediaType string literal per new API
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
        base64: false,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        // Compress and resize to reduce payload (avoid 413 Entity Too Large)
        let manip = await ImageManipulator.manipulateAsync(
          asset.uri,
          [{ resize: { width: 900 } }], // reasonable width for thumbnails/previews
          { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );
        // If still large (> ~1MB base64 chars), compress further
        if ((manip.base64?.length || 0) > 1_200_000) {
          manip = await ImageManipulator.manipulateAsync(
            manip.uri,
            [{ resize: { width: 720 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
          );
        }
        setImagePreviewUri(manip.uri || asset.uri || "");
        setImageBase64(manip.base64 || "");
        setImageMime("image/jpeg");
      }
    } catch (e) {
      console.warn("Image pick failed", e);
    }
  };

  const addBenefit = () => {
    setBenefits(prev => {
      const next = [...prev, ""];
      // focus the new input on next tick
      setTimeout(() => {
        const lastIndex = next.length - 1;
        benefitRefs.current[lastIndex]?.focus?.();
      }, 0);
      return next;
    });
  };
  const updateBenefit = (idx: number, val: string) => setBenefits(prev => prev.map((b, i) => (i === idx ? val : b)));
  const removeBenefit = (idx: number) => setBenefits(prev => {
    const filtered = prev.filter((_, i) => i !== idx);
    if (filtered.length === 0) return [""]; // always keep at least one row
    // cleanup ref slot
    benefitRefs.current.splice(idx, 1);
    return filtered;
  });

  const onSubmit = async () => {
    if (!gymId) {
      Alert.alert("Validation", "Please select a Gym.");
      return;
    }
    if (!name) {
      Alert.alert("Validation", "Please enter a plan name.");
      return;
    }
    if (!price) {
      Alert.alert("Validation", "Please enter a price.");
      return;
    }
    if (!durationInMonths) {
      Alert.alert("Validation", "Please enter duration in months.");
      return;
    }

    try {
      // If image is still too large, recompress one more time before upload
      if (imageBase64 && imageBase64.length > 1_400_000 && imagePreviewUri) {
        try {
          const re = await ImageManipulator.manipulateAsync(
            imagePreviewUri,
            [{ resize: { width: 640 } }],
            { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG, base64: true }
          );
          setImagePreviewUri(re.uri);
          setImageBase64(re.base64 || "");
          setImageMime("image/jpeg");
        } catch (cErr) {
          console.warn("Secondary compression failed", cErr);
        }
      }
      setSubmitting(true);
      const payload: any = {
        gymId,
        name,
        description,
        price: Number(price),
        durationInMonths: String(durationInMonths),
        bonus: bonusMonths ? String(bonusMonths) : undefined,
        // If an image was picked this session, send data URL (base64). Otherwise fallback to existing preview URL
        image: imageBase64
          ? `data:${imageMime || "image/jpeg"};base64,${imageBase64}`
          : imagePreviewUri || undefined,
        benefits: benefits.filter((b) => b && b.trim().length > 0),
      };

      if (editingId) {
        await updateMembershipPlan(editingId, payload);
        Alert.alert("Success", "Plan updated successfully.");
      } else {
        await createMembershipPlan(payload);
        Alert.alert("Success", "Plan created successfully.");
      }
      resetForm();
      navigation.goBack();
    } catch (e: any) {
      console.error("Save plan failed", e?.response?.data || e);
      if (e?.response?.status === 413) {
        Alert.alert(
          "Image too large",
          "The selected image is too large to upload. Please choose a smaller image or let me further compress it."
        );
        return;
      }
      const msg = e?.response?.data?.message || e?.message || "Failed to save plan";
      Alert.alert("Error", msg);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ScreenWrapper title="Add New Plan" theme={theme} scroll={false}>
      <View className="flex-1 bg-white dark:bg-slate-900">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Card: Create / Edit Plan */}
          <View className="px-4 mt-2">
            <View
              className="bg-white dark:bg-slate-900 rounded-xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              {/* Gym Picker */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Gym</Text>
              <Pressable
                onPress={() => setGymDropdownOpen(x => !x)}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 bg-white dark:bg-slate-800 mb-2"
              >
                <Text className="text-slate-900 dark:text-slate-100">
                  {gyms.find(g => g._id === gymId)?.name || "Select gym"}
                </Text>
              </Pressable>
              {gymDropdownOpen && (
                <View className="border border-slate-200 dark:border-slate-700 rounded-lg mb-3">
                  {gyms.map(g => (
                    <Pressable
                      key={g._id}
                      onPress={() => {
                        setGymId(g._id);
                        setGymDropdownOpen(false);
                      }}
                      className="px-3 py-2 bg-white dark:bg-slate-800"
                    >
                      <Text className="text-slate-900 dark:text-slate-100">{g.name}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
              {/* Plan Name */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Plan Name</Text>
              <TextInput
                placeholder="e.g., Premium Plus"
                placeholderTextColor={placeholderColor}
                value={name}
                onChangeText={setName}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              {/* Description */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Description</Text>
              <TextInput
                placeholder="Short description of the plan"
                placeholderTextColor={placeholderColor}
                value={description}
                onChangeText={setDescription}
                multiline
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                    Price (INR)
                  </Text>
                  <TextInput
                    placeholder="₹0.00"
                    placeholderTextColor={placeholderColor}
                    keyboardType="decimal-pad"
                    value={price}
                    onChangeText={setPrice}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-2"
                  />
                  {!!price && (
                    <Text className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {(() => {
                        const n = Number(price);
                        if (isNaN(n)) return null;
                        try {
                          return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n);
                        } catch {
                          return `₹${n.toFixed(2)}`;
                        }
                      })()}
                    </Text>
                  )}
                </View>
                <View className="w-32">
                  <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                    Duration (Months)
                  </Text>
                  <TextInput
                    placeholder="1"
                    placeholderTextColor={placeholderColor}
                    keyboardType="number-pad"
                    value={durationInMonths}
                    onChangeText={setDurationInMonths}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
                  />
                </View>
              </View>

              {/* Bonus Months (optional) */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Bonus Months (optional)</Text>
              <TextInput
                placeholder="e.g., 1"
                placeholderTextColor={placeholderColor}
                keyboardType="number-pad"
                value={bonusMonths}
                onChangeText={(t) => setBonusMonths(t.replace(/[^0-9]/g, ""))}
                className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-4"
              />

              {/* Image Upload */}
              <Text className="text-slate-700 dark:text-slate-300 text-sm mb-2">Plan Image (optional)</Text>
              <View className="flex-row items-center gap-3 mb-4">
                {imagePreviewUri ? (
                  <Image source={{ uri: imagePreviewUri }} className="w-16 h-16 rounded-lg" />
                ) : (
                  <View className="w-16 h-16 rounded-lg bg-slate-200 dark:bg-slate-800 items-center justify-center">
                    <IconMC name="image-outline" size={20} color={theme === "dark" ? "#94a3b8" : "#64748b"} />
                  </View>
                )}
                <TouchableOpacity onPress={pickImage} className="px-4 py-3 rounded-lg" style={{ backgroundColor: accent }} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text className="text-white font-medium">Pick Image</Text>
                </TouchableOpacity>
                {!!imagePreviewUri && (
                  <TouchableOpacity onPress={() => { setImagePreviewUri(""); setImageBase64(""); setImageMime(""); }} className="px-3 py-3 rounded-lg border border-slate-300 dark:border-slate-700" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text className="text-slate-700 dark:text-slate-300">Remove</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Key Features (Dynamic) */}
              <View className="flex-row items-center justify-between mb-2" pointerEvents="auto">
                <Text className="text-slate-700 dark:text-slate-300 text-sm">Key Features</Text>
                <TouchableOpacity
                  onPress={addBenefit}
                  className="flex-row items-center px-3 py-1 rounded-md"
                  style={{ backgroundColor: accent }}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  activeOpacity={0.7}
                >
                  <IconMC name="plus" size={16} color="#fff" />
                  <Text className="text-white ml-1">Add</Text>
                </TouchableOpacity>
              </View>
              {benefits.map((b, idx) => (
                <View key={`benefit-${idx}`} className="flex-row items-center mb-2" style={{ zIndex: 1, elevation: 1 }}>
                  <TextInput
                    placeholder={`Feature #${idx + 1}`}
                    placeholderTextColor={placeholderColor}
                    value={b}
                    onChangeText={(t) => updateBenefit(idx, t)}
                    ref={(el) => (benefitRefs.current[idx] = el)}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    editable={true}
                    selectTextOnFocus={true}
                    importantForAutofill="no"
                    className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800"
                  />
                  <TouchableOpacity
                    onPress={() => removeBenefit(idx)}
                    className="ml-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.6}
                  >
                    <IconMC name="minus" size={16} color={theme === "dark" ? "#cbd5e1" : "#475569"} />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Actions */}
              <View className="mt-2 flex-row gap-3">
                <Pressable
                  onPress={onSubmit}
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3 items-center justify-center"
                  style={{ backgroundColor: accent, opacity: submitting ? 0.6 : 1 }}
                >
                  <Text className="text-white font-semibold">{editingId ? 'Update Plan' : 'Submit Plan'}</Text>
                </Pressable>
                <Pressable
                  onPress={() => { resetForm(); navigation.goBack(); }}
                  className="flex-1 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl py-3 items-center justify-center"
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
