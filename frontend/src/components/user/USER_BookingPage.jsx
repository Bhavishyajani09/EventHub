import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SharedNavbar from '../../SharedNavbar';
import SharedFooter from '../../SharedFooter';
import USER_PaymentModal from './USER_PaymentModal';
import toast from 'react-hot-toast';

const BookingPage = ({ item, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack }) => {
  const [selectedSeatType, setSelectedSeatType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  // Determine which item to show
  const isEvent = item?.type === 'event' || item?.category;
  const isMovie = !isEvent;

  // Get seat types from database or use defaults
  const getSeatTypes = () => {
    if (item?.seatTypes && item.seatTypes.length > 0) {
      // Use real data from database
      const seatTypeMap = {};
      item.seatTypes.forEach(seat => {
        const seatName = seat.name.toLowerCase();
        seatTypeMap[seatName] = {
          price: seat.price,
          available: seat.available,
          quantity: seat.quantity,
          color: seatName === 'general' ? '#1f2937' : seatName === 'vip' ? '#92400e' : '#581c87',
          bgColor: seatName === 'general' ? '#f8fafc' : seatName === 'vip' ? '#fef3c7' : '#faf5ff',
          border: seatName === 'general' ? '#e5e7eb' : seatName === 'vip' ? '#d97706' : '#7c3aed'
        };
      });
      return seatTypeMap;
    }
    // If no seat types in database, use the event's base price
    if (item?.price) {
      return {
        standard: {
          price: item.price,
          color: '#8b5cf6',
          bgColor: '#f3f4f6',
          border: '#8b5cf6',
          available: item.capacity // Use total capacity
        }
      };
    }

    // Fallback only if absolutely no data available (shouldn't happen with valid events)
    return {
      standard: { price: 200, color: '#1f2937', bgColor: '#f8fafc', border: '#e5e7eb' }
    };
  };

  const seatTypes = getSeatTypes();

  const updateQuantity = (change) => {
    const maxQuantity = selectedSeatType && seatTypes[selectedSeatType]?.available
      ? Math.min(10, seatTypes[selectedSeatType].available)
      : 10;
    setQuantity(Math.max(1, Math.min(maxQuantity, quantity + change)));
  };

  const getTotalAmount = () => {
    return selectedSeatType ? seatTypes[selectedSeatType].price * quantity : 0;
  };

  const getBookingCharges = () => {
    const total = getTotalAmount();
    return Math.round(total * 0.19);
  };

  const getFinalAmount = () => {
    return getTotalAmount() + getBookingCharges();
  };

  const handleBooking = () => {
    if (!selectedSeatType) {
      toast.error('Please select a seat type');
      return;
    }

    if (!user) {
      onAuthOpen();
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePayment = async (paymentData) => {
    setIsProcessingPayment(true);
    setShowPaymentModal(false);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        onAuthOpen();
        setIsProcessingPayment(false);
        return;
      }

      const bookingData = {
        eventId: item._id,
        ticketType: selectedSeatType,
        quantity: quantity,
        totalAmount: getFinalAmount(),
        paymentId: paymentData?.paymentId || 'PAY-' + Date.now()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings/create`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setIsProcessingPayment(false);
        setShowBookingSuccess(true);

        setTimeout(() => {
          setShowBookingSuccess(false);
          // Check if parent passed a specific navigate function or handle it
          if (onNavigate) {
            onNavigate('bookings');
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      setIsProcessingPayment(false);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

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
        padding: 'clamp(16px, 4vw, 20px)',
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? '1fr 350px' : '1fr',
        gap: 'clamp(20px, 5vw, 40px)'
      }}>
        {/* Back Button */}
        <div style={{ gridColumn: '1 / -1' }}>
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
        </div>
        {/* Left Section */}
        <div>


          {/* Movie Details */}
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: window.innerWidth > 480 ? 'row' : 'column',
            gap: '20px',
            alignItems: window.innerWidth > 480 ? 'flex-start' : 'center',
            textAlign: window.innerWidth > 480 ? 'left' : 'center'
          }}>
            <img src={item.image} alt={item.title} style={{
              width: 'clamp(60px, 15vw, 80px)',
              height: 'clamp(80px, 20vw, 100px)',
              borderRadius: '8px',
              objectFit: 'cover',
              flexShrink: 0
            }} />
            <div>
              <h3 style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '8px'
              }}>{item.title}</h3>
              <p style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px',
                marginBottom: '4px'
              }}>{isEvent ? `${item.category || 'Event'} | Live Event` : 'A | Hindi | 2D'}</p>
              <p style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '14px'
              }}>{isEvent ? (item.venue || item.location) : (item.location || 'Cinema Hall')}</p>

            </div>
          </div>

          {/* Ticket Selection */}
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '8px',
            padding: 'clamp(20px, 5vw, 32px)',
            marginBottom: '20px',
            border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h4 style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '24px',
              textAlign: 'center',
              letterSpacing: '0.025em'
            }}>Select Ticket Category</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(seatTypes).map(([type, details]) => {
                // Check if seats are available
                const isAvailable = details.available === undefined || details.available > 0;
                return (
                  <div
                    key={type}
                    onClick={() => isAvailable && setSelectedSeatType(type)}
                    style={{
                      backgroundColor: selectedSeatType === type ? details.bgColor : (isDark ? '#374151' : '#ffffff'),
                      border: selectedSeatType === type ? `2px solid ${details.border}` : `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
                      borderRadius: '6px',
                      padding: 'clamp(16px, 4vw, 20px) clamp(20px, 5vw, 24px)',
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      opacity: isAvailable ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {!isAvailable && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-10deg)',
                        backgroundColor: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        zIndex: 10,
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        SOLD OUT
                      </div>
                    )}
                    <div style={{ opacity: isAvailable ? 1 : 0.5 }}>
                      <h5 style={{
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: '600',
                        color: selectedSeatType === type ? details.color : (isDark ? '#f9fafb' : '#111827'),
                        textTransform: 'capitalize',
                        marginBottom: '4px',
                        letterSpacing: '0.025em'
                      }}>{type}</h5>
                      <p style={{
                        fontSize: '14px',
                        color: isDark ? '#9ca3af' : '#6b7280',
                        margin: 0
                      }}>₹{details.price} per ticket {details.available !== undefined && `(${details.available} available)`}</p>
                    </div>

                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: selectedSeatType === type ? `2px solid ${details.color}` : `2px solid ${isDark ? '#6b7280' : '#d1d5db'}`,
                      backgroundColor: selectedSeatType === type ? details.color : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      opacity: isAvailable ? 1 : 0.5
                    }}>
                      {selectedSeatType === type && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: 'white'
                        }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedSeatType && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: isDark ? '#111827' : '#f9fafb',
                borderRadius: '6px',
                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: isDark ? '#f9fafb' : '#111827',
                    textTransform: 'capitalize'
                  }}>Quantity</span>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: isDark ? '#374151' : 'white',
                    borderRadius: '4px',
                    padding: '4px',
                    border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db'
                  }}>
                    <button
                      onClick={() => updateQuantity(-1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: isDark ? '#f9fafb' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    >−</button>

                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: isDark ? '#f9fafb' : '#111827',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>{quantity}</span>

                    <button
                      onClick={() => updateQuantity(1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: isDark ? '#f9fafb' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    >+</button>
                  </div>
                </div>

                <div style={{
                  padding: '12px 16px',
                  backgroundColor: isDark ? '#1f2937' : 'white',
                  borderRadius: '4px',
                  border: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: isDark ? '#d1d5db' : '#4b5563',
                      fontSize: '14px',
                      textTransform: 'capitalize'
                    }}>{selectedSeatType} × {quantity}</span>
                    <span style={{
                      color: isDark ? '#f9fafb' : '#111827',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>₹{getTotalAmount()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Show Details */}
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px'
            }}>Show Details</h4>
            <p style={{
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '14px',
              marginBottom: '8px'
            }}>Tomorrow, 22 Jan | 06:20 PM</p>
            <p style={{
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '14px',
              marginBottom: '8px'
            }}>Screen 4</p>

            <div style={{
              padding: '12px',
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px'
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
              {selectedSeatType && (
                <>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    padding: '8px 0'
                  }}>
                    <span style={{
                      color: isDark ? '#d1d5db' : '#4b5563',
                      fontSize: '15px',
                      textTransform: 'capitalize'
                    }}>{selectedSeatType} ({quantity}x)</span>
                    <span style={{
                      color: isDark ? '#f9fafb' : '#111827',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>₹{getTotalAmount()}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    padding: '8px 0'
                  }}>
                    <span style={{
                      color: isDark ? '#d1d5db' : '#4b5563',
                      fontSize: '15px'
                    }}>Booking charges (incl. of GST)</span>
                    <span style={{
                      color: isDark ? '#f9fafb' : '#111827',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>₹{getBookingCharges()}</span>
                  </div>

                  <hr style={{
                    border: 'none',
                    borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                    margin: '20px 0'
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    padding: '12px 0'
                  }}>
                    <span style={{
                      color: isDark ? '#f9fafb' : '#111827',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>To be paid</span>
                    <span style={{
                      color: isDark ? '#f9fafb' : '#111827',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>₹{getFinalAmount()}</span>
                  </div>
                </>
              )}
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
            ) : null}

            <button
              style={{
                width: '100%',
                padding: '16px',
                background: selectedSeatType ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 25%, #4f46e5 50%, #7c3aed 75%, #8b5cf6 100%)' : '#9ca3af',
                backgroundSize: '200% 200%',
                animation: selectedSeatType ? 'gradientMove 3s ease infinite' : 'none',
                color: 'white',
                boxShadow: selectedSeatType ? '0 8px 25px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: selectedSeatType ? 'pointer' : 'not-allowed',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                opacity: selectedSeatType ? 1 : 0.6
              }}
              onClick={handleBooking}
              disabled={!selectedSeatType}
            >
              <span>₹{getFinalAmount()}</span>
              <span>Proceed to Pay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <USER_PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        totalAmount={getFinalAmount()}
        onPayment={handlePayment}
      />

      {/* Processing Payment Modal */}
      {isProcessingPayment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }}>⏳</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px'
            }}>Processing Payment...</h3>
            <p style={{
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '14px'
            }}>Please wait while we process your payment securely.</p>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {showBookingSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px'
            }}>✓</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827',
              marginBottom: '12px'
            }}>Booking Successful!</h3>
            <p style={{
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: '14px'
            }}>Your tickets have been booked successfully. Redirecting to your bookings...</p>
          </div>
        </div>
      )}

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
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;