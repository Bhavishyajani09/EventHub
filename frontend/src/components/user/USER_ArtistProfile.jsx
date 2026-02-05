import React, { useState, useEffect } from 'react';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';
import artistService from '../../services/artistService';

const ArtistProfile = ({ artist: initialArtist, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onEventClick }) => {
  const [artist, setArtist] = useState(initialArtist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialArtist?._id) {
      fetchFullArtist(initialArtist._id);
    }
  }, [initialArtist?._id]);

  const fetchFullArtist = async (id) => {
    try {
      setLoading(true);
      const response = await artistService.getArtistById(id);
      if (response.success) {
        setArtist(response.artist);
      }
    } catch (error) {
      console.error('Error fetching artist details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!artist) {
    return (
      <div style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        backgroundColor: isDark ? '#111827' : '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: isDark ? '#f9fafb' : '#111827'
        }}>
          <h2>Artist not found</h2>
          <button
            onClick={() => onNavigate('events')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const artistEvents = [
    {
      title: `${artist.name} - I Am Home India Tour 2025-26`,
      location: 'Jaipur',
      date: 'Today',
      status: 'Live',
      image: artist.image
    },
    {
      title: `${artist.name} - I Am Home India Tour 2025-26`,
      location: 'Chandigarh',
      date: 'Tomorrow',
      status: 'Chandigarh',
      image: artist.image
    },
    {
      title: `${artist.name} - I Am Home India Tour 2025-26`,
      location: 'Lucknow',
      date: 'This Weekend',
      status: 'Lucknow',
      image: artist.image
    },
    {
      title: `${artist.name} - I Am Home India Tour 2025-26`,
      location: 'Indore',
      date: 'Next Week',
      status: 'Indore',
      image: artist.image
    }
  ];

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
        searchOnly={true}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(20px, 5vw, 40px) clamp(16px, 4vw, 20px)'
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#374151',
            cursor: 'pointer',
            padding: '8px 16px',
            fontWeight: '500',
            marginBottom: '20px'
          }}
        >
          Back
        </button>

        {/* Artist Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '400px 1fr' : '1fr',
          gap: 'clamp(20px, 5vw, 40px)',
          marginBottom: 'clamp(40px, 8vw, 60px)'
        }}>
          {/* Artist Image */}
          <div style={{
            backgroundImage: `url(${artist.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px',
            height: 'clamp(300px, 50vw, 400px)',
            boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.15)'
          }} />

          {/* Artist Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h1 style={{
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '20px',
              lineHeight: '1.1',
              textAlign: window.innerWidth > 768 ? 'left' : 'center'
            }}>{artist.name}</h1>

            <p style={{
              fontSize: 'clamp(16px, 4vw, 18px)',
              color: isDark ? '#d1d5db' : '#4b5563',
              lineHeight: '1.6',
              marginBottom: '0',
              textAlign: window.innerWidth > 768 ? 'left' : 'center'
            }}>
              {artist.bio || `${artist.name} is one of the most popular artists in the district, known for their incredible talent in ${artist.category || 'their field'}. Join their upcoming events for an unforgettable experience!`}
            </p>
          </div>
        </div>

        {/* All Events Section */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '30px'
          }}>ALL EVENTS</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                <p style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>Loading events...</p>
              </div>
            ) : (!artist.events || artist.events.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                <p style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>No events found for this artist</p>
              </div>
            ) : (
              artist.events.map((event, index) => (
                <div
                  key={index}
                  onClick={() => onEventClick && onEventClick(event)}
                  style={{
                    backgroundColor: isDark ? '#1f2937' : 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${event.image || '/placeholder-event.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />

                  <div style={{ padding: '16px' }}>
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
                      marginBottom: '4px'
                    }}>{event.location}</p>

                    <p style={{
                      fontSize: '12px',
                      color: '#6366f1',
                      fontWeight: '500'
                    }}>{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <SharedFooter isDark={isDark} onNavigate={onNavigate} />
    </div>
  );
};

export default ArtistProfile;