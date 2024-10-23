// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtworksList from './components/ArtworksList';
import ArtistProfile from './components/ArtistProfile';
import ReviewForm from './components/ReviewForm';
import UploadForm from './components/UploadForm'; 
import LoginForm from './components/LoginForm'; 
import Purchases from './components/Purchases'; // Import Purchases component
import Navbar from './components/Navbar';

function App() {
  const [purchasedArtworks, setPurchasedArtworks] = useState([]);

  const handlePurchase = (artwork) => {
    setPurchasedArtworks(prevArtworks => [...prevArtworks, artwork]);
    // Optionally, save the purchase to a backend or local storage here
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/artworks" element={<ArtworksList onPurchase={handlePurchase} />} />
        <Route path="/artists/profile" element={<ArtistProfile />} />
        <Route path="/reviews" element={<ReviewForm />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/purchases" element={<Purchases purchasedArtworks={purchasedArtworks} />} /> {/* Pass purchased artworks */}
      </Routes>
    </Router>
  );
}

export default App;
