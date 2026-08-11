import React, { useState } from 'react';

const CakeCard = ({ cake, onAddToBasket }) => {
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (onAddToBasket && cake.available) {
      setAdding(true);
      await onAddToBasket(cake._id);
      setAdding(false);
    }
  };

  return (
    <div className="cake-card">
      <div className="cake-card-image-wrapper">
        <img src={cake.imageUrl} alt={cake.name} className="cake-card-image" />
        {!cake.available && (
          <div className="cake-card-sold-out">
            <span className="cake-card-sold-out-badge">Sold Out</span>
          </div>
        )}
      </div>
      <div className="cake-card-content">
        <span className="cake-card-category">{cake.category}</span>
        <h3 className="cake-card-title">{cake.name}</h3>
        <p className="cake-card-desc">{cake.description}</p>
        <span className="cake-card-price">₹{cake.price}</span>
        <button 
          className="add-to-basket-btn"
          disabled={!cake.available || adding}
          onClick={handleAdd}
        >
          {adding ? 'Adding...' : (cake.available ? 'Add to Basket' : 'Unavailable')}
        </button>
      </div>
    </div>
  );
};

export default CakeCard;
