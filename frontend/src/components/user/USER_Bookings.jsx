import React, { useState, useEffect } from 'react';
import axios from 'axios';
import eventService from '../../services/eventService';
import toast from 'react-hot-toast';
import { BookingCardSkeleton } from '../common/Skeleton';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

const Bookings = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const allBookings = response.data.bookings;

        // Sort by event date (Newest/Future first)
        const sortedBookings = allBookings.sort((a, b) => {
          const dateA = new Date(a.event?.date || 0);
          const dateB = new Date(b.event?.date || 0);
          return dateB - dateA;
        });

        setBookings(sortedBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, eventDate) => {
    // Check if event is in the past
    if (new Date(eventDate) < new Date()) {
      toast.error("Cannot cancel past events.");
      return;
    }

    if (!window.confirm('Are you sure you want to cancel this booking? Cancellation charges may apply if less than 24 hours before event.')) {
      return;
    }

    try {
      const result = await eventService.cancelBooking(bookingId);
      if (result.success) {
        toast.success(result.message || 'Booking cancelled successfully');
        fetchBookings(); // Refresh list
      } else {
        toast.error(result.message || result.error || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      toast.error('An error occurred while cancelling the booking. Please try again.');
    }
  };

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
        {/* No Tabs anymore */}

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {Array(6).fill(0).map((_, i) => <BookingCardSkeleton key={i} isDark={isDark} />)}
          </div>
        ) : bookings.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {bookings.map((booking) => (
              <div key={booking._id} style={{
                backgroundColor: isDark ? '#1f2937' : 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Image Section if available */}
                {booking.event?.image && (
                  <div style={{
                    height: '120px',
                    width: '100%',
                    backgroundColor: isDark ? '#111827' : '#f3f4f6', // distinct background
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
                  }}>
                    <img
                      src={booking.event.image}
                      alt={booking.event.title}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover', // Ensure full image is visible
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: booking.status === 'confirmed' ? '#dcfce7' : (booking.status === 'cancelled' ? '#fee2e2' : '#fef9c3'),
                      color: booking.status === 'confirmed' ? '#166534' : (booking.status === 'cancelled' ? '#991b1b' : '#854d0e'),
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      zIndex: 10
                    }}>
                      {booking.status}
                    </div>
                  </div>
                )}

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {!booking.event?.image && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                      <span style={{
                        backgroundColor: booking.status === 'confirmed' ? '#dcfce7' : (booking.status === 'cancelled' ? '#fee2e2' : '#fef9c3'),
                        color: booking.status === 'confirmed' ? '#166534' : (booking.status === 'cancelled' ? '#991b1b' : '#854d0e'),
                        padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase'
                      }}>
                        {booking.status}
                      </span>
                    </div>
                  )}

                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: isDark ? '#f9fafb' : '#111827',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }} title={booking.event?.title}>{booking.event?.title}</h3>

                  <div style={{
                    fontSize: '13px',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} style={{ color: '#8b5cf6' }} />
                      <span>{new Date(booking.event?.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(booking.event?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: '#8b5cf6' }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{booking.event?.location || booking.event?.venue}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Ticket size={14} style={{ color: '#8b5cf6' }} />
                      <span>{booking.tickets} Ticket(s) • {booking.ticketType}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{
                      borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                      paddingTop: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <span style={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280', display: 'block' }}>Total Paid</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: isDark ? '#f9fafb' : '#111827' }}>₹{booking.totalAmount}</span>
                      </div>
                    </div>

                    {booking.status !== 'cancelled' ? (
                      <button
                        onClick={() => handleCancelBooking(booking._id, booking.event?.date)}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          backgroundColor: 'transparent',
                          color: '#ef4444',
                          border: '1px solid #ef4444',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#ef4444';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#ef4444';
                        }}
                      >
                        Cancel Booking
                      </button>
                    ) : (
                      <div style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: isDark ? '#374151' : '#f3f4f6',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '500',
                        textAlign: 'center',
                        border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db'
                      }}>
                        Booking Cancelled
                      </div>
                    )}
                    <div style={{ marginTop: '12px', fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>ID: {booking.bookingId}</div>
                  </div>
                </div>
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
              When you book events, they will appear here. Start exploring to make your first booking!
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                onNavigate('home');
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
              Explore Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;