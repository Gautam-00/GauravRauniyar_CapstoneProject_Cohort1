import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ basket, notifications, markAsRead }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hasUnread = notifications?.some(n => !n.read) || false;

  const handleMenuClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const toggleNotifications = async () => {
    if (!showNotifications && hasUnread) {
      await markAsRead();
    }
    setShowNotifications(!showNotifications);
  };

  const basketCount = basket?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="header container">
      <h1>
        <Link to="/" className="brand-logo">
          <span className="brand-icon">🍰</span>
          <span className="brand-name">Cake <span className="brand-accent">Delight</span></span>
        </Link>
      </h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <a href="/#menu" onClick={handleMenuClick}>Menu</a>
        <Link to="/basket">Basket {basketCount > 0 && `(${basketCount})`}</Link>
        <div className="notifications-wrapper" tabIndex={-1} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setShowNotifications(false); }} style={{ position: 'relative', display: 'inline-block' }}>
          <button 
            className="notifications-btn" 
            onClick={toggleNotifications}
          >
            🔔 Notifications
            {hasUnread && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '8px',
                width: '8px',
                height: '8px',
                backgroundColor: '#e91e63',
                borderRadius: '50%'
              }}></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown" style={{
              position: 'absolute', right: 0, top: '100%', background: 'white', border: '1px solid #ddd', padding: '10px', width: '280px', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', maxHeight: '350px', overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>Notifications</h4>
              </div>
              {!notifications || notifications.length === 0 ? (
                <p>No notifications yet.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {notifications.map(n => (
                    <li key={n._id} style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px', opacity: n.read ? 0.6 : 1 }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>
                        {!n.read && <span style={{ color: '#e91e63', marginRight: '5px' }}>•</span>}
                        {n.message}
                      </p>
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
