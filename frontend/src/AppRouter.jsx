import React, { useState, useEffect } from 'react';
import Home from './Home';
import MoviesPage from './MoviesPage';
import EventsPage from './EventsPage';
import MovieDetail from './MovieDetail';
import EventDetail from './EventDetail';
import ArtistProfile from './ArtistProfile';
import BookingPage from './BookingPage';
import EventSeatSelection from './EventSeatSelection';
import TicketSelection from './TicketSelection';
import CheckoutPage from './CheckoutPage';
import BillingDetailsPage from './BillingDetailsPage';
import AuthModal from './AuthModal';
import ProfilePanel from './ProfilePanel';
import Profile from './Profile';
import Bookings from './Bookings';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import ContactSupport from './ContactSupport';

function AppRouter() {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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
    } else if (path === '/movies') {
      setCurrentPage('movies');
    } else if (path === '/events') {
      setCurrentPage('events');
    } else if (path === '/booking') {
      setCurrentPage('booking');
    } else if (path === '/movie-detail') {
      setCurrentPage('movieDetail');
    } else if (path === '/event-detail') {
      setCurrentPage('eventDetail');
    } else if (path === '/event-seats') {
      setCurrentPage('eventSeats');
    } else if (path === '/ticket-selection') {
      setCurrentPage('ticketSelection');
    } else if (path === '/checkout') {
      setCurrentPage('checkout');
    } else if (path === '/billing') {
      setCurrentPage('billing');
    } else if (path === '/artist-profile') {
      setCurrentPage('artistProfile');
    } else if (path === '/profile') {
      setCurrentPage('profile');
    } else if (path === '/bookings') {
      setCurrentPage('bookings');
    } else if (path === '/terms') {
      setCurrentPage('terms');
    } else if (path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    }
  }, []);

  // Update URL when page changes
  const updateURL = (page) => {
    const routes = {
      'home': '/',
      'movies': '/movies',
      'events': '/events',
      'booking': '/booking',
      'movieDetail': '/movie-detail',
      'eventDetail': '/event-detail',
      'eventSeats': '/event-seats',
      'ticketSelection': '/ticket-selection',
      'checkout': '/checkout',
      'billing': '/billing',
      'artistProfile': '/artist-profile',
      'profile': '/profile',
      'bookings': '/bookings',
      'terms': '/terms',
      'privacy': '/privacy',
      'contact': '/contact'
    };
    window.history.pushState({}, '', routes[page] || '/');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfilePanelOpen(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    updateURL(page);
    setIsProfilePanelOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
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
    // Set previous page to the appropriate listing page
    if (item.type === 'movie' || item.genre) {
      setPreviousPage('movies');
      setSelectedMovie(item);
    } else {
      setPreviousPage('events');
      setSelectedEvent(item);
    }
    setCurrentPage('booking');
    updateURL('booking');
  };

  const handleProceedToBooking = (item, section) => {
    if (item.type === 'movie') {
      setSelectedMovie(item);
    } else {
      setSelectedEvent(item);
    }
    setSelectedSection(section);
    setCurrentPage('ticketSelection');
    updateURL('ticketSelection');
  };

  const handleAddToCart = (item, section, quantity) => {
    // Handle add to cart logic here
    if (item.type === 'movie') {
      setSelectedMovie(item);
    } else {
      setSelectedEvent(item);
    }
    setSelectedSection(section);
    setSelectedQuantity(quantity);
    setCurrentPage('checkout');
    updateURL('checkout');
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
    switch(currentPage) {
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
            onProceedToBooking={handleProceedToBooking}
          />
        );
      case 'ticketSelection':
        return (
          <TicketSelection 
            event={selectedEvent || selectedMovie}
            selectedSection={selectedSection}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => {
              setCurrentPage('eventSeats');
              updateURL('eventSeats');
            }}
            onAddToCart={handleAddToCart}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            event={selectedEvent || selectedMovie}
            selectedSection={selectedSection}
            quantity={selectedQuantity}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            setCurrentPage={setCurrentPage}
            updateURL={updateURL}
            onBack={() => {
              setCurrentPage('ticketSelection');
              updateURL('ticketSelection');
            }}
            onContinue={() => {
              setCurrentPage('billing');
              updateURL('billing');
            }}
          />
        );
      case 'billing':
        return (
          <BillingDetailsPage 
            event={selectedEvent || selectedMovie}
            selectedSection={selectedSection}
            quantity={selectedQuantity}
            isDark={isDark}
            setIsDark={setIsDark}
            user={user}
            onAuthOpen={() => setIsAuthModalOpen(true)}
            onProfileClick={handleProfileClick}
            onNavigate={handleNavigate}
            onBack={() => {
              setCurrentPage('checkout');
              updateURL('checkout');
            }}
            onContinue={(billingData) => {
              // Handle continue to payment
              console.log('Billing data:', billingData);
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
            movie={selectedMovie}
            event={selectedEvent}
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
            onGoToSeatSelection={handleGoToSeatSelection}
          />
        );
      case 'contact':
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
          />
        );
      case 'profile':
        return (
          <Profile 
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            onBack={() => setIsProfileOpen(false)}
            onLogout={() => {
              handleLogout();
              setIsProfileOpen(false);
            }}
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

      <Profile 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onBack={() => setIsProfileOpen(false)}
        onLogout={() => {
          handleLogout();
          setIsProfileOpen(false);
        }}
        user={user}
        onNavigateToBookings={() => {
          setCurrentPage('bookings');
          updateURL('bookings');
          setIsProfileOpen(false);
        }}
        onNavigateToTerms={() => {
          setCurrentPage('terms');
          updateURL('terms');
          setIsProfileOpen(false);
        }}
        onNavigateToPrivacy={() => {
          setCurrentPage('privacy');
          updateURL('privacy');
          setIsProfileOpen(false);
        }}
        onNavigateToContact={() => {
          setCurrentPage('contact');
          updateURL('contact');
          setIsProfileOpen(false);
        }}
      />
    </div>
  );
}

export default AppRouter;