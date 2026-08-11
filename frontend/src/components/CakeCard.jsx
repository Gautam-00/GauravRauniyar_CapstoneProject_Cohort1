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
        
        <div className="cake-card-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                className="star" 
                style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                onClick={() => handleStarClick(star)}
                title={`Rate ${star} stars`}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {Number(ratingInfo.averageRating).toFixed(1)} ({ratingInfo.totalRatings})
            </span>
          </div>
          
          {showConfirm && (
            <div className="rating-confirm">
              <p style={{ margin: '0 0 8px 0', color: 'var(--color-text-secondary)' }}>Give {selectedStar} stars to {cake.name}?</p>
              {submitError && <p style={{ color: 'var(--color-error)', margin: '0 0 8px 0' }}>{submitError}</p>}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handleCancelRating} 
                  disabled={isSubmitting}
                  style={{ padding: '4px 10px', border: '1px solid var(--color-border)', background: 'white', borderRadius: '6px', cursor: isSubmitting ? 'not-allowed' : 'pointer', color: 'var(--color-text-secondary)', fontFamily: 'inherit' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmRating} 
                  disabled={isSubmitting}
                  style={{ padding: '4px 10px', border: 'none', background: 'var(--color-accent)', color: 'white', borderRadius: '6px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
                >
                  {isSubmitting ? '...' : 'Okay'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="cake-card-desc">{cake.description}</p>
        <div className="cake-card-footer">
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
    </div>
  );
};

export default CakeCard;
