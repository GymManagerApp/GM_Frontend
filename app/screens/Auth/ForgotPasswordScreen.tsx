import React, { useMemo, useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { useAppTheme } from '@/components/theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const { theme, accentColor } = useAppTheme();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = useMemo(() => {
    if (!email) return 'Required';
    const ok = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
    return ok ? '' : 'Invalid email';
  }, [email]);

  const onSubmit = async () => {
    if (emailError) return;
    // TODO: call API to send reset link
    setSubmitted(true);
    setTimeout(() => navigation.navigate('Login'), 1000);
  };

  const inputBg = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const inputBorder = theme === 'dark' ? 'border-slate-700' : 'border-slate-200';

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className={theme === 'dark' ? 'dark flex-1 bg-slate-950 px-5 pt-12' : 'flex-1 bg-slate-50 px-5 pt-12'}>
          <Text className={theme === 'dark' ? 'text-gray-100 text-xl font-semibold' : 'text-slate-900 text-xl font-semibold'}>
            Forgot password
          </Text>
          <Text className={theme === 'dark' ? 'text-gray-300 mt-1' : 'text-slate-600 mt-1'}>
            Enter your email to receive a reset link.
          </Text>

          <View className={`rounded-2xl ${inputBg} border ${inputBorder} p-5 mt-6`}>
            <Text className={theme === 'dark' ? 'text-gray-200 text-xs' : 'text-slate-700 text-xs'}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={{ paddingVertical: 8, color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
            />
            {emailError ? <Text className="text-red-500 mt-1 text-xs">{emailError}</Text> : null}

            <Pressable onPress={onSubmit} disabled={!!emailError} style={{ backgroundColor: !emailError ? accentColor : '#94a3b8' }} className="rounded-2xl mt-4 py-3 items-center">
              <Text className="text-white font-semibold">Send reset link</Text>
            </Pressable>

            {submitted ? (
              <Text className={theme === 'dark' ? 'text-green-400 mt-3 text-sm' : 'text-green-600 mt-3 text-sm'}>
                If the email exists, a reset link has been sent.
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}