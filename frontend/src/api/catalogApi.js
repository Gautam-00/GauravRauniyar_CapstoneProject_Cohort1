import { apiClient } from './client';

export const getCakes = async () => {
  return await apiClient('/api/catalog/cakes', {}, false);
};
