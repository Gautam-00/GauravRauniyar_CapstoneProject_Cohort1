const CUSTOMER_ID_KEY = 'cake_delight_customer_id';

/**
 * Retrieves the existing anonymous customer ID from localStorage,
 * or generates a new one and saves it if it doesn't exist.
 * @returns {string} The UUID representing the anonymous customer.
 */
export const getCustomerId = () => {
  let customerId = localStorage.getItem(CUSTOMER_ID_KEY);
  if (!customerId) {
    customerId = crypto.randomUUID();
    localStorage.setItem(CUSTOMER_ID_KEY, customerId);
  }
  return customerId;
};
