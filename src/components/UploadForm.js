import React, { useState } from 'react';
import '../styles/Form.css'; // Assuming you're using a common form style

function UploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', file); // Ensure 'image' matches the backend key

    try {
      const response = await fetch('http://localhost:8001/artwork', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error uploading artwork');
      }

      const data = await response.json();
      setSuccessMessage(data.message || 'Artwork uploaded successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error during artwork submission:', error);
      setErrorMessage(error.message || 'An error occurred');
      setSuccessMessage('');
    }
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

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UploadForm;
