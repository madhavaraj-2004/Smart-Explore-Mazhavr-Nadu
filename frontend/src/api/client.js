import axios from 'axios';

const LOCAL_FALLBACKS = ['http://localhost:8000', 'http://127.0.0.1:8000'];
const IS_DEV = import.meta.env.DEV;

function normalizeBaseUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return undefined;
  }

  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
}

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

function inferRuntimeBaseUrl() {
  if (typeof window === 'undefined' || !IS_DEV) {
    return undefined;
  }

  const host = window.location.hostname?.trim();
  if (!host) {
    return undefined;
  }

  // Keep backend port fixed while adapting host for localhost/LAN/mobile access.
  return normalizeBaseUrl(`http://${host}:8000`);
}

function getFallbackBaseUrls(currentBase) {
  const runtimeBase = inferRuntimeBaseUrl();
  const configured = [API_BASE_URL, runtimeBase, ...(IS_DEV ? LOCAL_FALLBACKS : [])]
    .map((url) => normalizeBaseUrl(url))
    .filter(Boolean);
  const unique = Array.from(new Set(configured));
  return unique.filter((url) => url !== normalizeBaseUrl(currentBase));
}

const runtimeBase = inferRuntimeBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL || runtimeBase || LOCAL_FALLBACKS[0],
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error?.config;
    const code = error?.code || '';
    const retried = original?.__retriedBaseUrl;
    const isNetworkIssue = code === 'ERR_NETWORK' || code === 'ECONNABORTED';

    if (!original || !isNetworkIssue || retried) {
      return Promise.reject(error);
    }

    const currentBase = original.baseURL || apiClient.defaults.baseURL;
    const nextBase = getFallbackBaseUrls(currentBase)[0];
    if (!nextBase) {
      return Promise.reject(error);
    }

    original.__retriedBaseUrl = true;
    original.baseURL = nextBase;
    return apiClient.request(original);
  },
);

export default apiClient;
