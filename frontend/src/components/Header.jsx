import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications } from '../api/notificationApi';

const Header = ({ basket }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [errorNotifs, setErrorNotifs] = useState(null);

  const toggleNotifications = async () => {
    if (!showNotifications) {
      setLoadingNotifs(true);
      setErrorNotifs(null);
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setErrorNotifs("Couldn't load notifications.");
      } finally {
        setLoadingNotifs(false);
      }
    }
    setShowNotifications(!showNotifications);
  };

  const basketCount = basket?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="header container">
      <h1><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Cake Delight</Link></h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/">Menu</Link>
        <Link to="/basket">Basket {basketCount > 0 && `(${basketCount})`}</Link>
        <div className="notifications-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
          <button 
            className="notifications-btn" 
            onClick={toggleNotifications}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', color: 'inherit', padding: 0 }}
          >
            🔔 Notifications
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown" style={{
              position: 'absolute', right: 0, top: '100%', background: 'white', border: '1px solid #ddd', padding: '10px', width: '280px', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', maxHeight: '350px', overflowY: 'auto'
            }}>
              {loadingNotifs ? (
                <p>Loading notifications...</p>
              ) : errorNotifs ? (
                <p style={{ color: 'red' }}>{errorNotifs}</p>
              ) : notifications.length === 0 ? (
                <p>No notifications yet.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {notifications.map(n => (
                    <li key={n._id} style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px' }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>{n.message}</p>
                      <small style={{ color: '#666' }}>{new Date(n.createdAt).toLocaleDateString()}</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
