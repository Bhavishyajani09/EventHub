import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bookings = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Events');
  const [loading, setLoading] = useState(true);
  const [bookingsList, setBookingsList] = useState({
    Events: [],
    Movies: []
  });

  const tabs = ['Events', 'Movies'];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const allBookings = response.data.bookings;

        // Categorize bookings
        const events = [];
        const movies = [];

        allBookings.forEach(booking => {
          if (booking.event) {
            const category = booking.event.category || 'Event';
            // Assuming 'Movie' is the category string for movies
            if (category === 'Movie') {
              movies.push(booking);
            } else {
              events.push(booking);
            }
          }
        });

        setBookingsList({
          Events: events,
          Movies: movies
        });
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeBookings = bookingsList[activeTab] || [];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDark ? '#111827' : '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: isDark ? '#f9fafb' : '#111827'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: isDark ? '#1f2937' : 'white',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#f9fafb' : 'inherit'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Logo */}
          <div
            onClick={() => {
              onNavigate('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src="/new_icon_favicon.png"
              alt="EventHub Logo"
              style={{
                width: '60px',
                height: '54px'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827'
              }}>EventHub</span>
              <span style={{
                fontSize: '8px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>EVENT PLATFORM</span>
            </div>
          </div>
        </div>

        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: isDark ? '#f9fafb' : '#111827',
          margin: 0,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: window.innerWidth < 768 ? 'none' : 'block'
        }}>
          Review your bookings
        </h1>

        {/* Profile Icon */}
        <div
          onClick={onProfileClick}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'D'}
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            borderRadius: '12px',
            padding: '4px',
            gap: '4px'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: activeTab === tab ? (isDark ? '#000' : '#000') : 'transparent',
                  color: activeTab === tab ? 'white' : (isDark ? '#9ca3af' : '#6b7280')
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : activeBookings.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {activeBookings.map((booking) => (
              <div key={booking._id} style={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    backgroundColor: booking.status === 'confirmed' ? '#dcfce7' : '#fee2e2',
                    color: booking.status === 'confirmed' ? '#166534' : '#991b1b',
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600'
                  }}>
                    {booking.status.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }}>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{booking.event?.title}</h3>
                <p style={{ fontSize: '14px', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '4px' }}>
                  {new Date(booking.event?.date).toLocaleString()}
                </p>
                <p style={{ fontSize: '14px', color: isDark ? '#d1d5db' : '#4b5563', marginBottom: '12px' }}>
                  {booking.event?.location} | {booking.tickets} Ticket(s) ({booking.ticketType})
                </p>
                <div style={{ borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: isDark ? '#9ca3af' : '#6b7280' }}>Total Amount</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>₹{booking.totalAmount}</span>
                </div>
                <div style={{ marginTop: '12px', fontSize: '10px', color: '#9ca3af' }}>Booking ID: {booking.bookingId}</div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            textAlign: 'center'
          }}>
            {/* Empty State Icon */}
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: '#e0e7ff',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              position: 'relative'
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {/* Star decoration */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '20px',
                height: '20px',
                backgroundColor: '#8b5cf6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
            </div>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              margin: '0 0 8px 0'
            }}>
              No bookings yet!
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0,
              maxWidth: '400px',
              lineHeight: '1.5'
            }}>
              When you book {activeTab.toLowerCase()}, they will appear here. Start exploring to make your first booking!
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                // Navigate to respective section
                if (activeTab === 'Movies') {
                  onNavigate('movies');
                } else if (activeTab === 'Events') {
                  onNavigate('events');
                } else {
                  onNavigate('home');
                }
              }}
              style={{
                marginTop: '32px',
                padding: '14px 28px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7c3aed';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#8b5cf6';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Explore {activeTab}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;