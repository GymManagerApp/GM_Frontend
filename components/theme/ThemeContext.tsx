import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Appearance, ColorSchemeName, LayoutAnimation, Platform, UIManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppTheme = 'light' | 'dark';
export type AccentColor = string; // hex string like '#1d74f5'

type ThemeContextType = {
  theme: AppTheme;
  toggleTheme: () => void;
  setTheme: (t: AppTheme) => void;
  accentColor: AccentColor;
  setAccentColor: (c: AccentColor) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = Appearance.getColorScheme() as ColorSchemeName;
  const initial: AppTheme = system === 'dark' ? 'dark' : 'light';
  const [theme, setTheme] = useState<AppTheme>(initial);
  const [accentColor, setAccentColorState] = useState<AccentColor>('#1d74f5');
  const mounted = useRef(false);

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    // Load persisted theme and accent
    (async () => {
      try {
        const [savedTheme, savedAccent] = await Promise.all([
          AsyncStorage.getItem('app_theme'),
          AsyncStorage.getItem('app_accent_color'),
        ]);
        if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
        if (savedAccent && /^#([0-9a-f]{3}){1,2}$/i.test(savedAccent)) setAccentColorState(savedAccent);
      } catch {}
      mounted.current = true;
    })();
    const sub = Appearance.addChangeListener(() => {
      // We keep manual control; do not auto-switch on system change once app is running.
    });
    return () => sub.remove();
  }, []);

  // Persist on changes (after first mount)
  useEffect(() => {
    if (!mounted.current) return;
    AsyncStorage.setItem('app_theme', theme).catch(() => {});
  }, [theme]);

  useEffect(() => {
    if (!mounted.current) return;
    AsyncStorage.setItem('app_accent_color', accentColor).catch(() => {});
  }, [accentColor]);

  const setAccentColor = (c: AccentColor) => {
    // Gentle animation on accent change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAccentColorState(c);
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
        // Optional: adjust default accent when user hasn't customized; keep user-chosen accent as-is
      },
      accentColor,
      setAccentColor,
    }),
    [theme, accentColor]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}
