import { apiClient } from './client';

export const getNotifications = async () => {
  return apiClient('/api/notifications', {}, true);
};

export const markNotificationsAsRead = async () => {
  return apiClient('/api/notifications/read', { method: 'PATCH' }, true);
};
