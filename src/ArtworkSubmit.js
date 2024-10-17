import React from 'react';
import ArtworkForm from './ArtworkForm';

const ArtworkSubmit = () => {
  const handleSubmit = (formData) => {
    fetch('/api/artworks', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Submit Your Artwork</h2>
      <ArtworkForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ArtworkSubmit;
