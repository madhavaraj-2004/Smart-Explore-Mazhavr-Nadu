import apiClient from './client';

export const chatWithAI = async ({ message, activity }) => {
  const { data } = await apiClient.post('/ai/chat', {
    message,
    activity,
  });
  return data;
};
