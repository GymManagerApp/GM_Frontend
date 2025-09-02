import { Platform } from 'react-native';

// Prefer an env var (set via app.json or shell) to allow tunnels like ngrok
// Example: EXPO_PUBLIC_API_BASE=https://<your-ngrok-subdomain>.ngrok-free.app

// const ENV_BASE = process.env.EXPO_PUBLIC_API_BASE;
const ENV_BASE ="https://dc2d43718fb9.ngrok-free.app"


// Fallbacks by platform for local dev server
// Android emulator cannot reach "localhost" on your host machine; use 10.0.2.2
// iOS simulator can use localhost
// For physical devices, set EXPO_PUBLIC_API_BASE to your machine's LAN IP or an ngrok URL
const FALLBACK_BASE = Platform.select({
  android: 'http://10.0.2.2:8008',
  ios: 'http://localhost:8008',
  default: 'http://localhost:8008',
});

export const HOST_API = (ENV_BASE || FALLBACK_BASE) as string;

// Default no-op export to avoid Expo Router treating this as a route
export default function Noop() {
  return null;
}
