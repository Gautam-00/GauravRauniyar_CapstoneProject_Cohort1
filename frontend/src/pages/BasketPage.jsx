import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { updateItemQuantity, removeItemFromBasket, checkout } from '../api/orderApi';

const BasketPage = ({ basket, setBasket }) => {
  const [updatingIds, setUpdatingIds] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdateQuantity = async (cakeId, newQuantity) => {
    setUpdatingIds(prev => ({ ...prev, [cakeId]: true }));
    setError(null);
    try {
      if (newQuantity === 0) {
        const updatedBasket = await removeItemFromBasket(cakeId);
        setBasket(updatedBasket);
      } else {
        const updatedBasket = await updateItemQuantity(cakeId, newQuantity);
        setBasket(updatedBasket);
      }
    } catch (err) {
      setError("Couldn't update your basket.");
    } finally {
      setUpdatingIds(prev => ({ ...prev, [cakeId]: false }));
    }
  };

  const handleCheckout = async () => {
    setPlacingOrder(true);
    setError(null);
    try {
      const order = await checkout();
      setBasket({ customerId: basket?.customerId, items: [] });
      navigate('/order-success', { state: { order } });
    } catch (err) {
      setError("Couldn't place your order. Please try again.");
      setPlacingOrder(false);
    }
  };

  const items = basket?.items || [];
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <Header basket={basket} />
      <main className="container" style={{ minHeight: '60vh', padding: '2rem 0' }}>
        <h2>Your Basket</h2>
        
        {error && <div className="state-message error-message">{error}</div>}

        {items.length === 0 ? (
          <div className="state-message">
            <p>Your basket is empty.</p>
            <Link to="/" className="btn">Browse Cakes</Link>
          </div>
        ) : (
          <div className="basket-content">
            <div className="basket-items">
              {items.map(item => (
                <div key={item.cakeId} className="basket-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#666' }}>₹{item.price}</p>
                  </div>
                  <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => handleUpdateQuantity(item.cakeId, item.quantity - 1)}
                      disabled={updatingIds[item.cakeId]}
                      style={{ padding: '5px 10px', cursor: 'pointer' }}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.cakeId, item.quantity + 1)}
                      disabled={updatingIds[item.cakeId]}
                      style={{ padding: '5px 10px', cursor: 'pointer' }}
                    >+</button>
                  </div>
                  <div style={{ marginLeft: '2rem', fontWeight: 'bold' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="basket-summary" style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px', textAlign: 'right' }}>
              <h3>Total: ₹{total}</h3>
              <button 
                className="checkout-btn btn"
                onClick={handleCheckout}
                disabled={placingOrder}
                style={{ marginTop: '1rem', padding: '10px 20px', fontSize: '1.1rem', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {placingOrder ? 'Placing order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BasketPage;
