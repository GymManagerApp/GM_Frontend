import React, { useMemo, useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { useAppTheme } from '@/components/theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const { theme, accentColor } = useAppTheme();
  const router = useRouter();
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    if (!name.trim()) e.name = 'Required';
    if (!emailOk) e.email = 'Invalid email';
    if (password.length < 6) e.password = 'Min 6 characters';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    return e;
  }, [name, email, password, confirm]);

  const canSubmit = Object.keys(errors).length === 0;

  const labelCls = theme === 'dark' ? 'text-slate-300' : 'text-slate-700';
  const inputBorder = theme === 'dark' ? 'dark:border-slate-700' : 'border-slate-200';
  const placeholderColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const helperErr = 'text-red-500 mt-1 text-xs';

  const onSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      // Proceed to Gym Details step (React Navigation)
      navigation.navigate('GymDetails');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 bg-white">
          {/* Top accent area */}
          <View style={{ backgroundColor: accentColor, height: 220, borderBottomLeftRadius: 48, borderBottomRightRadius: 48 }} />

          {/* Card */}
          <View className="px-5 -mt-20">
            <View
              className="rounded-3xl bg-white p-5 dark:bg-slate-900"
              style={{ borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 4 }}
            >
              {/* Logo */}
              <View className="items-center mb-4">
                <View style={{ width: 80, height: 80, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 }}>
                  <Text style={{ color: accentColor }} className="text-3xl font-extrabold">🏋️</Text>
                </View>
                <Text className="mt-3 text-xl font-semibold text-slate-900">Sign Up</Text>
                <Text className="text-slate-600 mt-1">Create your account to get started.</Text>
              </View>

              <Text className={`${labelCls} text-sm mb-2`}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
                placeholderTextColor={placeholderColor}
                className={`border ${inputBorder} rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-3`}
              />
              {errors.name ? <Text className={helperErr}>{errors.name}</Text> : null}

              <Text className={`${labelCls} text-sm mb-2 mt-2`}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor={placeholderColor}
                className={`border ${inputBorder} rounded-lg px-3 py-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 mb-3`}
              />
              {errors.email ? <Text className={helperErr}>{errors.email}</Text> : null}

              <Text className={`${labelCls} text-sm mb-2 mt-2`}>Password</Text>
              <View className={`border ${inputBorder} rounded-lg px-3 py-2 bg-white dark:bg-slate-800 flex-row items-center`}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPwd}
                  placeholder="Create a password"
                  placeholderTextColor={placeholderColor}
                  style={{ flex: 1, paddingVertical: 6, color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
                />
                <TouchableOpacity onPress={() => setShowPwd((s) => !s)}>
                  <Icon name={!showPwd ? 'eye-off-outline' : 'eye-outline'} size={20} color={accentColor} />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text className={helperErr}>{errors.password}</Text> : null}

              <Text className={`${labelCls} text-sm mb-2 mt-2`}>Confirm Password</Text>
              <View className={`border ${inputBorder} rounded-lg px-3 py-2 bg-white dark:bg-slate-800 flex-row items-center`}>
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry={!showConfirm}
                  placeholder="Re-enter password"
                  placeholderTextColor={placeholderColor}
                  style={{ flex: 1, paddingVertical: 6, color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
                />
                <TouchableOpacity onPress={() => setShowConfirm((s) => !s)}>
                  <Icon name={!showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color={accentColor} />
                </TouchableOpacity>
              </View>
              {errors.confirm ? <Text className={helperErr}>{errors.confirm}</Text> : null}

              {/* Primary button */}
              <Pressable onPress={onSubmit} disabled={!canSubmit || submitting} style={{ backgroundColor: canSubmit ? accentColor : '#94a3b8' }} className="rounded-full mt-1 py-3 items-center">
                <Text className="text-white font-semibold">{submitting ? 'Signing up...' : 'Sign Up'}</Text>
              </Pressable>

              {/* Social/Phone options */}
              <View className="mt-4 gap-3">
                <Pressable className="flex-row items-center justify-center bg-white rounded-2xl py-3" style={{ borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}>
                  <Icon name="google" size={18} color="#DB4437" />
                  <Text className="ml-2 text-slate-800 font-medium">Sign up with Google</Text>
                </Pressable>
                <Pressable className="flex-row items-center justify-center bg-white rounded-2xl py-3" style={{ borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}>
                  <Icon name="phone" size={18} color={accentColor} />
                  <Text className="ml-2 text-slate-800 font-medium">Sign up with Phone</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
