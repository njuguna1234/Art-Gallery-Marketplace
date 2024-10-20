import React, { useEffect, useState } from 'react';

function ArtistProfile() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('https://backend-deployment-4.onrender.com/api/artworks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtworks(data.artworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      <h2>Your Artworks</h2>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
            <p>Price: ${artwork.price}</p>
            <img src={artwork.image_url} alt={artwork.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistProfile;
