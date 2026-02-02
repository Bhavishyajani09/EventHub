import React, { useState, useEffect, useRef } from 'react';
import { User, Ticket, Settings, HelpCircle, LogOut } from 'lucide-react';

const ProfilePanel = ({ user, isOpen, onClose, onLogout, onNavigate, isDark }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const panelRef = useRef(null);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onNavigate(itemId);
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: window.innerWidth <= 768 ? 'block' : 'none',
        animation: 'fadeIn 0.2s ease-out'
      }} />

      {/* Profile Panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: window.innerWidth <= 768 ? 'auto' : '70px',
          bottom: window.innerWidth <= 768 ? '0' : 'auto',
          right: window.innerWidth <= 768 ? '0' : '20px',
          left: window.innerWidth <= 768 ? '0' : 'auto',
          width: window.innerWidth <= 768 ? '100%' : '320px',
          maxHeight: window.innerWidth <= 768 ? '70vh' : '500px',
          backgroundColor: 'white',
          borderRadius: window.innerWidth <= 768 ? '20px 20px 0 0' : '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          overflow: 'hidden',
          animation: window.innerWidth <= 768 ? 'slideUpMobile 0.3s ease-out' : 'slideDown 0.3s ease-out'
        }}
      >
        {/* Header Section */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #f3f4f6',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* User Avatar */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '600',
              border: '3px solid rgba(255, 255, 255, 0.3)'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
            </div>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                {user?.name || 'Guest User'}
              </h3>

            </div>

            {/* Close Button (Mobile) */}
            {window.innerWidth <= 768 && (
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '18px'
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ padding: '16px 0' }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: activeItem === item.id ? '#f8fafc' : 'transparent',
                borderLeft: activeItem === item.id ? '4px solid #3b82f6' : '4px solid transparent',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (activeItem !== item.id) {
                  e.target.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{
                width: '24px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <item.icon size={20} />
              </span>
              <span style={{
                fontSize: '16px',
                fontWeight: activeItem === item.id ? '600' : '500',
                color: activeItem === item.id ? '#1f2937' : '#4b5563',
                flex: 1
              }}>
                {item.label}
              </span>
              {activeItem === item.id && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6'
                }} />
              )}
            </div>
          ))}

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: '#e5e7eb',
            margin: '16px 24px'
          }} />

          {/* Logout Button */}
          <div
            onClick={handleLogoutClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderLeft: '4px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fef2f2';
              e.target.style.borderLeftColor = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderLeftColor = 'transparent';
            }}
          >
            <span style={{
              width: '24px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LogOut size={20} />
            </span>
            <span style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#ef4444',
              flex: 1
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
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideUpMobile {
          from { 
            opacity: 0;
            transform: translateY(100%);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ProfilePanel;