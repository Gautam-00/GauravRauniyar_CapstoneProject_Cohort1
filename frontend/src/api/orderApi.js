import { apiClient } from './client';

export const getBasket = async () => {
  return apiClient('/api/orders/basket', {}, true);
};

export const addItemToBasket = async (cakeId) => {
  return apiClient('/api/orders/basket/items', {
    body: { cakeId, quantity: 1 }
  }, true);
};

export const updateItemQuantity = async (cakeId, quantity) => {
  return apiClient(`/api/orders/basket/items/${cakeId}`, {
    method: 'PUT',
    body: { quantity }
  }, true);
};

export const removeItemFromBasket = async (cakeId) => {
  return apiClient(`/api/orders/basket/items/${cakeId}`, {
    method: 'DELETE'
  }, true);
};

export const checkout = async () => {
  return apiClient('/api/orders/checkout', {
    method: 'POST'
  }, true);
};
