import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';
import USER_MovieDetail from './USER_MovieDetail';



const MoviesPage = ({ isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onMovieClick, onBookTickets }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroMovies = [
    { title: 'Dhurandhar', genre: 'Action, Thriller', rating: 'A', image: '/placeholder-movie.jpg' },
    { title: 'Border 2', genre: 'Action, War', rating: 'UA13+', image: '/placeholder-movie.jpg' },
    { title: 'Rahu Ketu', genre: 'Horror, Thriller', rating: 'UA16+', image: '/rahu-ketu.jpg' },
    { title: 'Happy Patel: Khatarnak Jasoos', genre: 'Comedy, Action', rating: 'A', image: '/happy-patel.jpg' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  useEffect(() => {
    document.title = 'Movies - EventHub';
  }, []);

  const filters = [
    { id: 'hindi', label: 'Hindi', type: 'language' },
    { id: 'english', label: 'English', type: 'language' },
    { id: 'action', label: 'Action', type: 'genre' },
    { id: 'thriller', label: 'Thriller', type: 'genre' },
    { id: 'comedy', label: 'Comedy', type: 'genre' },
    { id: '2d', label: '2D', type: 'format' },
    { id: '3d', label: '3D', type: 'format' }
  ];

  const movies = [
    { title: 'Rahu Ketu', genre: 'Horror', language: 'Hindi', image: '/rahu-ketu.jpg' },
    { title: 'Happy Patel: Khatarnak Jasoos', genre: 'Comedy', language: 'Hindi', image: '/happy-patel.jpg' },
    { title: 'Dhurandhar', genre: 'Action, Thriller', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'Border 2', genre: 'Action', language: 'Hindi', image: '/placeholder-movie.jpg' }
  ];

  const theatreMovies = [
    { title: 'Anaganaga Oka Raju', genre: 'Drama', language: 'Telugu', image: '/anaganaga-oka-raju.jpg' },
    { title: 'Band Baaja Baaraat', genre: 'Romance', language: 'Hindi', image: '/band-baaja-baaraat.jpg' },
    { title: 'Bihu Attack', genre: 'Action', language: 'Assamese', image: '/bihu-attack.jpg' },
    { title: 'One Two Cha Cha Chaa', genre: 'Comedy', language: 'Hindi', image: '/one-two-cha-cha-chaa.jpg' },
    { title: 'Tere Ishk Mein', genre: 'Romance', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'The Raja Saab', genre: 'Horror', language: 'Telugu', image: '/placeholder-movie.jpg' },
    { title: 'Tu Meri Main Tera', genre: 'Romance', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'Rahu Ketu', genre: 'Horror', language: 'Hindi', image: '/rahu-ketu.jpg' },
    { title: 'Happy Patel: Khatarnak Jasoos', genre: 'Comedy', language: 'Hindi', image: '/happy-patel.jpg' },
    { title: 'Dhurandhar', genre: 'Action', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'Border 2', genre: 'War', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: '83', genre: 'Sports', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'Chhaava', genre: 'Historical', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'Gabbar', genre: 'Action', language: 'Hindi', image: '/placeholder-movie.jpg' },
    { title: 'Greenland 2: Migration', genre: 'Thriller', language: 'English', image: '/placeholder-movie.jpg' },
    { title: 'Laalo - Krishna Sada Sahaayate', genre: 'Drama', language: 'Hindi', image: '/laalo-krishna.jpg' },
    { title: 'Sarfira', genre: 'Drama', language: 'Hindi', image: '/placeholder-movie.jpg' }
  ];

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleMovieClick = (movie) => {
    if (onMovieClick) {
      onMovieClick(movie);
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
        activePage="movies"
      />

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px clamp(24px, 4vw, 32px) 32px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Hero Section */}
        <div style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroMovies[currentHeroIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '24px',
          padding: 'clamp(60px, 10vw, 100px)',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          height: '500px'
        }}>
          {/* Left Arrow */}
          <button onClick={() => setCurrentHeroIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length)} style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: 'white',
            zIndex: 2,
            outline: 'none'
          }}>‹</button>

          {/* Right Arrow */}
          <button onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length)} style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: 'white',
            zIndex: 2,
            outline: 'none'
          }}>›</button>

          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(32px, 7vw, 56px)',
              fontWeight: '800',
              color: 'white',
              marginBottom: '20px',
              lineHeight: '1.1',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>{heroMovies[currentHeroIndex].title}</h1>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>{heroMovies[currentHeroIndex].rating} | {heroMovies[currentHeroIndex].genre}</p>
            <button 
              onClick={() => {
                if (onBookTickets) {
                  onBookTickets(heroMovies[currentHeroIndex]);
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
          <div style={{
            width: '200px',
            height: '280px',
            borderRadius: '12px',
            backgroundImage: `url(${heroMovies[currentHeroIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.5s ease'
          }}></div>

          {/* Dots Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2
          }}>
            {heroMovies.map((_, index) => (
              <button key={index} onClick={() => setCurrentHeroIndex(index)} style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentHeroIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}></button>
            ))}
          </div>
        </div>

        {/* This Week's Releases */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '24px'
          }}>This Week's Releases</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {movies.map((movie, index) => (
              <div key={index} 
                onClick={() => handleMovieClick(movie)}
                style={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  height: '220px',
                  backgroundImage: `url(${movie.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af'
                }}>
                  {!movie.image && <Film size={48} />}
                </div>
                <div style={{ padding: '12px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isDark ? '#f9fafb' : '#111827',
                    marginBottom: '4px'
                  }}>{movie.title}</h3>
                  <p style={{
                    fontSize: '12px',
                    color: isDark ? '#9ca3af' : '#6b7280'
                  }}>{movie.genre} | {movie.language}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Only in Theatres */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '24px'
          }}>Only in Theatres</h2>

          {/* Movies Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px'
          }}>
            {/* Movie cards with actual data */}
            {theatreMovies.map((movie, index) => (
              <div key={index} 
                onClick={() => handleMovieClick(movie)}
                style={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  height: '220px',
                  backgroundImage: `url(${movie.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af'
                }}>
                  {!movie.image && <Film size={48} />}
                </div>
                <div style={{ padding: '12px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isDark ? '#f9fafb' : '#111827',
                    marginBottom: '4px'
                  }}>{movie.title}</h3>
                  <p style={{
                    fontSize: '12px',
                    color: isDark ? '#9ca3af' : '#6b7280'
                  }}>{movie.genre} | {movie.language}</p>
                </div>
              </div>
            ))}
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
      `}</style>
    </div>
  );
};

export default MoviesPage;