import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CakeCard from '../components/CakeCard';
import { getCakes } from '../api/catalogApi';
import { addItemToBasket } from '../api/orderApi';

const Home = ({ basket, setBasket }) => {
  const [allCakes, setAllCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCakes();
      setAllCakes(data);
    } catch (err) {
      setError('We couldn\'t load the menu today.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleAddToBasket = async (cakeId) => {
    try {
      const updatedBasket = await addItemToBasket(cakeId);
      setBasket(updatedBasket);
    } catch (err) {
      alert("Couldn't add this cake to your basket. Please try again.");
    }
  };

  const filteredCakes = allCakes.filter(cake => {
    const matchCategory = selectedCategory === 'all' || cake.categoryId === selectedCategory;
    
    let matchPrice = true;
    if (selectedPriceRange === '299-599') matchPrice = cake.price >= 299 && cake.price <= 599;
    else if (selectedPriceRange === '600-899') matchPrice = cake.price >= 600 && cake.price <= 899;
    else if (selectedPriceRange === '900-1199') matchPrice = cake.price >= 900 && cake.price <= 1199;
    else if (selectedPriceRange === '1200-1499') matchPrice = cake.price >= 1200 && cake.price <= 1499;
    else if (selectedPriceRange === '1500-1799') matchPrice = cake.price >= 1500 && cake.price <= 1799;

    return matchCategory && matchPrice;
  });

  return (
    <>
      <Hero />
      
      <main id="menu" className="container">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="cat_butter">Butter & Shortened Cakes</option>
              <option value="cat_sponge">Sponge & Foam Cakes</option>
              <option value="cat_cheese">Cheesecakes</option>
              <option value="cat_chocolate">Speciality Chocolate Cakes</option>
              <option value="cat_hybrid">Celebration & Hybrid Cakes</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="price">Price</label>
            <select 
              id="price"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="299-599">₹299 – ₹599</option>
              <option value="600-899">₹600 – ₹899</option>
              <option value="900-1199">₹900 – ₹1,199</option>
              <option value="1200-1499">₹1,200 – ₹1,499</option>
              <option value="1500-1799">₹1,500 – ₹1,799</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="state-message">Warming up the ovens...</div>
        ) : error ? (
          <div className="state-message error-message">
            {error}
            <div>
              <button className="retry-button" onClick={fetchCatalog}>Retry</button>
            </div>
          </div>
        ) : filteredCakes.length === 0 ? (
          <div className="state-message">No cakes match your selected filters.</div>
        ) : (
          <div className="catalog-grid">
            {filteredCakes.map(cake => (
              <CakeCard key={cake._id} cake={cake} onAddToBasket={handleAddToBasket} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
