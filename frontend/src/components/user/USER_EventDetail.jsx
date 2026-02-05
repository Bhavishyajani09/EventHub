import React, { useState } from 'react';
import { Music, MapPin, Calendar, Clock, Ticket, Car, UtensilsCrossed, Accessibility, ChevronDown } from 'lucide-react';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';

const EventDetail = ({ event, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onBookTickets }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  if (!event) {
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
          <h2>Event not found</h2>
          <button
            onClick={() => onNavigate('events')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#8b5cf6',
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

  const getDisplayDate = () => {
    if (event.fullDate) return event.fullDate;
    if (event.date) {
      return new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Date TBA';
  };

  const getDisplayTime = () => {
    if (event.time) return event.time;
    if (event.date) {
      return new Date(event.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'Time TBA';
  };

  const displayVenue = event.venue || event.location || 'Venue TBA';
  const displayDate = getDisplayDate();
  const displayTime = getDisplayTime();

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Navbar */}
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

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        width: 'calc(100% - 40px)',
        boxSizing: 'border-box',
        overflowX: 'hidden'
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

        {/* Event Details Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Left Section - Event Info */}
          <div>
            <div style={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '12px',
              height: '400px',
              marginBottom: '20px',
              backgroundColor: '#f9fafb'
            }}></div>

            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px'
            }}>{event.title}</h1>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px',
              fontSize: '14px',
              color: isDark ? '#9ca3af' : '#6b7280'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Music size={16} /> {event.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} /> {displayVenue}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} /> {displayDate}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} /> {displayTime}
              </span>
            </div>

            {/* About the Event */}
            <div style={{
              backgroundColor: isDark ? '#1f2937' : 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px',
              boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '12px'
              }}>About the Event</h3>
              <p style={{
                color: isDark ? '#d1d5db' : '#4b5563',
                lineHeight: '1.6'
              }}>
                {event.type === 'event' ? (
                  `Experience an unforgettable ${(event.category || 'entertainment').toLowerCase()} event with ${event.title}. 
                  Join us for an amazing live performance that will create lasting memories. 
                  Don't miss this incredible opportunity to witness world-class entertainment.`
                ) : (
                  `Watch ${event.title} in the best cinemas. This ${(event.category || 'movie').toLowerCase()} 
                  promises to deliver an exceptional viewing experience with stunning visuals 
                  and captivating storytelling that will keep you engaged throughout.`
                )}
              </p>
            </div>
          </div>

          {/* Right Section - Booking Info */}
          <div>
            <div style={{
              backgroundColor: isDark ? '#1f2937' : 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '20px'
              }}>{event.title}</h2>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Music size={16} />
                  <span style={{
                    color: isDark ? '#d1d5db' : '#4b5563',
                    fontSize: '14px'
                  }}>{event.type === 'event' ? 'Live Event' : 'Movie'}, {event.category}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <Calendar size={16} />
                  <span style={{
                    color: isDark ? '#d1d5db' : '#4b5563',
                    fontSize: '14px'
                  }}>{displayDate}, {displayTime}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  <MapPin size={16} />
                  <span style={{
                    color: isDark ? '#d1d5db' : '#4b5563',
                    fontSize: '14px'
                  }}>{displayVenue}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  color: isDark ? '#d1d5db' : '#4b5563',
                  fontSize: '14px'
                }}>Starts from</span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: event.price === 'FREE' ? '#10b981' : (isDark ? '#f9fafb' : '#111827')
                }}>
                  {event.seatTypes && event.seatTypes.length > 0
                    ? `₹${Math.min(...event.seatTypes.map(seat => seat.price))}`
                    : (event.price === 0 ? 'FREE' : `₹${event.price}`)}
                </span>
              </div>

              <button
                onClick={() => onBookTickets && onBookTickets(event)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientMove 3s ease infinite',
                  color: 'white',
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  fontSize: '16px',
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
                BOOK TICKETS
              </button>
            </div>
          </div>
        </div>

        {/* Event Guide Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '20px'
          }}>Event Information</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Music size={20} />
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '4px'
                }}>Category</h4>
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>{event.category}</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Clock size={20} />
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '4px'
                }}>Duration</h4>
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>{event.type === 'event' ? '2-3 hours' : '2h 30m'}</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Ticket size={20} />
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  marginBottom: '4px'
                }}>Booking</h4>
                <p style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>Online & Offline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '16px'
          }}>Venue</h3>

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}>
            <MapPin size={20} style={{ marginTop: '2px' }} />
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '8px'
              }}>{displayVenue}</h4>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#9ca3af' : '#6b7280',
                lineHeight: '1.5',
                marginBottom: '12px'
              }}>
                {displayVenue}, Indore, Madhya Pradesh 452001<br />
                A premier venue for live events and entertainment with state-of-the-art facilities and excellent acoustics.
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                fontSize: '14px',
                color: isDark ? '#9ca3af' : '#6b7280'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Car size={14} /> Parking Available
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <UtensilsCrossed size={14} /> Food & Beverages
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Accessibility size={14} /> Wheelchair Accessible
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <div
            onClick={() => setIsTermsOpen(!isTermsOpen)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: isTermsOpen ? '16px' : '0'
            }}
          >
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              margin: 0
            }}>Terms & Conditions</h3>
            <ChevronDown
              size={20}
              style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                transform: isTermsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            />
          </div>

          {isTermsOpen && (
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '14px',
              color: isDark ? '#d1d5db' : '#4b5563',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>Entry is subject to the terms and conditions of the venue</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>No outside food, beverages, or professional cameras allowed</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>Tickets once booked cannot be exchanged or refunded</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>Entry is restricted for children below 5 years of age</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>The organizer reserves the right to deny entry or eject any person</span>
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>Please carry a valid photo ID for verification at the venue</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#dc2626', marginTop: '2px' }}>•</span>
                <span>Event timings are subject to change. Please check for updates</span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <SharedFooter isDark={isDark} onNavigate={onNavigate} />
    </div>
  );
};

export default EventDetail;