import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateItemQuantity, removeItemFromBasket, checkout } from '../api/orderApi';

const BasketPage = ({ basket, setBasket }) => {
  const [updatingIds, setUpdatingIds] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

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

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerDetails = {
      customerName: formData.get('customerName'),
      email: formData.get('email'),
      address: formData.get('address'),
      contactNo: formData.get('contactNo')
    };

    setPlacingOrder(true);
    setError(null);
    try {
      const order = await checkout(customerDetails);
      setBasket({ customerId: basket?.customerId, items: [] });
      navigate('/order-success', { state: { order } });
    } catch (err) {
      setError("Couldn't place your order. Please check your details and try again.");
      setPlacingOrder(false);
    }
  };

  const items = basket?.items || [];
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <main className="container" style={{ minHeight: '60vh', padding: '2rem 0' }}>
        <h2>Your Basket</h2>
        
        {error && <div className="state-message error-message">{error}</div>}

        {items.length === 0 ? (
          <div className="empty-basket-state">
            <p className="empty-basket-title">Your basket is empty.</p>
            <Link to="/" className="btn">Discover Cakes</Link>
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
              
              {!showForm ? (
                <button 
                  className="checkout-btn btn"
                  onClick={() => setShowForm(true)}
                  style={{ marginTop: '1rem', padding: '10px 20px', fontSize: '1.1rem', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <form onSubmit={handleCheckout} style={{ marginTop: '1.5rem', textAlign: 'left', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                  <h4 style={{ marginTop: 0 }}>Customer Details</h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Your Name *</label>
                    <input type="text" name="customerName" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                    <input type="email" name="email" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Address *</label>
                    <input type="text" name="address" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contact Number *</label>
                    <input type="tel" name="contactNo" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)} 
                      style={{ marginRight: '1rem', padding: '10px 20px', background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={placingOrder}
                      style={{ padding: '10px 20px', fontSize: '1.1rem', backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {placingOrder ? 'Submitting...' : 'Submit Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default BasketPage;
