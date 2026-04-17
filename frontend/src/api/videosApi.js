import apiClient from './client';
import { AUTH_STORAGE_KEY } from '../context/authStore';

const DISTRICTS = ['Salem', 'Dharmapuri', 'Krishnagiri', 'Namakkal'];

function getAuthHeader() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    const token = parsed?.token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export async function fetchDistrictVideos() {
  const { data } = await apiClient.get('/api/videos');
  const mapped = new Map(Array.isArray(data) ? data.map((item) => [item.district, item.video_url]) : []);

  return DISTRICTS.map((district) => ({
    district,
    video_url: mapped.get(district) || '',
  }));
}

export async function saveDistrictVideo({ district, video_url }) {
  const { data } = await apiClient.post(
    '/api/videos',
    { district, video_url },
    {
      headers: getAuthHeader(),
    },
  );
  return data;
}
