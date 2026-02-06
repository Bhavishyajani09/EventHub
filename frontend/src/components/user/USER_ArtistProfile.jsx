import React, { useState, useEffect } from 'react';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';
import artistService from '../../services/artistService';
import { MapPin, Calendar, ArrowLeft, Star, Music, Mic, Palette, Trophy } from 'lucide-react';

const ArtistProfile = ({ artist: initialArtist, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onEventClick }) => {
  const [artist, setArtist] = useState(initialArtist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialArtist?._id) {
      fetchFullArtist(initialArtist._id);
    }
  }, [initialArtist?._id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Music': return <Music size={18} />;
      case 'Comedy': return <Mic size={18} />;
      case 'Art': return <Palette size={18} />;
      case 'Sports': return <Trophy size={18} />;
      default: return <Star size={18} />;
    }
  };

  if (!artist) {
    return (
      <div style={{
        fontFamily: 'Inter, sans-serif',
        backgroundColor: isDark ? '#111827' : '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            color: isDark ? '#f9fafb' : '#111827',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>Artist Not Found</h2>
          <button
            onClick={() => onNavigate('events')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Explore Events
          </button>
        </div>
      </div>
    );
  }

  const bgGradient = isDark
    ? '#111827' // Solid dark
    : '#f8fafc'; // Solid light

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: bgGradient,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
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
        flex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(20px, 4vw, 40px)',
        width: '100%'
      }}>

        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            color: isDark ? '#9ca3af' : '#6b7280',
            cursor: 'pointer',
            marginBottom: '32px',
            padding: 0
          }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Artist Header Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '300px 1fr' : '1fr',
          gap: 'clamp(30px, 5vw, 60px)',
          marginBottom: '60px',
          alignItems: 'start'
        }}>
          {/* Artist Image Frame */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(0, 0, 0, 0.15)',
            }}>
              <div style={{
                backgroundImage: `url(${artist.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }} />
            </div>
          </div>

          {/* Artist Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '10px'
          }}>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '800',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '16px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>{artist.name}</h1>

            <p style={{
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              color: isDark ? '#9ca3af' : '#4b5563',
              lineHeight: '1.7',
              marginBottom: '0',
              maxWidth: '800px'
            }}>
              {artist.bio || `${artist.name} is a renowned performer. Known for their exceptional talent, they consistently deliver unforgettable experiences.`}
            </p>
          </div>
        </div>

        {/* Updated Event Cards Section */}
        <div>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Calendar className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
              Upcoming Events
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            paddingBottom: '40px'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                <p style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>Loading events...</p>
              </div>
            ) : (!artist.events || artist.events.length === 0) ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                gridColumn: '1 / -1',
                background: isDark ? '#1f2937' : '#f9fafb',
                borderRadius: '16px',
                border: `2px dashed ${isDark ? '#374151' : '#e5e7eb'}`
              }}>
                <div style={{ opacity: 0.5, marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <Calendar size={40} color={isDark ? '#9ca3af' : '#9ca3af'} />
                </div>
                <p style={{
                  color: isDark ? '#d1d5db' : '#4b5563',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>No upcoming events scheduled</p>
              </div>
            ) : (
              artist.events.map((event, index) => (
                <div
                  key={index}
                  onClick={() => onEventClick && onEventClick(event)}
                  style={{
                    backgroundColor: isDark ? '#1f2937' : 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.4)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      height: '180px',
                      backgroundImage: `url(${event.image || '/placeholder-event.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      color: '#111827',
                      fontSize: '11px',
                      fontWeight: '700',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  <div style={{
                    padding: '20px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: isDark ? '#f9fafb' : '#111827',
                        marginBottom: '6px',
                        lineHeight: '1.3'
                      }}>{event.title}</h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isDark ? '#9ca3af' : '#6b7280', fontSize: '13px' }}>
                        <MapPin size={13} />
                        {event.location}
                      </div>
                    </div>

                    <button
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: isDark ? '#374151' : '#f9fafb',
                        color: isDark ? '#f9fafb' : '#1f2937',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        marginTop: 'auto',
                        border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f9fafb';
                      }}
                    >
                      Book Tickets
                    </button>
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
