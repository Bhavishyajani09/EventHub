import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, totalAmount, onPayment }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [selectedUpiId, setSelectedUpiId] = useState('new');
  const [expandedSection, setExpandedSection] = useState('upi');

  if (!isOpen) return null;

  const paymentSections = [
    { id: 'wallets', title: 'Wallets', icon: '💳' },
    { id: 'cards', title: 'Add credit or debit cards', icon: '💳' },
    { id: 'netbanking', title: 'Netbanking', icon: '🏦' },
    { id: 'upi', title: 'Add new UPI ID', icon: '📱' },
    { id: 'paylater', title: 'Pay Later', icon: '⏰' }
  ];

  const handleSectionToggle = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setSelectedPaymentMethod(sectionId);
  };

  const handlePayment = () => {
    if (onPayment) {
      onPayment({
        method: selectedPaymentMethod,
        upiId: selectedUpiId,
        amount: totalAmount
      });
    }
  };

  return (
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
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: window.innerWidth > 768 ? '500px' : '95vw',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(16px, 4vw, 20px)',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#374151',
              cursor: 'pointer',
              padding: '8px 16px',
              fontWeight: '500'
            }}
          >
            Back
          </button>
          <h2 style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>Checkout</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>

        {/* Payment Options */}
        <div style={{
          maxHeight: 'calc(90vh - 140px)',
          overflowY: 'auto',
          padding: '0 clamp(16px, 4vw, 20px)'
        }}>
          {paymentSections.map((section) => (
            <div key={section.id} style={{
              borderBottom: '1px solid #f3f4f6',
              marginBottom: '8px'
            }}>
              <button
                onClick={() => handleSectionToggle(section.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  color: '#374151',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </div>
                <span style={{
                  fontSize: '18px',
                  transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}>
                  {expandedSection === section.id ? '▲' : '▼'}
                </span>
              </button>

              {/* UPI Section Content */}
              {expandedSection === section.id && section.id === 'upi' && (
                <div style={{
                  paddingBottom: '16px'
                }}>
                  {/* Add new UPI option */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    cursor: 'pointer',
                    border: selectedUpiId === 'new' ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                  }}>
                    <input
                      type="radio"
                      name="upiId"
                      value="new"
                      checked={selectedUpiId === 'new'}
                      onChange={(e) => setSelectedUpiId(e.target.value)}
                      style={{ margin: 0 }}
                    />
                    <span style={{
                      fontSize: '14px',
                      color: '#374151'
                    }}>Add new UPI</span>
                  </label>

                  {/* Payment Apps */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#374151'
                    }}>
                      <span style={{ color: '#4285f4' }}>G</span>
                      <span>Pay</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#5f2d91',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: 'white'
                    }}>
                      <span>📱</span>
                      <span>PhonePe</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#00baf2',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: 'white'
                    }}>
                      <span>paytm</span>
                    </div>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>or others</span>
                  </div>
                </div>
              )}

              {/* Other sections placeholder */}
              {expandedSection === section.id && section.id !== 'upi' && (
                <div style={{
                  padding: '16px 0',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  {section.title} options will be available here
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pay Button */}
        <div style={{
          padding: 'clamp(16px, 4vw, 20px)',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={handlePayment}
            style={{
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
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
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
            PAY ₹{totalAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;