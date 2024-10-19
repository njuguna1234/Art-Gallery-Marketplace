import React, { useState, useEffect } from 'react';
import ArtworkForm from './ArtworkForm';
import '../styles/ArtistProfile.css';

function ArtistProfile() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('/api/artists/artworks')
      .then(res => res.json())
      .then(data => setArtworks(data))
      .catch(err => console.error(err));
  }, []);

  const handleArtworkSubmit = (values) => {
    fetch('/api/artworks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(newArtwork => setArtworks([...artworks, newArtwork]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Your Art Listings</h1>
      {artworks.map(artwork => (
        <div key={artwork.id}>
          <h2>{artwork.title}</h2>
          <p>{artwork.description}</p>
        </div>
      ))}
      <h2>Add New Artwork</h2>
      <ArtworkForm onSubmit={handleArtworkSubmit} />
    </div>
  );
}

export default ArtistProfile;
