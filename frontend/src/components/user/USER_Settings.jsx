import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';

const Settings = ({ onBack, user, isDark, onProfileClick, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load user data when user prop changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      // Import dynamically or assume it's passed/available. 
      // For now assuming we import authService at top or use simple fetch if import is tricky with this tool.
      // Better to use the authService we just updated.
      // I will add the import at the top in a separate tool call if needed, but here I'll assume it's imported.
      // Wait, I can't assume. I need to add the import.
      // I will use imports in the top of the file in the previous step or this one. 
      // Actually I should have added the import first. I'll add it in this replacement or separate one.
      // I'll add it here by replacing the whole file structure or just this part.
      // Let's assuming I will add the import in a bit. For now:

      const { default: authService } = await import('../../services/authService');

      await authService.updateUserProfile(formData, token);
      alert('Profile updated successfully');
      setIsEditing(false);
      // Ideally trigger a user reload in context, but for now this updates the local state view
    } catch (error) {
      console.error(error);
      alert('Failed to update profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("Please fill in all password fields");
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const { default: authService } = await import('../../services/authService');

      await authService.changeUserPassword(passwordData.currentPassword, passwordData.newPassword, token);

      alert('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to change password: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
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
              <path d="m15 18-6-6 6-6" />
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
                  disabled={loading}
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
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
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
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
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
              { icon: Phone, label: 'Phone Number', key: 'phone', value: formData.phone }
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
                  {isEditing ? (
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

        {/* Change Password Card */}
        <div style={{
          backgroundColor: isDark ? '#1f2937' : 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#ec4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                margin: '0 0 4px 0'
              }}>
                Change Password
              </h2>
              <p style={{
                fontSize: '16px',
                color: isDark ? '#9ca3af' : '#6b7280',
                margin: 0
              }}>
                Update your account password
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: isDark ? '#e5e7eb' : '#374151',
                marginBottom: '8px'
              }}>
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: isDark ? '#374151' : 'white',
                  color: isDark ? '#f9fafb' : '#111827',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: isDark ? '#e5e7eb' : '#374151',
                  marginBottom: '8px'
                }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: isDark ? '#374151' : 'white',
                    color: isDark ? '#f9fafb' : '#111827',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: isDark ? '#e5e7eb' : '#374151',
                  marginBottom: '8px'
                }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: isDark ? '#374151' : 'white',
                    color: isDark ? '#f9fafb' : '#111827',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handlePasswordChange}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background-color 0.2s'
                }}
              >
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;