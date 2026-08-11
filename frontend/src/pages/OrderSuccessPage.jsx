import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <>
      <Header basket={{ items: [] }} />
      <main className="container" style={{ minHeight: '60vh', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#4caf50', marginBottom: '1rem' }}>🎉 Order placed successfully!</h2>
        
        {order ? (
          <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            <p style={{ margin: '0 0 1rem 0' }}><strong>Order ID:</strong> {order._id}</p>
            <p style={{ margin: '0 0 1rem 0' }}><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p style={{ margin: '0', color: '#666' }}>Your delicious cake is being prepared!</p>
          </div>
        ) : (
          <p style={{ marginBottom: '2rem' }}>We couldn't find your order details, but if you just placed one, it's being processed.</p>
        )}
        
        <Link to="/" className="btn" style={{ padding: '10px 20px', backgroundColor: '#e91e63', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Continue Shopping
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
