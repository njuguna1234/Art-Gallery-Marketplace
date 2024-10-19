// src/components/ArtworkForm.js

import React, { useState } from 'react';
import '../styles/Form.css';

function ArtworkForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [artworkImage, setArtworkImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      price,
      artworkImage,
    });

    // Implement form submission logic, e.g., sending data to the backend
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
