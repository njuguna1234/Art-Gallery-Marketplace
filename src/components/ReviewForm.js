import React, { useState } from 'react';
import '../styles/Form.css';

function ReviewForm({ artworkId }) { // Accept artworkId as a prop
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(null); // State to store the submitted review

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for the POST request
    const reviewData = {
      content,
      rating,
      artworkId, // Include the artworkId to associate the review with the artwork
    };

    // Send POST request to the backend
    fetch(`https://art-gallery-backend-2-1.onrender.com/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to submit review');
        }
        return res.json();
      })
      .then(data => {
        console.log('Review submitted successfully:', data);
        // Store the submitted review in the state
        setSubmittedReview({
          content: data.content, 
          rating: data.rating
        });
        // Reset form inputs
        setContent('');
        setRating(5);
      })
      .catch(err => {
        console.error('Error submitting review:', err);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Leave a Review</h2>
        <label htmlFor="content">Review</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />

        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
        </select>

        <button type="submit">Submit Review</button>
      </form>

      {/* Conditionally render the submitted review */}
      {submittedReview && (
        <div className="submitted-review">
          <h3>Your Review</h3>
          <p><strong>Rating:</strong> {submittedReview.rating}</p>
          <p><strong>Review:</strong> {submittedReview.content}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
