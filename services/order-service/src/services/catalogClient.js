const getCakeDetails = async (cakeId) => {
  const catalogUrl = process.env.CATALOG_SERVICE_URL || 'http://localhost:3001';
  try {
    const response = await fetch(`${catalogUrl}/cakes/${cakeId}`);
    
    if (response.status === 404) {
      return { error: 'NOT_FOUND', message: 'Cake not found in Catalog' };
    }
    
    if (response.status === 400) {
      return { error: 'BAD_REQUEST', message: 'Invalid Cake ID format' };
    }

    if (!response.ok) {
      return { error: 'SERVER_ERROR', message: `Catalog Service returned ${response.status}` };
    }

    const cake = await response.json();
    
    if (cake.available === false) {
      return { error: 'UNAVAILABLE', message: 'Cake is currently unavailable' };
    }

    return { cake };
  } catch (err) {
    console.error('Catalog Service connection failed:', err.message);
    return { error: 'UNAVAILABLE', message: 'Catalog Service is unavailable' };
  }
};

module.exports = {
  getCakeDetails
};
