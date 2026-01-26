import React, { useState, useEffect } from 'react';
import { Music, Laugh, Zap, Palette, Calendar, Clock } from 'lucide-react';
import SharedNavbar from './SharedNavbar';
import SharedFooter from './SharedFooter';
import SonuNigam from './assets/SonuNigam.jpg';
import SunidhiChauhan from './assets/SunidhiChauhan.jpg';
import KaranAujla from './assets/KaranAujla.jpg';
import AadityaKullu from './assets/AadityaKulluKulshreshth.jpg';
import KanhaKamboj from './assets/KanhaKamboj.jpg';
import Border2 from './assets/Border2.jpg';
import Dhurandhar from './assets/Dhurandhar.jpg';
import RahuKetu from './assets/Rahu Ketu.jpg';
import HappyPatel from './assets/Happy Patel Khatarnak Jasoos.jpg';
import Sarfira from './assets/Sarfira.jpg';

const EventsPage = ({ isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBookTickets, onMovieClick, onArtistClick }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  useEffect(() => {
    document.title = 'Events - EventHub';
  }, []);

  const heroEvents = [
    {
      title: 'Deewana Tera by Sonu Nigam | Indore',
      location: 'Phoenix Citadel Mall, Indore',
      price: 'FREE CONCERT',
      image: SonuNigam
    },
    {
      title: 'Sunidhi Chauhan - I Am Home India Tour 2025-26',
      location: 'Venue to be announced, Indore',
      price: '₹1500 ONWARDS',
      image: SunidhiChauhan
    },
    {
      title: 'Karan Aujla Live Concert',
      location: 'Nehru Stadium, Indore',
      price: '₹2500 ONWARDS',
      image: KaranAujla
    },
    {
      title: 'Comedy Night with Aaditya Kullu',
      location: 'Sayaji Hotel, Indore',
      price: '₹800 ONWARDS',
      image: AadityaKullu
    },
    {
      title: 'Kanha Kamboj Live Performance',
      location: 'Brilliant Convention Centre, Indore',
      price: '₹1200 ONWARDS',
      image: KanhaKamboj
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
    { name: 'MUSIC', icon: Music, color: '#f59e0b' },
    { name: 'COMEDY', icon: Laugh, color: '#ef4444' },
    { name: 'SPORTS', icon: Zap, color: '#10b981' },
    { name: 'ART EXHIBITIONS', icon: Palette, color: '#8b5cf6' },
    { name: 'SEASONAL EVENTS', icon: Calendar, color: '#f97316' }
  ];

  const artists = [
    { name: 'Sunidhi Chauhan', image: SunidhiChauhan },
    { name: 'Karan Aujla', image: KaranAujla },
    { name: 'Sonu Nigam', image: SonuNigam },
    { name: 'Aaditya Kullu', image: AadityaKullu },
    { name: 'Kanha Kamboj', image: KanhaKamboj }
  ];

  const allEvents = [
    { 
      title: 'Deewana Tera by Sonu Nigam', 
      location: 'Phoenix Citadel Mall, Indore', 
      date: 'Today', 
      time: '7:00 PM',
      fullDate: 'Sat, 28 Feb',
      price: 'FREE', 
      image: SonuNigam, 
      category: 'MUSIC', 
      type: 'event',
      venue: 'Phoenix Citadel Mall, Indore'
    },
    { 
      title: 'Sunidhi Chauhan - I Am Home India Tour 2025-26', 
      location: 'Indore', 
      date: 'Tomorrow', 
      time: '8:00 PM',
      fullDate: 'Sun, 1 Mar',
      price: '₹1500', 
      image: SunidhiChauhan, 
      category: 'MUSIC', 
      type: 'event',
      venue: 'Venue to be announced'
    },
    { 
      title: 'Karan Aujla Live Concert', 
      location: 'Nehru Stadium, Indore', 
      date: 'This Weekend', 
      time: '9:00 PM',
      fullDate: 'Sat, 7 Mar',
      price: '₹2500', 
      image: KaranAujla, 
      category: 'MUSIC', 
      type: 'event',
      venue: 'Nehru Stadium, Indore'
    },
    { 
      title: 'Comedy Night with Aaditya Kullu', 
      location: 'Sayaji Hotel, Indore', 
      date: 'Next Week', 
      time: '7:30 PM',
      fullDate: 'Fri, 13 Mar',
      price: '₹800', 
      image: AadityaKullu, 
      category: 'COMEDY', 
      type: 'event',
      venue: 'Sayaji Hotel, Indore'
    },
    { 
      title: 'Border 2', 
      location: 'INOX Nexus Mall', 
      date: 'Now Showing', 
      time: 'Multiple Shows',
      fullDate: 'Daily',
      price: '₹250', 
      image: Border2, 
      category: 'MOVIES', 
      type: 'movie',
      venue: 'INOX Nexus Mall, Indore'
    },
    { 
      title: 'Dhurandhar', 
      location: 'PVR Phoenix Mall', 
      date: 'Now Showing', 
      time: 'Multiple Shows',
      fullDate: 'Daily',
      price: '₹300', 
      image: Dhurandhar, 
      category: 'MOVIES', 
      type: 'movie',
      venue: 'PVR Phoenix Mall, Indore'
    },
    { 
      title: 'Rahu Ketu', 
      location: 'Cinepolis DB Mall', 
      date: 'Now Showing', 
      time: 'Multiple Shows',
      fullDate: 'Daily',
      price: '₹280', 
      image: RahuKetu, 
      category: 'MOVIES', 
      type: 'movie',
      venue: 'Cinepolis DB Mall, Indore'
    },
    { 
      title: 'Happy Patel: Khatarnak Jasoos', 
      location: 'Malhar Mega Mall', 
      date: 'Now Showing', 
      time: 'Multiple Shows',
      fullDate: 'Daily',
      price: '₹220', 
      image: HappyPatel, 
      category: 'MOVIES', 
      type: 'movie',
      venue: 'Malhar Mega Mall, Indore'
    },
    { 
      title: 'Sarfira', 
      location: 'Treasure Island Mall', 
      date: 'Now Showing', 
      time: 'Multiple Shows',
      fullDate: 'Daily',
      price: '₹350', 
      image: Sarfira, 
      category: 'MOVIES', 
      type: 'movie',
      venue: 'Treasure Island Mall, Indore'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  const filterEvents = (category) => {
    setSelectedCategory(category);
    if (category === 'All Events') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.category === category));
    }
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh'
    }}>
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        activePage="events"
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Hero Section */}
        <div style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroEvents[currentHeroIndex].image})`,
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
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
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
                  alert(`Booking ${heroEvents[currentHeroIndex].title}`);
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
            width: '250px',
            height: '320px',
            borderRadius: '12px',
            backgroundImage: `url(${heroEvents[currentHeroIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '3px solid rgba(255, 255, 255, 0.2)'
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
            <div key={index} style={{
              backgroundColor: isDark ? '#1f2937' : 'white',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
                color: isDark ? '#f9fafb' : '#111827',
                margin: 0
              }}>{event.name}</h4>
            </div>
          ))}
        </div>

        {/* Artists in your District */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: isDark ? '#f9fafb' : '#111827',
          marginBottom: '20px'
        }}>Artists in your District</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {artists.map((artist, index) => (
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
                width: '100px',
                height: '100px',
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
              />
              <h4 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: isDark ? '#f9fafb' : '#111827',
                margin: 0
              }}>{artist.name}</h4>
            </div>
          ))}
        </div>

        {/* All Events */}
        <h2 style={{
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
          <button
            onClick={() => filterEvents('MOVIES')}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedCategory === 'MOVIES' ? '#8b5cf6' : (isDark ? '#374151' : '#f3f4f6'),
              color: selectedCategory === 'MOVIES' ? 'white' : (isDark ? '#f9fafb' : '#111827'),
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            MOVIES
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
                cursor: 'pointer'
              }}
            >
              {event.name}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
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
                height: '200px',
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div style={{ padding: '16px' }}>
                <div style={{
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '700',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={12} style={{ color: '#667eea' }} />
                  {event.fullDate}, {event.time}
                </div>
                
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>{event.title}</h3>
                
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280',
                  marginBottom: '12px'
                }}>{event.venue}</p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: event.price === 'FREE' ? '#10b981' : (isDark ? '#f9fafb' : '#111827')
                  }}>{event.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      if (onBookTickets) {
                        onBookTickets(event);
                      } else {
                        alert(`Booking ${event.title}`);
                      }
                    }}
                    style={{
                    padding: '6px 12px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SharedFooter isDark={isDark} onNavigate={onNavigate} />
    </div>
  );
};

export default EventsPage;