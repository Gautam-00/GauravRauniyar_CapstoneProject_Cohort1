const CakeCard = ({ cake }) => {
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
      </div>
    </div>
  );
};

export default CakeCard;
