import React, { useState, useEffect } from 'react';
import SharedNavbar from './SharedNavbar';
import SharedFooter from './SharedFooter';

const BookingPage = ({ movie, event, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onGoToSeatSelection }) => {
  const [selectedSeats, setSelectedSeats] = useState(3);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const item = movie || event;
  
  useEffect(() => {
    document.title = 'Review your booking - Complete your booking';
  }, []);
  
  if (!item) {
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
          <h2>Item not found</h2>
          <button 
            onClick={() => onNavigate('home')}
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
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: isDark ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0
    }}>
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onAuthOpen={onAuthOpen}
        onProfileClick={onProfileClick}
        onNavigate={onNavigate}
        searchOnly={true}
        pageTitle="Review your booking - Complete your booking"
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: '40px'
      }}>
        {/* Back Button */}
        <div style={{ gridColumn: '1 / -1' }}>
          <button 
            onClick={onBack}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: isDark ? '#f9fafb' : '#374151',
              border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Back to Movies
          </button>
        </div>
        {/* Left Section */}
        <div>


          {/* Movie Details */}
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px',
            display: 'flex',
            gap: '20px'
          }}>
            <img src={item.image} alt={item.title} style={{
              width: '80px',
              height: '100px',
              borderRadius: '8px',
              objectFit: 'cover'
            }} />
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '8px'
              }}>{item.title}</h3>
              <p style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px',
                marginBottom: '4px'
              }}>{item.type === 'movie' ? 'A | Hindi | 2D' : `${item.category} | Live Event`}</p>
              <p style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px'
              }}>{item.venue || item.location}</p>
              
              <div style={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                marginTop: '12px',
                display: 'inline-block'
              }}>
                ⚠️ Adults only - no entry for children
              </div>
            </div>
          </div>

          {/* Show Details */}
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>Tomorrow, 22 Jan | 06:20 PM</h4>
                <p style={{
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontSize: '14px'
                }}>3 tickets</p>
                <p style={{
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontSize: '14px'
                }}>C1 - H3, H4, H5</p>
                <p style={{
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontSize: '14px'
                }}>Screen 4</p>
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827'
              }}>₹640</div>
            </div>
            
            <div style={{
              padding: '12px',
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#10b981' }}>✓</span>
              <span style={{
                color: isDark ? '#d1d5db' : '#4b5563',
                fontSize: '14px'
              }}>Cancellation available</span>
            </div>
          </div>
        </div>

        {/* Right Section - Payment Summary */}
        <div>
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '24px',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '20px'
            }}>Payment summary</h3>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{
                  color: isDark ? '#d1d5db' : '#4b5563',
                  fontSize: '14px'
                }}>Order amount</span>
                <span style={{
                  color: isDark ? '#f9fafb' : '#111827',
                  fontSize: '14px'
                }}>₹540.00</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <span style={{
                  color: isDark ? '#d1d5db' : '#4b5563',
                  fontSize: '14px'
                }}>Booking charges (incl. of GST)</span>
                <span style={{
                  color: isDark ? '#f9fafb' : '#111827',
                  fontSize: '14px'
                }}>₹102.66</span>
              </div>
              <hr style={{
                border: 'none',
                borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                margin: '16px 0'
              }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  color: isDark ? '#f9fafb' : '#111827',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>To be paid</span>
                <span style={{
                  color: isDark ? '#f9fafb' : '#111827',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>₹642.66</span>
              </div>
            </div>

            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '16px'
            }}>Your details</h4>

            {user ? (
              <div style={{
                backgroundColor: isDark ? '#374151' : '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>{user.name ? user.name.charAt(0).toUpperCase() : '👤'}</div>
                  <div>
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isDark ? '#f9fafb' : '#111827',
                      marginBottom: '2px'
                    }}>{user.name}</h5>
                    <p style={{
                      fontSize: '12px',
                      color: isDark ? '#9ca3af' : '#6b7280',
                      marginBottom: '2px'
                    }}>{user.phone}</p>
                    <p style={{
                      fontSize: '12px',
                      color: isDark ? '#9ca3af' : '#6b7280'
                    }}>{user.email}</p>
                    {user.location && (
                      <p style={{
                        fontSize: '12px',
                        color: isDark ? '#9ca3af' : '#6b7280'
                      }}>{user.location}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: isDark ? '#374151' : '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  color: isDark ? '#9ca3af' : '#6b7280',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>Please login to continue with booking</div>
                <button 
                  onClick={onAuthOpen}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Login / Sign Up
                </button>
              </div>
            )}

            {showLoginWarning && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#dc2626', fontSize: '16px' }}>⚠️</span>
                <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                  Please login first to proceed with booking!
                </span>
              </div>
            )}

            <button style={{
              width: '100%',
              padding: '16px',
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              if (!user) {
                setShowLoginWarning(true);
              } else {
                onGoToSeatSelection();
              }
            }}
            >
              <span>₹642.66</span>
              <span>Proceed To Pay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <SharedFooter isDark={isDark} onNavigate={onNavigate} />
      
      {/* Gradient Animation Styles */}
      <style>{`
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

export default BookingPage;