import React, { useState, useEffect } from 'react';
import { Sparkles, Search } from 'lucide-react';
import Border2 from './assets/Border2.jpg';
import Dhurandhar from './assets/Dhurandhar.jpg';
import RahuKetu from './assets/Rahu Ketu.jpg';
import HappyPatel from './assets/Happy Patel Khatarnak Jasoos.jpg';
import EventBg from './assets/event.avif';
import SunidhiChauhan from './assets/SunidhiChauhan.jpg';
import KaranAujla from './assets/KaranAujla.jpg';
import SonuNigam from './assets/SonuNigam.jpg';
import AadityaKullu from './assets/AadityaKulluKulshreshth.jpg';
import KanhaKamboj from './assets/KanhaKamboj.jpg';
import AuthModal from './AuthModal';
import ProfilePanel from './ProfilePanel';
import SharedNavbar from './SharedNavbar';
import SharedFooter from './SharedFooter';
import MovieDetail from './MovieDetail';

const Home = ({ isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onMovieClick, onBookTickets, onArtistClick }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    document.title = 'EventHub - Discover Amazing Events';
  }, []);

  const handleAuthSuccess = (userData) => {
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleNavigateLocal = (page) => {
    console.log(`Navigating to: ${page}`);
  };

  const handleMovieClick = (movie) => {
    if (onMovieClick) {
      // Add type property to ensure proper routing
      const movieWithType = { ...movie, type: 'movie' };
      onMovieClick(movieWithType);
    } else {
      setSelectedMovie(movie);
    }
  };

  const handleBookTickets = (movie, e) => {
    e.stopPropagation(); // Prevent movie click
    if (onBookTickets) {
      onBookTickets(movie);
    }
  };

  const handleBackToHome = () => {
    setSelectedMovie(null);
  };

  // Show movie detail if a movie is selected
  if (selectedMovie) {
    return (
      <MovieDetail 
        movie={selectedMovie}
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        onBack={handleBackToHome}
      />
    );
  }
  return (
    <div style={{ 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      width: '100vw',
      minHeight: '100vh',
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
      />

      {/* Main Content */}
      <div style={{
        background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        minHeight: 'calc(100vh - 64px)',
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${EventBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                maxWidth: '650px',
                margin: '0 auto',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                padding: '6px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                gap: '6px',
                flexWrap: 'wrap',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: '200px',
                  gap: '8px',
                  padding: '14px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px'
                }}>
                  <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Events, artists, or keywords"
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '16px',
                      flex: 1,
                      color: '#374151',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: '150px',
                  gap: '8px',
                  padding: '14px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px'
                }}>
                  <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="City or online"
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '16px',
                      flex: 1,
                      color: '#374151',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientMove 3s ease infinite',
                  color: 'white',
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Search size={18} />
                    Explore Events
                  </div>
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
            {[
              { title: 'Border 2', rating: 'UA13+', language: 'Hindi', genre: 'Action, War', image: Border2 },
              { title: 'Dhurandhar', rating: 'A', language: 'Hindi', genre: 'Action, Thriller', image: Dhurandhar },
              { title: 'Rahu Ketu', rating: 'UA16+', language: 'Hindi', genre: 'Horror, Thriller', image: '/rahu-ketu.jpg' },
              { title: 'Happy Patel: Khatarnak Jasoos', rating: 'A', language: 'Hindi', genre: 'Comedy, Action', image: '/happy-patel.jpg' }
            ].map((movie, index) => {
              return (
              <div key={index} 
                onClick={() => handleMovieClick(movie)}
                style={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  height: 'clamp(200px, 30vw, 280px)',
                  backgroundImage: `url(${movie.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: 'clamp(12px, 2.5vw, 14px)'
                }}>
                </div>
                <div style={{ padding: 'clamp(12px, 3vw, 16px)' }}>
                  <h3 style={{
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    fontWeight: '600',
                    color: isDark ? '#f9fafb' : '#111827',
                    marginBottom: '4px'
                  }}>{movie.title}</h3>
                  <p style={{
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    marginBottom: '12px'
                  }}>{movie.rating} | {movie.language}</p>
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
                      transition: 'all 0.3s ease'
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
            })}
          </div>

          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 24px)',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: 'clamp(16px, 4vw, 24px)'
          }}>Artists in your District</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(120px, 15vw, 150px), 1fr))',
            gap: 'clamp(12px, 3vw, 20px)',
            marginBottom: 'clamp(32px, 6vw, 48px)'
          }}>
            {[
              { name: 'Sunidhi Chauhan', image: SunidhiChauhan },
              { name: 'Karan Aujla', image: KaranAujla },
              { name: 'Sonu Nigam', image: SonuNigam },
              { name: 'Aaditya "Kullu" Kulshreshth', image: AadityaKullu },
              { name: 'Kanha Kamboj', image: KanhaKamboj }
            ].map((artist, index) => (
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
                  backgroundImage: `url(${artist.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
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
            ))}
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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        isDark={isDark}
      />

      {/* Profile Panel */}
      <ProfilePanel
        user={user}
        isOpen={isProfilePanelOpen}
        onClose={() => setIsProfilePanelOpen(false)}
        onLogout={handleLogout}
        onNavigate={handleNavigateLocal}
        isDark={isDark}
      />

      {/* Mobile responsive styles */}
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
        
        @media (max-width: 768px) {
          nav > div > div {
            flex-direction: column;
            height: auto;
            padding: 16px 0;
            gap: 12px;
          }
          nav > div > div > div:first-child {
            justify-content: center;
          }
          nav > div > div > div:nth-child(2) {
            order: 3;
            justify-content: center;
          }
          nav > div > div > div:last-child {
            order: 2;
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          nav > div > div > div:first-child > div:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;