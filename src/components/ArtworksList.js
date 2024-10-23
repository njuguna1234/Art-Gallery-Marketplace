// src/components/ArtworksList.js
import React, { useEffect, useState } from 'react';
import '../styles/ArtworksList.css';

function ArtworksList({ onPurchase }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch(`https://art-gallery-backend-2-1.onrender.com/artworks`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setArtworks(data))
      .catch(err => console.error('Error fetching artworks:', err));
  }, []);

  const handlePurchase = (artwork) => {
    if (onPurchase) {
      onPurchase(artwork); // Call onPurchase with the selected artwork
    }
  };

  return (
    <div className="artworks-list-container">
      <h1>Available Artworks</h1>
      <div className="artworks-list">
        {artworks.map(artwork => (
          <div key={artwork.id} className="artwork-card">
            <img src={artwork.image_url} alt={artwork.title} className="artwork-image" />
            <h2>{artwork.title}</h2>
            <p>{artwork.description}</p>
            <p>Price: ${artwork.price}</p>
            <button onClick={() => handlePurchase(artwork)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtworksList;
