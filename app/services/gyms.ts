import axios from 'axios';
import { HOST_API } from '@/app/utils/config';
import { apiEndpoints } from '@/app/utils/apiEndpoints';
import { getItem, getObjectItem } from '@/app/hooks/useLocalStorage';

async function getAuthToken(): Promise<string | null> {
  const direct = await getItem('authToken');
  if (direct) return direct;
  const userData = await getObjectItem<any>('userData');
  if (userData) {
    const fromUserData = userData.token || userData.data?.token;
    if (fromUserData) return fromUserData;
  }
  const legacy = await getObjectItem<any>('userDetails');
  if (legacy) return legacy.token || legacy.accessToken || legacy.data?.token || null;
  return null;
}

async function authHeaders() {
  const token = await getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type Gym = {
  _id: string;
  name: string;
  isActive: number;
};

export async function listGyms(): Promise<Gym[]> {
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.gym.addGym}`; // "/gyms"
  const res = await axios.get(url, { headers });
  return res.data?.data || res.data;
}
