import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/user/USER_Home';
import MoviesPage from './components/user/USER_MoviesPage';
import EventsPage from './components/user/USER_EventsPage';
import USER_MovieDetail from './components/user/USER_MovieDetail';
import USER_ArtistProfile from './components/user/USER_ArtistProfile';
import USER_BookingPage from './components/user/USER_BookingPage';
import AuthModal from './AuthModal';
import './index.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthOpen = () => setIsAuthModalOpen(true);
  const handleAuthClose = () => setIsAuthModalOpen(false);
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleProfileClick = () => console.log('Profile clicked');
  
  const handleMovieClick = (movie) => {
    navigate('/movie', { state: { movie } });
  };
  
  const handleArtistClick = (artist) => {
    navigate('/artist', { state: { artist } });
  };
  
  const handleBookTickets = (item) => {
    navigate('/booking', { state: { item } });
  };

  const handleNavigate = (page) => {
    if (page === 'home') navigate('/');
    else if (page === 'movies') navigate('/movies');
    else if (page === 'events') navigate('/events');
    else navigate(`/${page}`);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Home 
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={handleAuthOpen}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onMovieClick={handleMovieClick}
            onBookTickets={handleBookTickets}
            onArtistClick={handleArtistClick}
          />
        } />
        
        <Route path="/movies" element={
          <MoviesPage 
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={handleAuthOpen}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onMovieClick={handleMovieClick}
            onBookTickets={handleBookTickets}
          />
        } />
        
        <Route path="/events" element={
          <EventsPage 
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={handleAuthOpen}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBookTickets={handleBookTickets}
            onMovieClick={handleMovieClick}
            onArtistClick={handleArtistClick}
          />
        } />
        
        <Route path="/movie" element={
          <USER_MovieDetail 
            movie={location.state?.movie}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={handleAuthOpen}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => navigate(-1)}
            onBookTickets={handleBookTickets}
          />
        } />
        
        <Route path="/artist" element={
          <USER_ArtistProfile 
            artist={location.state?.artist}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={handleAuthOpen}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => navigate(-1)}
            onEventClick={handleMovieClick}
          />
        } />
        
        <Route path="/booking" element={
          <USER_BookingPage 
            item={location.state?.item}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={handleAuthOpen}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => navigate(-1)}
          />
        } />
      </Routes>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleAuthClose}
        onAuthSuccess={handleAuthSuccess}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
