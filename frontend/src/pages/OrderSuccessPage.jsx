import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = ({ fetchNotifications }) => {
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order || !fetchNotifications) return;

    let attempts = 0;
    const maxAttempts = 5;
    let timer;

    const checkNotifications = async () => {
      attempts++;
      const freshNotifications = await fetchNotifications();
      const found = freshNotifications?.some(n => n.orderId === order._id);
      
      if (found || attempts >= maxAttempts) {
        return; // Stop checking immediately
      }
      
      timer = setTimeout(checkNotifications, 1000);
    };

    // Wait 1 second before first check
    timer = setTimeout(checkNotifications, 1000);

    return () => clearTimeout(timer);
  }, [order, fetchNotifications]);

  return (
    <>
      <main className="container" style={{ minHeight: '60vh', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#4caf50', marginBottom: '1rem' }}>🎉 Order placed successfully!</h2>
        
        {order ? (
          <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              Thank you for your order{order.customerName ? `, ${order.customerName}` : ''}!
            </p>
            <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
              Your order ID is <strong>{order._id}</strong>
            </p>
            <p style={{ margin: '0' }}><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          </div>
        ) : (
          <p style={{ marginBottom: '2rem' }}>We couldn't find your order details, but if you just placed one, it's being processed.</p>
        )}
        
        <Link to="/" className="btn" style={{ padding: '10px 20px', backgroundColor: '#e91e63', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Continue Shopping
        </Link>
      </main>
    </>
  );
};

export default OrderSuccessPage;
