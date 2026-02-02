import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';

const Settings = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Test User',
    email: user?.email || 'test@example.com',
    phone: user?.phone || '+1 234 567 8900',
    location: user?.location || 'New York, USA',
    joinDate: user?.joinDate || '2024-01-15'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: user?.name || 'Test User',
      email: user?.email || 'test@example.com',
      phone: user?.phone || '+1 234 567 8900',
      location: user?.location || 'New York, USA',
      joinDate: user?.joinDate || '2024-01-15'
    });
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
          Settings
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
          {formData.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Profile Settings Card */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
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
                fontWeight: '600'
              }}>
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: isDark ? '#f9fafb' : '#111827',
                  margin: '0 0 4px 0'
                }}>
                  Update Profile
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: isDark ? '#9ca3af' : '#6b7280',
                  margin: 0
                }}>
                  Manage your account information
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Fields */}
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {[
              { icon: User, label: 'Full Name', key: 'name', value: formData.name },
              { icon: Mail, label: 'Email Address', key: 'email', value: formData.email },
              { icon: Phone, label: 'Phone Number', key: 'phone', value: formData.phone },
              { icon: MapPin, label: 'Location', key: 'location', value: formData.location },
              { icon: Calendar, label: 'Member Since', key: 'joinDate', value: formData.joinDate, readonly: true }
            ].map((field) => (
              <div key={field.key} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: isDark ? '#374151' : '#f9fafb',
                borderRadius: '12px'
              }}>
                <field.icon size={20} style={{ color: '#8b5cf6' }} />
                <div style={{ flex: 1 }}>
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
                  {isEditing && !field.readonly ? (
                    <input
                      type={field.key === 'email' ? 'email' : field.key === 'phone' ? 'tel' : 'text'}
                      value={field.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                        borderRadius: '6px',
                        fontSize: '16px',
                        backgroundColor: isDark ? '#1f2937' : 'white',
                        color: isDark ? '#f9fafb' : '#111827',
                        outline: 'none'
                      }}
                    />
                  ) : (
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: isDark ? '#f9fafb' : '#111827'
                    }}>
                      {field.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;