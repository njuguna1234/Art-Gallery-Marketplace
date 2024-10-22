// src/components/ArtworkForm.js

import React, { useState } from 'react';
import '../styles/Form.css';

function ArtworkForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [artworkImage, setArtworkImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the image and other fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (artworkImage) {
      formData.append('artworkImage', artworkImage); // Append the selected file
    }

    // Send data to the backend
    fetch(`http://localhost:8001/artworks`, {
      method: 'POST',
      body: formData,  // Send the FormData
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
        setArtworkImage(null);
      })
      .catch((error) => {
        console.error('Error uploading artwork:', error);
      });
  };

  const handleFileChange = (e) => {
    setArtworkImage(e.target.files[0]); // Save the selected file
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

        <label htmlFor="artworkImage">Upload Artwork Image</label>
        <input
          type="file"
          id="artworkImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ArtworkForm;
