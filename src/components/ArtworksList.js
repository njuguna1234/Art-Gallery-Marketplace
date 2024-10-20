import React, { useEffect, useState } from 'react';
import '../styles/ArtworksList.css';

function ArtworksList() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Use the environment variable for the backend URL
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/artworks`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setArtworks(data))
      .catch(err => console.error('Error fetching artworks:', err));
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
