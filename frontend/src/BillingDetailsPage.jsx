import React, { useState, useEffect } from 'react';
import SharedNavbar from './SharedNavbar';
import PaymentModal from './PaymentModal';

const BillingDetailsPage = ({ event, selectedSection, quantity, isDark, setIsDark, user, onAuthOpen, onProfileClick, onNavigate, onBack, onContinue }) => {
  const [timeLeft, setTimeLeft] = useState(477); // 7:57 in seconds
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    nationality: 'indian',
    state: 'Madhya Pradesh',
    email: user?.email || '',
    acceptTerms: false
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinue = () => {
    if (formData.acceptTerms) {
      setIsPaymentModalOpen(true);
    }
  };

  const handlePayment = (paymentData) => {
    console.log('Payment data:', paymentData);
    setIsPaymentModalOpen(false);
    if (onContinue) {
      onContinue({ ...formData, payment: paymentData });
    }
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
            Back
          </button>
        </div>
      </div>
    );
  }

  const orderAmount = parseInt(selectedSection.price.replace('₹', '')) * quantity;
  const bookingFee = Math.round(orderAmount * 0.085);
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
          Back
        </button>

        {/* Step 1: Order Summary (Completed) */}
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
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
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
              }}>✓</div>
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  margin: 0
                }}>Order Summary</h3>
                <p style={{
                  fontSize: '12px',
                  color: isDark ? '#9ca3af' : '#6b7280',
                  margin: '2px 0 0 0'
                }}>Items: 1 • Total: ₹{grandTotal.toLocaleString()}</p>
              </div>
            </div>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px'
            }}>✓</div>
          </div>
        </div>

        {/* Step 2: Billing Details (Active) */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
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
            }}>2</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#f9fafb' : '#111827',
              margin: 0
            }}>Billing Details</h3>
          </div>

          <p style={{
            fontSize: '14px',
            color: isDark ? '#9ca3af' : '#6b7280',
            marginBottom: '20px'
          }}>These details will be shown on your invoice *</p>

          {/* Form */}
          <div style={{ marginBottom: '24px' }}>
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#374151' : 'white',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#374151' : 'white',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />

            {/* Nationality */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#d1d5db' : '#374151',
                marginBottom: '8px'
              }}>Select nationality</p>
              <div style={{
                display: 'flex',
                gap: '20px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="nationality"
                    value="indian"
                    checked={formData.nationality === 'indian'}
                    onChange={handleInputChange}
                    style={{ margin: 0 }}
                  />
                  <span style={{
                    fontSize: '14px',
                    color: isDark ? '#d1d5db' : '#374151'
                  }}>Indian resident</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="nationality"
                    value="international"
                    checked={formData.nationality === 'international'}
                    onChange={handleInputChange}
                    style={{ margin: 0 }}
                  />
                  <span style={{
                    fontSize: '14px',
                    color: isDark ? '#d1d5db' : '#374151'
                  }}>International visitor</span>
                </label>
              </div>
            </div>

            {/* State */}
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#374151' : 'white',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: isDark ? '#374151' : 'white',
                color: isDark ? '#f9fafb' : '#111827',
                marginBottom: '8px',
                boxSizing: 'border-box'
              }}
            />

            <p style={{
              fontSize: '12px',
              color: isDark ? '#9ca3af' : '#6b7280',
              marginBottom: '20px'
            }}>We'll email you ticket confirmation and invoices</p>

            {/* Terms and Conditions */}
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                style={{ marginTop: '2px' }}
              />
              <span style={{
                fontSize: '14px',
                color: isDark ? '#d1d5db' : '#374151',
                lineHeight: '1.4'
              }}>
                I have read and accepted the{' '}
                <a href="#" style={{
                  color: '#3b82f6',
                  textDecoration: 'none'
                }}>terms and conditions</a>
              </span>
            </label>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!formData.acceptTerms}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: formData.acceptTerms ? '#1e293b' : (isDark ? '#4b5563' : '#9ca3af'),
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: formData.acceptTerms ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (formData.acceptTerms) {
                  e.target.style.backgroundColor = '#0f172a';
                }
              }}
              onMouseLeave={(e) => {
                if (formData.acceptTerms) {
                  e.target.style.backgroundColor = '#1e293b';
                }
              }}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={grandTotal}
        onPayment={handlePayment}
      />
    </div>
  );
};

export default BillingDetailsPage;