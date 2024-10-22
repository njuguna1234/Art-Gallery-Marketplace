import React, { useEffect, useState } from 'react';

function ArtistProfile() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('http://localhost:8001/artworks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // If your API returns an array of artworks directly, no need to use data.artworks
        setArtworks(data); // or setArtworks(data.artworks) if it's nested
      } catch (error) {
        console.error("Error fetching artworks:", error.message); // Log the error message
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      <h2>Your Artworks</h2>
      <ul>
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <li key={artwork.id}>
              <h3>{artwork.title}</h3>
              <p>{artwork.description}</p>
              <p>Price: ${artwork.price}</p>
              <img 
                src={artwork.image_url} 
                alt={`Artwork titled ${artwork.title}`} 
                width="200"
                height="auto"
              />
            </li>
          ))
        ) : (
          <p>No artworks available.</p>
        )}
      </ul>
    </div>
  );
}

export default ArtistProfile;
