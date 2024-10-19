// src/components/UploadForm.js

import React, { useState } from 'react';
import '../styles/Form.css'; // Assuming you're using a common form style

function UploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file', file);

    // Handle form submission, you can use fetch or axios to send form data to your backend
    console.log({ title, description, price, file });
  };

  return (
    <div className="upload-form">
      <h2>Upload Your Artwork</h2>
      <form onSubmit={handleSubmit} className="form">
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
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="file">Upload Art</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Upload Artwork</button>
      </form>
    </div>
  );
}

export default UploadForm;
