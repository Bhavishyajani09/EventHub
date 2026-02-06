import React, { useState, useEffect } from 'react';
import { Sparkles, Search, MapPin } from 'lucide-react';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';
import USER_MovieDetail from './USER_MovieDetail';
import eventService from '../../services/eventService';
import artistService from '../../services/artistService';
import { EventCardSkeleton, ArtistSkeleton } from '../common/Skeleton';

const Home = ({ isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onMovieClick, onBookTickets, onArtistClick, onSearch }) => {
  const [events, setEvents] = useState([]);
  const [movies, setMovies] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroSearch, setHeroSearch] = useState('');

  useEffect(() => {
    document.title = 'EventHub - Discover Amazing Events';
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchEvents(),
        fetchMovies(),
        fetchArtists()
      ]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await artistService.getArtists();
      if (response.success) {
        setArtists(response.artists.slice(0, 5) || []);
      }
    } catch (err) {
      console.error('Error fetching artists:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await eventService.getNonMovieEvents();
      if (response.success) {
        const validEvents = (response.events || []).filter(event => {
          if (!event.date) return false;
          return new Date(event.date) >= new Date();
        });
        setEvents(validEvents.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await eventService.getMovieEvents();
      if (response.success) {
        const validMovies = (response.events || []).filter(movie => {
          if (!movie.date) return false;
          return new Date(movie.date) >= new Date();
        });
        setMovies(validMovies.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  const handleMovieClick = (movie) => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  const handleBookTickets = (movie, e) => {
    e.stopPropagation(); // Prevent movie click
    if (onBookTickets) {
      onBookTickets(movie);
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
      {/* Navbar */}
      <SharedNavbar
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        activePage="home"
        onSearch={onSearch}
      />

      {/* Main Content */}
      <div style={{
        padding: 'clamp(16px, 4vw, 32px)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Hero Section */}
          <div style={{
            borderRadius: '24px',
            padding: 'clamp(60px, 10vw, 100px)',
            textAlign: 'center',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("/HERO_PAGE.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px)',
              zIndex: 0
            }}></div>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
              opacity: 0.8
            }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                padding: '8px 20px',
                marginBottom: '24px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={16} />
                  Discover Amazing Events
                </span>
              </div>
              <h1 style={{
                fontSize: 'clamp(32px, 7vw, 56px)',
                fontWeight: '800',
                color: 'white',
                marginBottom: '20px',
                lineHeight: '1.1',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>Your Next Adventure<br />Starts Here</h1>
              <p style={{
                fontSize: 'clamp(16px, 3.5vw, 20px)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '40px',
                maxWidth: '650px',
                margin: '0 auto 40px',
                lineHeight: '1.6'
              }}>Join thousands discovering incredible events, movies, and experiences in your city</p>

              <div style={{
                display: 'flex',
                maxWidth: '700px',
                margin: '0 auto',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '100px',
                padding: '8px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                gap: '8px',
                alignItems: 'center',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                transform: 'translateZ(0)', // Force GPU acceleration
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
                }}
              >
                <div style={{
                  paddingLeft: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6366f1'
                }}>
                  <Search size={22} />
                </div>

                <input
                  type="text"
                  placeholder="Search for movies, events, or artists..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSearch) {
                      onSearch(heroSearch);
                    }
                  }}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '18px',
                    color: '#1f2937',
                    backgroundColor: 'transparent',
                    padding: '16px 12px',
                    width: '100%'
                  }}
                />

                <button style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientMove 3s ease infinite',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 36px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                }}
                  onClick={() => {
                    if (onSearch) onSearch(heroSearch);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
                  }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>

          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 24px)',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: 'clamp(16px, 4vw, 24px)'
          }}>Top Hindi movies near you</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 20vw, 200px), 1fr))',
            gap: 'clamp(12px, 3vw, 20px)',
            marginBottom: 'clamp(32px, 6vw, 48px)'
          }}>
            {loading ? (
              Array(4).fill(0).map((_, i) => <EventCardSkeleton key={i} isDark={isDark} />)
            ) : movies.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>No movies available</p>
              </div>
            ) : (
              movies.map((movie, index) => {
                return (
                  <div key={index}
                    onClick={() => handleMovieClick(movie)}
                    style={{
                      backgroundColor: isDark ? '#1f2937' : 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      height: 'clamp(200px, 30vw, 280px)',
                      backgroundImage: `url(${movie.image || '/placeholder-movie.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundColor: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280',
                      fontSize: 'clamp(12px, 2.5vw, 14px)',
                      width: '100%'
                    }}>
                    </div>
                    <div style={{
                      padding: 'clamp(12px, 3vw, 16px)',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <h3 style={{
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: '600',
                        color: isDark ? '#f9fafb' : '#111827',
                        marginBottom: '4px'
                      }}>{movie.title}</h3>
                      <p style={{
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>{movie.category} | <MapPin size={12} /> {movie.location}</p>
                      <button
                        onClick={(e) => handleBookTickets(movie, e)}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                          backgroundSize: '200% 200%',
                          animation: 'gradientMove 3s ease infinite',
                          color: 'white',
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          marginTop: 'auto'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        Book Tickets
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 24px)',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: 'clamp(16px, 4vw, 24px)'
          }}>Trending Events</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 20vw, 200px), 1fr))',
            gap: 'clamp(12px, 3vw, 20px)',
            marginBottom: 'clamp(32px, 6vw, 48px)'
          }}>
            {loading ? (
              Array(4).fill(0).map((_, i) => <EventCardSkeleton key={i} isDark={isDark} />)
            ) : events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>No events available</p>
              </div>
            ) : (
              events.map((event, index) => {
                return (
                  <div key={index}
                    onClick={() => handleMovieClick({ ...event, type: 'event' })}
                    style={{
                      backgroundColor: isDark ? '#1f2937' : 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      height: 'clamp(200px, 30vw, 280px)',
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundColor: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280',
                      fontSize: 'clamp(12px, 2.5vw, 14px)',
                      width: '100%'
                    }}>
                    </div>
                    <div style={{
                      padding: 'clamp(12px, 3vw, 16px)',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <h3 style={{
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: '600',
                        color: isDark ? '#f9fafb' : '#111827',
                        marginBottom: '4px'
                      }}>{event.title}</h3>
                      <p style={{
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>{event.category} | <MapPin size={12} /> {event.location}</p>
                      <button
                        onClick={(e) => handleBookTickets({ ...event, type: 'event' }, e)}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                          backgroundSize: '200% 200%',
                          animation: 'gradientMove 3s ease infinite',
                          color: 'white',
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          marginTop: 'auto'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        Book Tickets
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 24px)',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: 'clamp(16px, 4vw, 24px)'
          }}>Featured Artists on Platform</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(120px, 15vw, 150px), 1fr))',
            gap: 'clamp(12px, 3vw, 20px)',
            marginBottom: 'clamp(32px, 6vw, 48px)'
          }}>
            {loading ? (
              Array(5).fill(0).map((_, i) => <ArtistSkeleton key={i} isDark={isDark} />)
            ) : artists.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>No artists found in your district</p>
              </div>
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
                  >
                  </div>
                  <h4 style={{
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    fontWeight: '500',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}>{artist.name}</h4>
                </div>
              ))
            )}
          </div>

          {/* Newsletter Section */}
          <div style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 25%, #8b5cf6 50%, #6366f1 75%, #a855f7 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientMove 4s ease infinite',
            borderRadius: '20px',
            padding: 'clamp(40px, 8vw, 60px)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
            boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)'
          }}>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <h3 style={{
                fontSize: 'clamp(24px, 5vw, 28px)',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px',
                lineHeight: '1.2'
              }}>Don't miss out on the best events.</h3>
              <p style={{
                fontSize: 'clamp(16px, 3.5vw, 18px)',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                lineHeight: '1.5'
              }}>Get a weekly curated list of events happening in your city based on your interests.</p>
            </div>
            <div style={{
              display: 'flex',
              gap: '16px',
              minWidth: '320px',
              alignItems: 'stretch'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  minWidth: '220px',
                  padding: '16px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: '#374151',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <button style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientMove 3s ease infinite',
                color: 'white',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default Home;