// src/components/Marketplace.js
import React, { useState } from 'react';
import ArtworksList from './ArtworksList';
import Purchase from './Purchases';
import '../styles/Marketplace.css';

function Marketplace() {
  const [purchases, setPurchases] = useState([]);

  const handlePurchase = (artwork) => {
    setPurchases([...purchases, artwork]); // Add purchased artwork to the state
  };

  return (
    <div className="marketplace-container">
      <div className="artworks-section">
        <ArtworksList onPurchase={handlePurchase} />
      </div>
      <div className="purchases-section">
        <Purchase purchases={purchases} />
      </div>
    </div>
  );
}

export default Marketplace;
