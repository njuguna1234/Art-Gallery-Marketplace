import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtworksList from './components/ArtworksList';
import ArtistProfile from './components/ArtistProfile';
import ReviewForm from './components/ReviewForm';
import UploadForm from './components/UploadForm'; // Add upload form
import LoginForm from './components/LoginForm'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/artworks" element={<ArtworksList />} />
        <Route path="/artists/profile" element={<ArtistProfile />} />
        <Route path="/reviews" element={<ReviewForm />} />
        <Route path="/upload" element={<UploadForm />} /> {/* Upload Art Route */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
