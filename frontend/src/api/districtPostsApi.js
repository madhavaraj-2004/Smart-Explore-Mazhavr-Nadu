import apiClient from './client';

export async function fetchDistrictPosts(district) {
  const params = district ? { district } : {};
  const { data } = await apiClient.get('/district-posts', { params });
  return data;
}

export async function createDistrictPost(payload) {
  const formData = new FormData();
  formData.append('district', payload.district);
  formData.append('title', payload.title);
  formData.append('description', payload.description);
  if (payload.image) {
    formData.append('image', payload.image);
  }

  const { data } = await apiClient.post('/district-posts', formData);
  return data;
}

export async function updateDistrictPost(postId, payload) {
  const formData = new FormData();
  formData.append('district', payload.district);
  formData.append('title', payload.title);
  formData.append('description', payload.description);
  if (payload.image) {
    formData.append('image', payload.image);
  }

  const { data } = await apiClient.put(`/district-posts/${postId}`, formData);
  return data;
}

export async function deleteDistrictPost(postId) {
  await apiClient.delete(`/district-posts/${postId}`);
}
