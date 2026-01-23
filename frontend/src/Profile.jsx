import React from 'react';
import { ArrowLeft, Calendar, Heart, MessageCircle, FileText, Shield, LogOut } from 'lucide-react';

const Profile = ({ onBack, onLogout, isOpen, onClose, user, onNavigateToBookings, onNavigateToTerms, onNavigateToPrivacy, onNavigateToContact }) => {
  const handleViewBookings = () => {
    onNavigateToBookings();
    onClose();
  };

  const handleWishlist = () => {
    console.log('Navigate to wishlist');
  };

  const handleChatSupport = () => {
    onNavigateToContact();
    onClose();
  };

  const handleTerms = () => {
    onNavigateToTerms();
    onClose();
  };

  const handlePrivacy = () => {
    onNavigateToPrivacy();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease-out'
        }} 
      />

      {/* Profile Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 1000,
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
        animation: 'slideInRight 0.3s ease-out',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={onClose}
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
            <ArrowLeft size={24} color="#333" />
          </button>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            margin: 0
          }}>
            Profile
          </h1>
        </div>

        {/* User Info Section */}
        <div style={{
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '600',
            color: 'white'
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              margin: '0 0 4px 0'
            }}>
              {user?.name || 'User'}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}>
              {user?.phone || user?.email || 'No contact info'}
            </p>
          </div>
        </div>

        {/* View all bookings */}
        <div style={{
          padding: '0 20px',
          marginBottom: '16px'
        }}>
          <div
            onClick={handleViewBookings}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              cursor: 'pointer',
              borderRadius: '12px',
              transition: 'background-color 0.2s',
              backgroundColor: 'white'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            <div style={{
              width: '24px',
              height: '24px',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={20} color="#333" />
            </div>
            <span style={{
              fontSize: '16px',
              color: '#333',
              flex: 1
            }}>
              View all bookings
            </span>
            <div style={{
              width: '8px',
              height: '8px',
              borderTop: '2px solid #ccc',
              borderRight: '2px solid #ccc',
              transform: 'rotate(45deg)'
            }} />
          </div>
        </div>

        {/* Support Section */}
        <div style={{
          padding: '0 20px',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#666',
            margin: '0 0 12px 0'
          }}>
            Support
          </h3>
          <div
            onClick={handleChatSupport}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              cursor: 'pointer',
              borderRadius: '12px',
              transition: 'background-color 0.2s',
              backgroundColor: 'white'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            <div style={{
              width: '24px',
              height: '24px',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle size={20} color="#333" />
            </div>
            <span style={{
              fontSize: '16px',
              color: '#333',
              flex: 1
            }}>
              Chat with us
            </span>
            <div style={{
              width: '8px',
              height: '8px',
              borderTop: '2px solid #ccc',
              borderRight: '2px solid #ccc',
              transform: 'rotate(45deg)'
            }} />
          </div>
        </div>

        {/* More Section */}
        <div style={{
          padding: '0 20px',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#666',
            margin: '0 0 12px 0'
          }}>
            More
          </h3>
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div
              onClick={handleTerms}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background-color 0.2s',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <div style={{
                width: '24px',
                height: '24px',
                marginRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={20} color="#333" />
              </div>
              <span style={{
                fontSize: '16px',
                color: '#333',
                flex: 1
              }}>
                Terms & Conditions
              </span>
              <div style={{
                width: '8px',
                height: '8px',
                borderTop: '2px solid #ccc',
                borderRight: '2px solid #ccc',
                transform: 'rotate(45deg)'
              }} />
            </div>

            <div
              onClick={handlePrivacy}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              <div style={{
                width: '24px',
                height: '24px',
                marginRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={20} color="#333" />
              </div>
              <span style={{
                fontSize: '16px',
                color: '#333',
                flex: 1
              }}>
                Privacy Policy
              </span>
              <div style={{
                width: '8px',
                height: '8px',
                borderTop: '2px solid #ccc',
                borderRight: '2px solid #ccc',
                transform: 'rotate(45deg)'
              }} />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div style={{
          padding: '0 20px 32px 20px'
        }}>
          <div
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              cursor: 'pointer',
              borderRadius: '12px',
              transition: 'background-color 0.2s',
              backgroundColor: 'white'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            <div style={{
              width: '24px',
              height: '24px',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LogOut size={20} color="#ef4444" />
            </div>
            <span style={{
              fontSize: '16px',
              color: '#ef4444',
              flex: 1,
              fontWeight: '500'
            }}>
              Logout
            </span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { 
            transform: translateX(100%);
          }
          to { 
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Profile;