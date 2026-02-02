import React from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Profile = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const userData = {
    name: user?.name || 'Test User',
    email: user?.email || 'test@example.com',
    phone: user?.phone || '+1 234 567 8900',
    location: user?.location || 'New York, USA',
    joinDate: user?.joinDate || '2024-01-15'
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
          My Profile
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
          {userData.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Profile Card */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#8b5cf6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: '600',
              marginRight: '20px'
            }}>
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                margin: '0 0 4px 0'
              }}>
                {userData.name}
              </h2>
              <p style={{
                fontSize: '16px',
                color: isDark ? '#9ca3af' : '#6b7280',
                margin: 0
              }}>
                Member
              </p>
            </div>
          </div>

          {/* Profile Fields */}
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {[
              { icon: User, label: 'Full Name', value: userData.name },
              { icon: Mail, label: 'Email Address', value: userData.email },
              { icon: Phone, label: 'Phone Number', value: userData.phone },
              { icon: MapPin, label: 'Location', value: userData.location },
              { icon: Calendar, label: 'Member Since', value: userData.joinDate }
            ].map((field, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: isDark ? '#374151' : '#f9fafb',
                borderRadius: '12px'
              }}>
                <field.icon size={20} style={{ color: '#8b5cf6' }} />
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {field.label}
                  </label>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}>
                    {field.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;