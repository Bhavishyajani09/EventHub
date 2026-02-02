import React, { useState } from 'react';

const Bookings = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Events');

  const tabs = ['Events', 'Movies'];

  // Mock bookings data - replace with real data
  const bookings = {
    Events: [],
    Movies: []
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
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
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
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
                color: '#111827'
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
          color: '#111827',
          margin: 0,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
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
            backgroundColor: '#f3f4f6',
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
                  backgroundColor: activeTab === tab ? '#000000' : 'transparent',
                  color: activeTab === tab ? 'white' : '#6b7280'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
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
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            </div>
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
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
      </div>
    </div>
  );
};

export default Bookings;