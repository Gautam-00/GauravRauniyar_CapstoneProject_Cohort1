import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BasketPage from './pages/BasketPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { getBasket } from './api/orderApi';

function App() {
  const [basket, setBasket] = useState(null);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const data = await getBasket();
        setBasket(data);
      } catch (error) {
        console.error('Failed to load basket', error);
      }
    };
    fetchBasket();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home basket={basket} setBasket={setBasket} />} />
      <Route path="/basket" element={<BasketPage basket={basket} setBasket={setBasket} />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
    </Routes>
  );
}

export default App;
