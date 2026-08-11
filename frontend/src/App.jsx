import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BasketPage from './pages/BasketPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { getBasket } from './api/orderApi';
import { getNotifications, markNotificationsAsRead } from './api/notificationApi';

function App() {
  const [basket, setBasket] = useState(null);
  const [notifications, setNotifications] = useState([]);

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

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
      return data;
    } catch (error) {
      console.error('Failed to load notifications', error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async () => {
    try {
      await markNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Failed to mark notifications as read', error);
    }
  };

  return (
    <>
      <Header 
        basket={basket} 
        notifications={notifications} 
        markAsRead={markAsRead} 
      />
      <Routes>
        <Route path="/" element={<Home basket={basket} setBasket={setBasket} />} />
        <Route path="/basket" element={<BasketPage basket={basket} setBasket={setBasket} />} />
        <Route path="/order-success" element={<OrderSuccessPage fetchNotifications={fetchNotifications} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
