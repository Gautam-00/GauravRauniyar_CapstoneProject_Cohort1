import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';

const CakeCard = ({ cake, onAddToBasket }) => {
  const [adding, setAdding] = useState(false);
  const [ratingInfo, setRatingInfo] = useState(cake.rating || { totalRatings: 0, averageRating: 0 });
  const [selectedStar, setSelectedStar] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleAdd = async () => {
    if (onAddToBasket && cake.available) {
      setAdding(true);
      await onAddToBasket(cake._id);
      setAdding(false);
    }
  };

  const handleStarClick = (starValue) => {
    if (isSubmitting) return;
    setSelectedStar(starValue);
    setShowConfirm(true);
    setSubmitError(null);
  };

  const handleCancelRating = () => {
    setShowConfirm(false);
    setSelectedStar(null);
    setSubmitError(null);
  };

  const handleConfirmRating = async () => {
    if (!selectedStar) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const updatedAggregate = await submitRating(cake._id, selectedStar);
      setRatingInfo({
        totalRatings: updatedAggregate.totalRatings,
        averageRating: updatedAggregate.averageRating
      });
      setShowConfirm(false);
      setSelectedStar(null);
    } catch (err) {
      setSubmitError("Couldn't submit your rating. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        
        <div className="cake-card-rating" style={{ marginBottom: '12px' }}>
          <div className="stars" style={{ display: 'flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                className="star" 
                style={{ 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  color: '#ffc107', 
                  fontSize: '1.2rem',
                  marginRight: '2px'
                }}
                onClick={() => handleStarClick(star)}
                title={`Rate ${star} stars`}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: '8px', fontSize: '0.9rem', color: '#666' }}>
              {Number(ratingInfo.averageRating).toFixed(1)} ({ratingInfo.totalRatings})
            </span>
          </div>
          
          {showConfirm && (
            <div className="rating-confirm" style={{ marginTop: '8px', fontSize: '0.85rem', background: '#f8f9fa', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
              <p style={{ margin: '0 0 8px 0', color: '#333' }}>Give {selectedStar} stars to {cake.name}?</p>
              {submitError && <p style={{ color: 'red', margin: '0 0 8px 0' }}>{submitError}</p>}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handleCancelRating} 
                  disabled={isSubmitting}
                  style={{ padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', color: '#333' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmRating} 
                  disabled={isSubmitting}
                  style={{ padding: '4px 8px', border: 'none', background: '#e83e8c', color: 'white', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? '...' : 'Okay'}
                </button>
              </div>
            </div>
          )}
        </div>

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
