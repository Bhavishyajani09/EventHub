import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

const HelpCenter = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I book tickets for events?",
      answer: "You can book tickets by browsing events, selecting your preferred event, choosing seats, and completing the payment process."
    },
    {
      question: "Can I cancel or refund my booking?",
      answer: "Cancellations are allowed up to 24 hours before the event. Refunds will be processed within 5-7 business days."
    },
    {
      question: "How do I change my account information?",
      answer: "Go to your Profile section and click 'Edit Profile' to update your personal information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital wallets like PayPal and Apple Pay."
    },
    {
      question: "How will I receive my tickets?",
      answer: "Digital tickets will be sent to your email and are also available in the 'My Bookings' section of your account."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDark ? '#111827' : '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: isDark ? '#1f2937' : 'white',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
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
              color: isDark ? '#f9fafb' : '#111827'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <div 
            onClick={() => onNavigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer'
            }}
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
                color: isDark ? '#9ca3af' : '#6b7280',
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
          transform: 'translateX(-50%)'
        }}>
          Help Center
        </h1>

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
            color: 'white',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* FAQ Section */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '24px'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: isDark ? '#374151' : '#f9fafb',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}
                >
                  {faq.question}
                  {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFaq === index && (
                  <div style={{
                    padding: '20px',
                    backgroundColor: isDark ? '#1f2937' : 'white',
                    borderTop: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: isDark ? '#d1d5db' : '#6b7280'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: isDark ? '#f9fafb' : '#111827',
            marginBottom: '16px'
          }}>
            Still Need Help?
          </h2>
          <p style={{
            fontSize: '16px',
            color: isDark ? '#d1d5db' : '#6b7280',
            marginBottom: '24px'
          }}>
            Can't find what you're looking for? Get in touch with our support team.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <a
              href="mailto:support@eventhub.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              <Mail size={20} />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;