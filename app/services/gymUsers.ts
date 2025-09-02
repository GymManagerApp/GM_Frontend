import axios from 'axios';
import { HOST_API } from '@/app/utils/config';
import { apiEndpoints } from '@/app/utils/apiEndpoints';
import { getItem, getObjectItem } from '@/app/hooks/useLocalStorage';

// Attempt to extract bearer token from AsyncStorage
// Primary source: 'authToken' (AuthContext stores here)
// Fallbacks: legacy shapes under 'userDetails'
async function getAuthToken(): Promise<string | null> {
  const direct = await getItem('authToken');
  if (direct) return direct;

  // Common app storage: entire API response saved as 'userData'
  const userData = await getObjectItem<any>('userData');
  if (userData) {
    // Possible shapes: { token, user } OR { data: { token, user }, message }
    const fromUserData = userData.token || userData.data?.token;
    if (fromUserData) return fromUserData;
  }

  const legacy = await getObjectItem<any>('userDetails');
  if (legacy) {
    return legacy.token || legacy.accessToken || legacy.data?.token || null;
  }
  return null;
}

async function authHeaders() {
  const token = await getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type GymUser = {
  _id: string;
  gymId: string;
  userId: string;
  userInfo?: { name?: string; email?: string; phone?: string; profilePhotoUrl?: string };
  role: number; // 0 admin, 1 staff
  isActive: number; // 0/1
  createdAt: string;
  updatedAt: string;
};

export async function listGymUsers(): Promise<GymUser[]> {
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.gymUsers.list}`;
  console.log('[gymUsers] GET', url);
  const res = await axios.get(url, { headers: { ...headers, 'Cache-Control': 'no-cache' } });
  console.log('[gymUsers] GET status', res.status);
  return res.data?.data || res.data; // controller may wrap in {data}
}

export async function createGymUser(payload: {
  gymId: string;
  role: number;
  userId?: string;
  userInfo?: { name?: string; email?: string; phone?: string; profilePhotoUrl?: string };
  isActive?: number;
  createdBy?: string;
}) {
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.gymUsers.create}`;
  console.log('[gymUsers] POST', url, payload);
  const res = await axios.post(url, payload, { headers });
  console.log('[gymUsers] POST status', res.status);
  return res.data?.data || res.data;
}

export async function updateGymUser(id: string, payload: Partial<{
  gymId: string;
  userId: string;
  role: number;
  userInfo: { name?: string; email?: string; phone?: string; profilePhotoUrl?: string };
  isActive: number;
  updatedBy: string;
}>) {
  const headers = await authHeaders();
  if (!id) throw new Error('updateGymUser: id is required');
  const url = `${HOST_API}${apiEndpoints.gymUsers.update(id)}`;
  console.log('[gymUsers] PUT', url, payload);
  const res = await axios.put(url, payload, { headers });
  console.log('[gymUsers] PUT status', res.status);
  return res.data?.data || res.data;
}

export async function deleteGymUser(id: string) {
  const headers = await authHeaders();
  if (!id) throw new Error('deleteGymUser: id is required');
  const url = `${HOST_API}${apiEndpoints.gymUsers.delete(id)}`;
  console.log('[gymUsers] DELETE', url);
  const res = await axios.delete(url, { headers });
  console.log('[gymUsers] DELETE status', res.status);
  return res.data?.data || res.data;
}

export async function updateGymUserStatus(payload: { _id: string; isActive: number }) {
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.gymUsers.updateStatus}`;
  const res = await axios.patch(url, payload, { headers });
  return res.data?.data || res.data;
}

export async function getGymUserById(id: string): Promise<GymUser> {
  const headers = await authHeaders();
  if (!id) throw new Error('getGymUserById: id is required');
  const url = `${HOST_API}${apiEndpoints.gymUsers.byId(id)}`;
  console.log('[gymUsers] GET by id', url);
  const res = await axios.get(url, { headers: { ...headers, 'Cache-Control': 'no-cache' } });
  console.log('[gymUsers] GET by id status', res.status);
  return res.data?.data || res.data;
}
