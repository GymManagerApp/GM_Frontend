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
  if (legacy) {
    return legacy.token || legacy.accessToken || legacy.data?.token || null;
  }
  return null;
}

async function authHeaders() {
  const token = await getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type MembershipPlan = {
  _id: string;
  gymId: string;
  name: string;
  description?: string;
  durationInMonths: string;
  freeMonths?: string;
  bonus?: string;
  image?: string;
  price: number;
  benefits?: string[];
  isActive?: number;
  createdAt?: string;
  updatedAt?: string;
};

export async function listMembershipPlans(): Promise<MembershipPlan[]> {
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.membershipPlans.list}`;
  const res = await axios.get(url, { headers: { ...headers, 'Cache-Control': 'no-cache' } });
  return res.data?.data || res.data;
}

export async function getMembershipPlanById(id: string): Promise<MembershipPlan> {
  if (!id) throw new Error('getMembershipPlanById: id is required');
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.membershipPlans.byId(id)}`;
  const res = await axios.get(url, { headers: { ...headers, 'Cache-Control': 'no-cache' } });
  return res.data?.data || res.data;
}

export async function createMembershipPlan(payload: {
  gymId: string;
  name: string; // or planName accepted by backend
  description?: string;
  durationInMonths: string; // or duration accepted by backend
  freeMonths?: string;
  bonus?: string;
  image?: string;
  price: number;
  benefits?: string[];
}) {
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.membershipPlans.create}`;
  const res = await axios.post(url, payload, { headers });
  return res.data?.data || res.data;
}

export async function updateMembershipPlan(id: string, payload: Partial<{
  gymId: string;
  name: string;
  description: string;
  durationInMonths: string;
  freeMonths: string;
  bonus: string;
  image: string;
  price: number;
  benefits: string[];
}>) {
  if (!id) throw new Error('updateMembershipPlan: id is required');
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.membershipPlans.update(id)}`;
  const res = await axios.put(url, payload, { headers });
  return res.data?.data || res.data;
}

export async function deleteMembershipPlan(id: string) {
  if (!id) throw new Error('deleteMembershipPlan: id is required');
  const headers = await authHeaders();
  const url = `${HOST_API}${apiEndpoints.membershipPlans.delete(id)}`;
  const res = await axios.delete(url, { headers });
  return res.data?.data || res.data;
}
