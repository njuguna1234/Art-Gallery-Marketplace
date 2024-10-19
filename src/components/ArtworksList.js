import React, { useEffect, useState } from 'react';
import '../styles/ArtworksList.css';

function ArtworksList() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('/api/artworks')
      .then(res => res.json())
      .then(data => setArtworks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Artworks</h1>
      <div>
        {artworks.map(artwork => (
          <div key={artwork.id}>
            <h2>{artwork.title}</h2>
            <p>{artwork.description}</p>
            <p>Price: ${artwork.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtworksList;
