import React, { useState } from 'react';
import '../styles/Form.css';

function ArtworkForm({ artistId, onSubmit }) {  // Accept artistId as prop
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to send the data
    const artworkData = {
      title,
      description,
      price,
      image_url: imageUrl,  // Send the image URL as part of the data
      artist_id: artistId    // Use the artistId passed in as a prop
    };

    // Send data to the backend
    fetch(`http://localhost:8001/artworks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkData),  // Send artwork data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Artwork uploaded successfully:', data);
        // Optionally, you can call onSubmit to update the artwork list in ArtistProfile
        if (onSubmit) {
          onSubmit(data);
        }
        // Reset the form
        setTitle('');
        setDescription('');
        setPrice(0);
        setImageUrl('');
      })
      .catch((error) => {
        console.error('Error uploading artwork:', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Upload Artwork</h2>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />

        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="imageUrl">Artwork Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ArtworkForm;
