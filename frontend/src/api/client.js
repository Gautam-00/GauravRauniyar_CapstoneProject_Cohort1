import { getCustomerId } from '../utils/customerId';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Base fetch client for interacting with the Express Gateway.
 * 
 * @param {string} endpoint - API endpoint (e.g., '/api/catalog/cakes')
 * @param {object} options - Fetch options
 * @param {boolean} attachCustomerId - Whether to attach X-Customer-Id header (true for Orders and Notifications)
 */
export const apiClient = async (endpoint, { body, ...customConfig } = {}, attachCustomerId = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (attachCustomerId) {
    headers['X-Customer-Id'] = getCustomerId();
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || response.statusText);
    error.status = response.status;
    throw error;
  }

  return data;
};
