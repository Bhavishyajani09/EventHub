import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Music, Laugh, Zap, Palette, Calendar, Clock, MapPin } from 'lucide-react';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';
import eventService from '../../services/eventService';
import artistService from '../../services/artistService';
import toast from 'react-hot-toast';
import { EventCardSkeleton, ArtistSkeleton } from '../common/Skeleton';

const EventsPage = ({ isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBookTickets, onMovieClick, onArtistClick, searchQuery, onSearch }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artistLoading, setArtistLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setArtistLoading(true);

        const [eventsRes, artistsRes] = await Promise.all([
          eventService.getNonMovieEvents(),
          artistService.getArtists()
        ]);

        if (eventsRes.success) {
          setEvents(eventsRes.events || []);
        } else {
          setError('Failed to load events');
        }

        if (artistsRes.success) {
          setArtists(artistsRes.artists.slice(0, 5) || []);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
        setArtistLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    document.title = 'Events - EventHub';
  }, []);

  const heroEvents = events.length > 0 ? events.slice(0, 5).map(event => ({
    ...event,
    image: event.image || '/placeholder-artist.jpg',
    type: 'event'
  })) : [
    {
      title: 'Loading Events...',
      location: 'Please wait',
      price: 'Loading...',
      image: '/placeholder-artist.jpg'
    }
  ];

  // Auto-rotate hero section every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex === heroEvents.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroEvents.length]);

  const exploreEvents = [
    { name: 'MUSIC', label: 'MUSIC', icon: Music, color: '#f59e0b' },
    { name: 'COMEDY', label: 'COMEDY', icon: Laugh, color: '#ef4444' },
    { name: 'SPORTS', label: 'SPORTS', icon: Zap, color: '#10b981' },
    { name: 'ART', label: 'ART EXHIBITIONS', icon: Palette, color: '#8b5cf6' },
    { name: 'SEASONAL EVENT', label: 'SEASONAL EVENTS', icon: Calendar, color: '#f97316' }
  ];

  const allEvents = events.map(event => ({
    title: event.title,
    location: event.location,
    date: new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    time: new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    fullDate: new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    price: event.price === 0 ? 'FREE' :
      (event.seatTypes && event.seatTypes.length > 0
        ? `₹${Math.min(...event.seatTypes.map(seat => seat.price))}`
        : `₹${event.price}`),
    image: event.image || '/placeholder-artist.jpg',
    category: event.category.toUpperCase(),
    type: 'event',
    venue: event.location,
    seatTypes: event.seatTypes,
    _id: event._id
  }));

  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'All Events');

  // Update category if passed via navigation state (e.g. from Footer)
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      // clear state to avoid sticking to it on refresh if desired, but keeping it is fine
      // actually, better to just listen to it.
    }
  }, [location.state]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Update filtered events when allEvents or searchQuery changes
  useEffect(() => {
    let result = allEvents;

    // Filter by Category
    if (selectedCategory !== 'All Events') {
      result = result.filter(event => event.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(result);
  }, [events, selectedCategory, searchQuery]);

  const filterEvents = (category) => {
    setSelectedCategory(category);

    // Smooth scroll to all events section
    const element = document.getElementById('all-events-section');
    if (element) {
      const offset = 100; // Offset for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    }}>
      <SharedNavbar
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        activePage="events"
        onSearch={onSearch}
      />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px clamp(24px, 4vw, 32px) 32px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Hero Section */}
        {loading ? (
          <div style={{
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.5)',
            borderRadius: '24px',
            marginBottom: '40px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite linear'
            }} />
            <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '18px', zIndex: 1 }}>Loading featured events...</p>
          </div>
        ) : error ? (
          <div style={{
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            borderRadius: '24px',
            padding: '100px',
            marginBottom: '40px',
            textAlign: 'center',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{ color: '#ef4444', fontSize: '18px' }}>{error}</p>
          </div>
        ) : (
          <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroEvents[currentHeroIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
            padding: 'clamp(60px, 10vw, 100px)',
            marginBottom: '40px',
            color: 'white',
            transition: 'all 0.5s ease-in-out',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            height: '500px',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Left side - Text content */}
            <div style={{
              flex: 1,
              maxWidth: '60%'
            }}>
              <h1 style={{
                fontSize: 'clamp(32px, 7vw, 56px)',
                fontWeight: '800',
                marginBottom: '20px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                lineHeight: '1.1'
              }}>{heroEvents[currentHeroIndex].title.split(' | ')[0]}</h1>
              <p style={{
                fontSize: 'clamp(16px, 3.5vw, 20px)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>{heroEvents[currentHeroIndex].location}</p>

              <button
                onClick={() => {
                  if (onBookTickets) {
                    onBookTickets(heroEvents[currentHeroIndex]);
                  } else {
                    toast.success(`Booking ${heroEvents[currentHeroIndex].title}`);
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'white'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
              >
                Book now
              </button>
            </div>

            {/* Right side - Artist poster */}
            <div style={{
              width: '200px',
              height: '280px',
              borderRadius: '12px',
              backgroundImage: `url(${heroEvents[currentHeroIndex].image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.5s ease'
            }} />

            {/* Navigation arrows */}
            <button
              onClick={() => setCurrentHeroIndex(currentHeroIndex === 0 ? heroEvents.length - 1 : currentHeroIndex - 1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>

            <button
              onClick={() => setCurrentHeroIndex(currentHeroIndex === heroEvents.length - 1 ? 0 : currentHeroIndex + 1)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>

            {/* Dots indicator */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px'
            }}>
              {heroEvents.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentHeroIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Explore Events */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: isDark ? '#f9fafb' : '#111827',
          marginBottom: '20px'
        }}>Explore Events</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {exploreEvents.map((event, index) => (
            <div
              key={index}
              onClick={() => filterEvents(event.name)}
              style={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: selectedCategory === event.name
                  ? (isDark ? '0 0 15px rgba(139, 92, 246, 0.5)' : '0 0 15px rgba(139, 92, 246, 0.3)')
                  : (isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'),
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: selectedCategory === event.name ? '2px solid #8b5cf6' : '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                if (selectedCategory !== event.name) {
                  e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (selectedCategory !== event.name) {
                  e.currentTarget.style.boxShadow = isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)';
                }
              }}
            >
              <div style={{
                fontSize: '32px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <event.icon size={32} color={event.color} />
              </div>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                color: selectedCategory === event.name ? '#8b5cf6' : (isDark ? '#f9fafb' : '#111827'),
                margin: 0
              }}>{event.label}</h4>
            </div>
          ))}
        </div>

        {/* Artists in your District */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: isDark ? '#f9fafb' : '#111827',
          marginBottom: '20px'
        }}>Featured Artists on Platform</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {artistLoading ? (
            Array(5).fill(0).map((_, i) => <ArtistSkeleton key={i} isDark={isDark} />)
          ) : (
            artists.map((artist, index) => (
              <div key={index}
                onClick={() => {
                  if (onArtistClick) {
                    onArtistClick(artist);
                  }
                }}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                <div style={{
                  width: 'clamp(80px, 15vw, 120px)',
                  height: 'clamp(80px, 15vw, 120px)',
                  borderRadius: '50%',
                  backgroundImage: `url(${artist.image || '/placeholder-artist.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundColor: '#f9fafb',
                  margin: '0 auto 12px',
                  transition: 'transform 0.2s',
                  boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: isDark ? '#f9fafb' : '#111827',
                  margin: 0
                }}>{artist.name}</h4>
              </div>
            ))
          )}
        </div>

        {/* All Events */}
        <h2
          id="all-events-section"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '20px'
          }}>All Events</h2>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => filterEvents('All Events')}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedCategory === 'All Events' ? '#8b5cf6' : (isDark ? '#374151' : '#f3f4f6'),
              color: selectedCategory === 'All Events' ? 'white' : (isDark ? '#f9fafb' : '#111827'),
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            All Events
          </button>

          {exploreEvents.map((event, index) => (
            <button
              key={index}
              onClick={() => filterEvents(event.name)}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedCategory === event.name ? '#8b5cf6' : (isDark ? '#374151' : '#f3f4f6'),
                color: selectedCategory === event.name ? 'white' : (isDark ? '#f9fafb' : '#111827'),
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {event.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            {Array(6).fill(0).map((_, i) => <EventCardSkeleton key={i} isDark={isDark} />)}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>No events available</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
            justifyContent: 'center'
          }}>
            {filteredEvents.map((event, index) => (
              <div key={index}
                onClick={() => {
                  if (onMovieClick) {
                    onMovieClick(event);
                  }
                }}
                style={{
                  backgroundColor: isDark ? '#1f2937' : 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  height: '220px',
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundColor: '#f9fafb',
                  flexShrink: 0
                }} />
                <div style={{
                  padding: '20px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '700',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Clock size={14} style={{ color: '#667eea' }} />
                      {event.fullDate} • {event.time}
                    </div>

                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: isDark ? '#f9fafb' : '#111827',
                      marginBottom: '8px',
                      lineHeight: '1.4'
                    }}>{event.title}</h3>

                    <p style={{
                      fontSize: '14px',
                      color: isDark ? '#9ca3af' : '#6b7280',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <MapPin size={14} style={{ color: '#667eea', opacity: 0.8 }} /> {event.venue}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    width: '100%',
                    paddingTop: '16px',
                    borderTop: isDark ? '1px solid #374151' : '1px solid #f3f4f6'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: event.price === 'FREE' ? '#10b981' : (isDark ? '#f9fafb' : '#111827')
                    }}>{event.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        if (onBookTickets) {
                          onBookTickets(event);
                        } else {
                          toast.success(`Booking ${event.title}`);
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientMove 3s ease infinite',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SharedFooter isDark={isDark} onNavigate={onNavigate} />

      {/* Global CSS Reset */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        html, body {
          width: 100%;
          height: 100%;
        }
        
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;