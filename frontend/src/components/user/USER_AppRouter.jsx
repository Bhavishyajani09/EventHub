import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Home from './USER_Home';
import MoviesPage from './USER_MoviesPage';
import EventsPage from './USER_EventsPage';
import MovieDetail from './USER_MovieDetail';
import EventDetail from './USER_EventDetail';
import ArtistProfile from './USER_ArtistProfile';
import BookingPage from './USER_BookingPage';
import EventSeatSelection from './USER_EventSeatSelection';
import AuthModal from '../../AuthModal';
import ProfilePanel from './USER_ProfilePanel';
// ProfilePage import removed
import Bookings from './USER_Bookings';
import Settings from './USER_Settings';
import HelpCenter from './USER_HelpCenter';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './USER_PrivacyPolicy';
import ContactSupport from './USER_ContactSupport';
import NotFound from './USER_NotFound';


import Register from '../../Register';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';

// Wrapper components to handle location state
const MovieDetailWrapper = (props) => {
  const location = useLocation();
  const movie = location.state?.movie || props.selectedMovie;

  if (!movie) return <Navigate to="/movies" replace />;

  return <MovieDetail {...props} movie={movie} />;
};

const EventDetailWrapper = (props) => {
  const location = useLocation();
  const event = location.state?.event || props.selectedEvent;

  if (!event) return <Navigate to="/events" replace />;

  return <EventDetail {...props} event={event} />;
};

const BookingPageWrapper = (props) => {
  const location = useLocation();
  const item = location.state?.item || props.item;

  if (!item) return <Navigate to="/" replace />;

  return <BookingPage {...props} item={item} />;
};

const EventSeatSelectionWrapper = (props) => {
  const location = useLocation();
  const event = location.state?.event || props.event;

  if (!event) return <Navigate to="/" replace />;

  return <EventSeatSelection {...props} event={event} />;
};

const ArtistProfileWrapper = (props) => {
  const location = useLocation();
  const artist = location.state?.artist || props.artist;

  if (!artist) return <Navigate to="/" replace />;

  return <ArtistProfile {...props} artist={artist} />;
};

function AppRouter() {
  const [isDark, setIsDark] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top whenever location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleAuthSuccess = (userData) => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigate = (page) => {
    // Map legacy page names to routes
    const routes = {
      'home': '/',
      'register': '/register',
      'movies': '/movies',
      'events': '/events',
      'booking': '/booking',
      'movieDetail': '/movie-detail',
      'eventDetail': '/event-detail',
      'eventSeats': '/event-seats',
      'artistProfile': '/artist-profile',
      // profile route removed
      'bookings': '/bookings',
      'settings': '/settings',
      'help': '/help',
      'terms': '/terms',
      'privacy': '/privacy',
      'contact': '/contact'
    };

    const route = routes[page] || '/';
    navigate(route);
    setIsProfileOpen(false);

    // Clear search query when navigating away from search pages
    if (page !== 'movies' && page !== 'events') {
      setSearchQuery('');
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    const currentPath = location.pathname;

    if (currentPath !== '/movies' && currentPath !== '/events') {
      if (!query.trim()) return;

      try {
        const { default: eventService } = await import('../../services/eventService');

        const [moviesRes, eventsRes] = await Promise.all([
          eventService.getMovieEvents(),
          eventService.getNonMovieEvents()
        ]);

        const movieMatch = moviesRes.success ? moviesRes.events.some(m =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.category.toLowerCase().includes(query.toLowerCase()) ||
          m.location.toLowerCase().includes(query.toLowerCase())
        ) : false;

        const eventMatch = eventsRes.success ? eventsRes.events.some(e =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.category.toLowerCase().includes(query.toLowerCase()) ||
          (e.venue && e.venue.toLowerCase().includes(query.toLowerCase())) ||
          (e.location && e.location.toLowerCase().includes(query.toLowerCase()))
        ) : false;

        if (movieMatch && !eventMatch) {
          navigate('/movies');
        } else {
          navigate('/events');
        }

      } catch (error) {
        console.error("Search redirection error:", error);
        navigate('/events');
      }
    }
  };

  const handleMovieClick = (item) => {
    if (item.type === 'movie' || item.genre || (!item.type && !item.category)) {
      navigate('/movie-detail', { state: { movie: item } });
    } else {
      navigate('/event-detail', { state: { event: item } });
    }
  };

  const handleArtistClick = (artist) => {
    navigate('/artist-profile', { state: { artist } });
  };

  const handleBookTickets = (item) => {
    const bookingItem = (item.type === 'movie' || item.genre) ? item : item;
    navigate('/booking', { state: { item: bookingItem } });
  };

  const handleGoToSeatSelection = (event) => {
    navigate('/event-seats', { state: { event } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Shared props for pages
  const pageProps = {
    isDark,
    setIsDark,
    user,
    onAuthOpen: () => setIsAuthModalOpen(true),
    onProfileClick: handleProfileClick,
    onNavigate: handleNavigate,
    searchQuery,
    onSearch: handleSearch
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Home
            {...pageProps}
            onMovieClick={handleMovieClick}
            onBookTickets={handleBookTickets}
            onArtistClick={handleArtistClick}
          />
        } />
        <Route path="/register" element={<Register onAuthOpen={() => setIsAuthModalOpen(true)} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/movies" element={
          <MoviesPage
            {...pageProps}
            onMovieClick={handleMovieClick}
            onBookTickets={handleBookTickets}
          />
        } />
        <Route path="/events" element={
          <EventsPage
            {...pageProps}
            onBookTickets={handleBookTickets}
            onMovieClick={handleMovieClick}
            onArtistClick={handleArtistClick}
          />
        } />

        {/* Detail Pages with Wrappers */}
        <Route path="/movie-detail" element={
          <MovieDetailWrapper
            {...pageProps}
            onBack={handleBack}
            onBookTickets={handleBookTickets}
          />
        } />
        <Route path="/event-detail" element={
          <EventDetailWrapper
            {...pageProps}
            onBack={handleBack}
            onBookTickets={handleBookTickets}
          />
        } />

        <Route path="/booking" element={
          <BookingPageWrapper
            {...pageProps}
            onBack={handleBack}
          />
        } />

        <Route path="/event-seats" element={
          <EventSeatSelectionWrapper
            {...pageProps}
            onBack={() => navigate('/booking', { state: { item: location.state?.event } })}
          />
        } />

        <Route path="/artist-profile" element={
          <ArtistProfileWrapper
            {...pageProps}
            onBack={handleBack}
            onEventClick={handleMovieClick}
          />
        } />

        {/* User Pages */}
        {/* Profile route removed */}
        <Route path="/bookings" element={
          <Bookings
            {...pageProps}
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/settings" element={
          <Settings
            {...pageProps}
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/help" element={
          <HelpCenter
            {...pageProps}
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/contact" element={
          <ContactSupport
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/privacy" element={
          <PrivacyPolicy
            onBack={() => navigate('/')}
          />
        } />
        <Route path="/terms" element={
          <TermsAndConditions
            onBack={() => navigate('/')}
          />
        } />

        {/* Redirects for Admin/Organizer paths to prevent 404 flash on logout */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/organizers" element={<Navigate to="/" replace />} />
        <Route path="/users" element={<Navigate to="/" replace />} />
        <Route path="/create-event" element={<Navigate to="/" replace />} />
        <Route path="/edit-event/:id" element={<Navigate to="/" replace />} />
        <Route path="/reviews" element={<Navigate to="/" replace />} />
        <Route path="/reports" element={<Navigate to="/" replace />} />

        {/* Fallback - 404 Page */}
        <Route path="*" element={<NotFound {...pageProps} />} />
      </Routes>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        isDark={isDark}
      />

      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onBack={() => setIsProfileOpen(false)}
        onLogout={() => {
          handleLogout();
          setIsProfileOpen(false);
        }}
        user={user}
        onNavigate={handleNavigate}
        isDark={isDark}
      />
    </div>
  );
}

export default AppRouter;