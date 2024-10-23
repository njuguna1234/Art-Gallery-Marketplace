// src/components/Purchases.js

import React from 'react';
import '../styles/Purchase.css'; // Import your CSS for styling

function Purchases({ purchasedArtworks }) {
  return (
    <div className="purchase-container">
      <h1>Your Purchases</h1>
      {purchasedArtworks.length === 0 ? (
        <p>You have not made any purchases yet.</p>
      ) : (
        <ul>
          {purchasedArtworks.map((purchase, index) => (
            <li key={index}>
              <h2>{purchase.title}</h2>
              <p>Description: {purchase.description}</p>
              <p>Price: ${purchase.price}</p>
              <img src={purchase.image_url} alt={purchase.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Purchases;
