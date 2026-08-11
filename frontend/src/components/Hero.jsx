import React from 'react';

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h2>Discover Your Perfect Cake</h2>
        <p>Handcrafted with love for your special moments.</p>
        <a href="#menu" className="hero-cta">View Menu</a>
      </div>
      <img src="/images/red-velvet-cake.avif" alt="Delicious Red Velvet Cake" className="hero-image" />
    </div>
  );
};

export default Hero;
