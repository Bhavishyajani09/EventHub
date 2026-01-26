import React, { useState } from 'react';
import SharedNavbar from './SharedNavbar';

const TicketSelection = ({ event, selectedSection, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

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
          <h2>Event or section not found</h2>
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

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = parseInt(selectedSection.price.replace('₹', '')) * quantity;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(event, selectedSection, quantity);
    }
  };

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
      />

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column'
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
            gap: '8px',
            alignSelf: 'flex-start'
          }}
        >
          ← Back
        </button>

        {/* Event Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '8px'
          }}>Show Name - {event.title}</h1>
        </div>

        {/* Choose Tickets Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            margin: 0
          }}>CHOOSE TICKETS</h2>
        </div>

        {/* Ticket Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '40px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Section Name and Price */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              margin: 0
            }}>Early Bird | {selectedSection.name}</h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: isDark ? '#f9fafb' : '#111827'
              }}>{selectedSection.price}</span>
              
              {/* Quantity Selector */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                borderRadius: '8px',
                padding: '4px'
              }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: quantity <= 1 ? (isDark ? '#6b7280' : '#9ca3af') : (isDark ? '#f9fafb' : '#111827'),
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  −
                </button>
                <span style={{
                  minWidth: '40px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827'
                }}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: quantity >= 10 ? (isDark ? '#6b7280' : '#9ca3af') : (isDark ? '#f9fafb' : '#111827'),
                    cursor: quantity >= 10 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Section Details */}
          <div style={{
            fontSize: '14px',
            color: isDark ? '#9ca3af' : '#6b7280',
            lineHeight: '1.5'
          }}>
            <div style={{ marginBottom: '4px' }}>
              • This section allows entry to one individual.
            </div>
            <div>
              • This is a standing section.
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginTop: 'auto'
        }}>
          {/* Total Price */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: isDark ? '#f9fafb' : '#111827'
            }}>₹{totalPrice}</span>
            <span style={{
              fontSize: '14px',
              color: isDark ? '#9ca3af' : '#6b7280'
            }}>{quantity} ticket{quantity > 1 ? 's' : ''}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
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
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0f172a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;