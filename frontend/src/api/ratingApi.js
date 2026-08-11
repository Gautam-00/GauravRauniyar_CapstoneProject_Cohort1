import { apiClient } from './client';

export const submitRating = async (cakeId, rating) => {
  const data = await apiClient('/api/ratings', {
    body: {
      cakeId,
      rating
    }
  });
  return data;
};
