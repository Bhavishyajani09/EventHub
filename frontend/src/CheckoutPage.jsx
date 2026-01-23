import React, { useState, useEffect } from 'react';
import SharedNavbar from './SharedNavbar';

const CheckoutPage = ({ event, selectedSection, quantity, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, setCurrentPage, updateURL, onBack, onContinue }) => {
  const [timeLeft, setTimeLeft] = useState(595); // 9:55 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!event || !selectedSection) {
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
          <h2>Booking information not found</h2>
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

  const orderAmount = parseInt(selectedSection.price.replace('₹', '')) * quantity;
  const bookingFee = Math.round(orderAmount * 0.085); // 8.5% booking fee
  const grandTotal = orderAmount + bookingFee;

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: isDark ? '#111827' : '#f8fafc',
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
        pageTitle="Review your booking"
      />

      {/* Timer Bar */}
      <div style={{
        backgroundColor: '#e0e7ff',
        padding: '12px 0',
        textAlign: 'center',
        borderBottom: '1px solid #d1d5db'
      }}>
        <span style={{
          fontSize: '14px',
          color: '#6366f1',
          fontWeight: '500'
        }}>
          ⏱ Complete your booking in {formatTime(timeLeft)} mins
        </span>
      </div>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Back Button */}
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
          ← Back
        </button>

        {/* Step 1: Order Summary */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>1</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              margin: 0
            }}>Order Summary</h3>
          </div>

          {/* TICKETS Section */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>TICKETS</h4>
            
            <div style={{
              backgroundColor: isDark ? '#374151' : '#f9fafb',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <h5 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '8px'
              }}>{event.title}</h5>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#d1d5db' : '#6b7280'
                }}>Early Bird | {selectedSection.name}</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>₹{orderAmount}</span>
              </div>
              
              <div style={{
                fontSize: '12px',
                color: isDark ? '#9ca3af' : '#6b7280'
              }}>
                {quantity} ticket{quantity > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* OFFERS Section */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>OFFERS</h4>
            
            <div style={{
              border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>🎟️</span>
                  <span style={{
                    fontSize: '14px',
                    color: isDark ? '#d1d5db' : '#374151'
                  }}>View all event offers</span>
                </div>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>→</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>💳</span>
                  <span style={{
                    fontSize: '14px',
                    color: isDark ? '#d1d5db' : '#374151'
                  }}>View all payment offers</span>
                </div>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}>→</span>
              </div>
            </div>
          </div>

          {/* PAYMENT DETAILS Section */}
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>PAYMENT DETAILS</h4>
            
            <div style={{
              backgroundColor: isDark ? '#374151' : '#f9fafb',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#d1d5db' : '#6b7280'
                }}>Order amount</span>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>₹ {orderAmount}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#d1d5db' : '#6b7280'
                }}>Booking fee (inc. of GST) ▼</span>
                <span style={{
                  fontSize: '14px',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>₹ {bookingFee}</span>
              </div>
              
              <hr style={{
                border: 'none',
                borderTop: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                margin: '12px 0'
              }} />
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>Grand Total</span>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>₹ {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginTop: '20px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0f172a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
          >
            CONTINUE
          </button>
        </div>

        {/* Step 2: Billing Details */}
        <div 
          onClick={() => {
            setCurrentPage('billing');
            updateURL('billing');
          }}
          style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : 'white';
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isDark ? '#374151' : '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>2</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#9ca3af' : '#6b7280',
              margin: 0
            }}>Billing Details</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;