import { apiClient } from './client';

export const getNotifications = async () => {
  return apiClient('/api/notifications', {}, true);
};
