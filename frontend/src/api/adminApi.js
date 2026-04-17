import apiClient from './client';
import { AUTH_STORAGE_KEY } from '../context/authStore';

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

export async function fetchAdminUsers() {
  const { data } = await apiClient.get('/admin/users', {
    headers: getAuthHeader(),
  });
  return data;
}

export async function fetchAdminUsersCount() {
  const { data } = await apiClient.get('/admin/users/count', {
    headers: getAuthHeader(),
  });
  return data;
}

export async function fetchAdminAnalytics() {
  const { data } = await apiClient.get('/admin/analytics', {
    headers: getAuthHeader(),
  });
  return data;
}

export async function exportAdminUsersCsv({ fromDate, toDate } = {}) {
  const response = await apiClient.get('/admin/export', {
    headers: getAuthHeader(),
    params: {
      from_date: fromDate,
      to_date: toDate,
    },
    responseType: 'blob',
  });

  return response;
}

function escapeCsvValue(value) {
  const text = String(value ?? '');
  if (text.includes('"') || text.includes(',') || text.includes('\n') || text.includes('\r')) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

export function buildUsersCsv(users) {
  const header = ['Name', 'Email', 'Mobile Number', 'District', 'Signup Date'];
  const rows = users.map((user) => [
    `${user.first_name || ''} ${user.last_name || ''}`.trim() || '-',
    user.email || '-',
    user.mobile || '-',
    user.district || user.address || '-',
    user.created_at ? String(user.created_at).slice(0, 10) : '-',
  ]);

  return [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\r\n');
}

export function downloadUsersCsv(users, filename = 'users_export.csv') {
  const csv = buildUsersCsv(users);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
