import React, { useState, useEffect } from 'react';
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
import ProfilePage from './USER_Profile';
import Bookings from './USER_Bookings';
import Settings from './USER_Settings';
import HelpCenter from './USER_HelpCenter';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './USER_PrivacyPolicy';
import ContactSupport from './USER_ContactSupport';

import Register from '../../Register';

function AppRouter() {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const { user, logout } = useAuth();

  // Scroll to top whenever page changes
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  // Handle URL changes
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setCurrentPage('home');

    } else if (path === '/register') {
      setCurrentPage('register');
    } else if (path === '/movies') {
      setCurrentPage('movies');
    } else if (path === '/events') {
      setCurrentPage('events');
    } else if (path === '/booking') {
      setCurrentPage('booking');
    } else if (path === '/movie-detail') {
      // Only set movieDetail if we have a selected movie, otherwise redirect to movies
      if (selectedMovie) {
        setCurrentPage('movieDetail');
      } else {
        setCurrentPage('movies');
        updateURL('movies');
      }
    } else if (path === '/event-detail') {
      // Only set eventDetail if we have a selected event, otherwise redirect to events
      if (selectedEvent) {
        setCurrentPage('eventDetail');
      } else {
        setCurrentPage('events');
        updateURL('events');
      }
    } else if (path === '/event-seats') {
      setCurrentPage('eventSeats');
    } else if (path === '/artist-profile') {
      setCurrentPage('artistProfile');
    } else if (path === '/profile') {
      setCurrentPage('profile');
    } else if (path === '/bookings') {
      setCurrentPage('bookings');
    } else if (path === '/settings') {
      setCurrentPage('settings');
    } else if (path === '/help') {
      setCurrentPage('help');
    } else if (path === '/terms') {
      setCurrentPage('terms');
    } else if (path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    }
  }, [selectedMovie, selectedEvent]);

  // Update URL when page changes
  const updateURL = (page) => {
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
      'profile': '/profile',
      'bookings': '/bookings',
      'settings': '/settings',
      'help': '/help',
      'terms': '/terms',
      'privacy': '/privacy',
      'contact': '/contact'
    };
    window.history.pushState({}, '', routes[page] || '/');
  };

  const handleAuthSuccess = (userData) => {
    // Auth context handles this automatically
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    updateURL(page);
    setIsProfileOpen(false);
    // Clear search query when navigating
    if (page !== 'movies' && page !== 'events') {
      setSearchQuery('');
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    // If already on movies or events page, just update the query (handled above)
    // But if we are on Home or other pages, we need to decide where to go
    if (currentPage !== 'movies' && currentPage !== 'events') {
      if (!query.trim()) return;

      try {
        // Import eventService dynamically or use the one if available in scope (assuming imported at top)
        // We need to fetch basic lists to see if it's a movie or event
        // For performance, we could just default to Events, or maintain a small cache.
        // Let's do a quick check.
        const { default: eventService } = await import('../../services/eventService');

        // Parallel fetch to check matches
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
          setCurrentPage('movies');
          updateURL('movies');
        } else {
          // Default to events if both match or neither match (Events page can usually handle general searches better or shows "No results")
          // Or if user specifically wants "Movies", they usually go to movies tab.
          // Let's default to Events as it is "EventHub".
          if (eventMatch && !movieMatch) {
            setCurrentPage('events');
            updateURL('events');
          } else {
            // If both or neither, defaulting to Events page is safer as it's the broader category
            setCurrentPage('events');
            updateURL('events');
          }
        }

      } catch (error) {
        console.error("Search redirection error:", error);
        setCurrentPage('events');
        updateURL('events');
      }
    }
  };

  const handleMovieClick = (item) => {
    // Check if it's a movie based on multiple criteria
    if (item.type === 'movie' || item.genre || (!item.type && !item.category)) {
      setPreviousPage(currentPage); // Use current page instead of hardcoding 'movies'
      setSelectedMovie(item);
      setCurrentPage('movieDetail');
      updateURL('movieDetail');
    } else {
      setPreviousPage(currentPage); // Use current page instead of hardcoding 'events'
      setSelectedEvent(item);
      setCurrentPage('eventDetail');
      updateURL('eventDetail');
    }
  };

  const handleArtistClick = (artist) => {
    setPreviousPage(currentPage);
    setSelectedArtist(artist);
    setCurrentPage('artistProfile');
    updateURL('artistProfile');
  };

  const handleBookTickets = (item) => {
    // Clear both selections first, then set the correct one
    setSelectedMovie(null);
    setSelectedEvent(null);

    // Set previous page to current page (preserve navigation history)
    setPreviousPage(currentPage);

    if (item.type === 'movie' || item.genre) {
      setSelectedMovie(item);
    } else {
      setSelectedEvent(item);
    }
    setCurrentPage('booking');
    updateURL('booking');
  };

  const handleGoToSeatSelection = () => {
    setCurrentPage('eventSeats');
    updateURL('eventSeats');
  };

  const handleBackToMovies = () => {
    setCurrentPage(previousPage); // Go back to previous page instead of always movies
    updateURL(previousPage);
    setSelectedMovie(null);
  };

  const handleBackToEvents = () => {
    setCurrentPage(previousPage); // Go back to previous page instead of always events
    updateURL(previousPage);
    setSelectedEvent(null);
  };

  const renderPage = () => {
    switch (currentPage) {

      case 'register':
        return <Register onAuthOpen={() => setIsAuthModalOpen(true)} />;
      case 'movies':
        return (
          <MoviesPage
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onMovieClick={handleMovieClick}
            onBookTickets={handleBookTickets}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        );
      case 'events':
        return (
          <EventsPage
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBookTickets={handleBookTickets}
            onMovieClick={handleMovieClick}
            onArtistClick={handleArtistClick}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        );
      case 'movieDetail':
        return (
          <MovieDetail
            movie={selectedMovie}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={handleBackToMovies}
            onBookTickets={handleBookTickets}
          />
        );
      case 'eventDetail':
        return (
          <EventDetail
            event={selectedEvent}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={handleBackToEvents}
            onBookTickets={handleBookTickets}
          />
        );
      case 'eventSeats':
        return (
          <EventSeatSelection
            event={selectedEvent || selectedMovie}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => {
              setCurrentPage('booking');
              updateURL('booking');
            }}
          />
        );
      case 'artistProfile':
        return (
          <ArtistProfile
            artist={selectedArtist}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => {
              setCurrentPage(previousPage);
              updateURL(previousPage);
              setSelectedArtist(null);
            }}
            onEventClick={handleMovieClick}
          />
        );
      case 'booking':
        return (
          <BookingPage
            item={selectedMovie || selectedEvent}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => {
              setCurrentPage(previousPage);
              updateURL(previousPage);
            }}
          />
        );
      case 'settings':
        return (
          <Settings
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
            user={user}
            isDark={isDark}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
          />
        );
      case 'help':
        return (
          <HelpCenter
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
            user={user}
            isDark={isDark}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
          />
        );
        return (
          <ContactSupport
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicy
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
          />
        );
      case 'terms':
        return (
          <TermsAndConditions
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
          />
        );
      case 'bookings':
        return (
          <Bookings
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
            user={user}
            isDark={isDark}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onBack={() => {
              setCurrentPage('home');
              updateURL('home');
            }}
            user={user}
            isDark={isDark}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <Home
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onMovieClick={handleMovieClick}
            onBookTickets={handleBookTickets}
            onArtistClick={handleArtistClick}
            onSearch={handleSearch}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}

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