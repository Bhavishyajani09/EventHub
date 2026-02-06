import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Import useAuth
import { Sun, Moon, User, LogOut, Settings, UserCircle } from 'lucide-react';

const Navbar = ({ isDark, setIsDark, user: propUser, onAuthOpen, onProfileClick, onNavigate, activePage = 'home', hideNavigation = false, searchOnly = false, pageTitle, onLogout, hideThemeToggle = false, hideProfileOption = false, enableDropdown = false, onSearch }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Fallback to context user if prop not provided
  const context = tryUseAuth();
  const user = propUser || context?.user;

  // Make useAuth optional so it doesn't break if used outside provider (though unlikely here)
  function tryUseAuth() {
    try {
      return useAuth();
    } catch (e) {
      return null;
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(localSearchQuery);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(localSearchQuery);
    }
  };

  // Debug logging
  // console.log('SharedNavbar user:', user);
  // console.log('SharedNavbar photo:', user?.photo);



  return (
    <nav style={{
      width: '100%',
      backgroundColor: isDark ? '#1f2937' : 'white',
      boxShadow: isDark ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderBottom: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          gap: '20px'
        }}>
          {/* Left Section - Logo & Brand */}
          <div
            onClick={() => onNavigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: 'fit-content',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              padding: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src="/new_icon_favicon.png"
              alt="EventHub Logo"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '8px'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontSize: '22px',
                fontWeight: '700',
                color: isDark ? '#f9fafb' : '#111827',
                lineHeight: '1.2'
              }}>EventHub</span>
              <span style={{
                fontSize: '10px',
                color: isDark ? '#9ca3af' : '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: '500'
              }}>EVENT PLATFORM</span>
            </div>
          </div>

          {/* Page Title for Special Pages */}
          {pageTitle && (
            <div style={{
              flex: 1,
              textAlign: 'center',
              maxWidth: '400px'
            }}>
              <h1 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDark ? '#f9fafb' : '#111827',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{pageTitle}</h1>
            </div>
          )}

          {/* Center Section - Navigation */}
          {!hideNavigation && !searchOnly && (
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              backgroundColor: isDark ? '#374151' : '#f8fafc',
              borderRadius: '12px',
              padding: '4px'
            }}>
              {[
                { name: 'For you', key: 'home', path: '/' },
                { name: 'Movies', key: 'movies', path: '/movies' },
                { name: 'Events', key: 'events', path: '/events' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onNavigate(tab.key)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: activePage === tab.key ? '2px solid #8b5cf6' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: activePage === tab.key ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                    color: activePage === tab.key ? '#8b5cf6' : (isDark ? '#d1d5db' : '#6b7280'),
                    whiteSpace: 'nowrap',
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activePage !== tab.key) {
                      e.target.style.backgroundColor = isDark ? '#4b5563' : '#e2e8f0';
                      e.target.style.color = isDark ? '#f9fafb' : '#374151';
                    } else {
                      e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activePage !== tab.key) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = isDark ? '#d1d5db' : '#6b7280';
                    } else {
                      e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
                    }
                  }}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}

          {/* Right Section - Search & Profile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: 'fit-content'
          }}>
            {/* Search Input */}
            {(!hideNavigation || searchOnly) && (
              <div style={{
                position: 'relative',
                display: 'flex',
                minWidth: searchOnly ? '250px' : '280px',
                maxWidth: '350px'
              }}>
                <input
                  type="text"
                  placeholder="Search events, movies..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: isDark ? '#374151' : '#f8fafc',
                    color: isDark ? '#f9fafb' : '#111827',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <svg
                  onClick={handleSearchClick}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    cursor: 'pointer'
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {/* Theme Toggle */}
            {!hideThemeToggle && (
              <button
                onClick={() => setIsDark(!isDark)}
                style={{
                  padding: '10px',
                  backgroundColor: isDark ? '#374151' : '#f8fafc',
                  border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: isDark ? '#f9fafb' : '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDark ? '#4b5563' : '#e2e8f0';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDark ? '#374151' : '#f8fafc';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Login/Profile Section */}
            {/* Login/Profile Section */}
            {user ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Standalone Logout Button (Only if Dropdown is DISABLED) */}
                {!enableDropdown && onLogout && (
                  <button
                    onClick={onLogout}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: isDark ? '#374151' : '#f8fafc',
                      border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: isDark ? '#f9fafb' : '#374151',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = isDark ? '#4b5563' : '#e2e8f0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = isDark ? '#374151' : '#f8fafc';
                    }}
                  >
                    Logout
                  </button>
                )}

                <div
                  onClick={() => {
                    if (enableDropdown) {
                      setIsProfileOpen(!isProfileOpen);
                    } else if (onProfileClick) {
                      onProfileClick();
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: user?.photo ? 'transparent' : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                      border: '2px solid transparent',
                      overflow: 'hidden'
                    }}
                  >
                    {user?.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '10px'
                        }}
                      />
                    ) : (
                      <span style={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown Menu (Only if Dropdown is ENABLED) */}
                {enableDropdown && isProfileOpen && (
                  <>
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 998,
                        cursor: 'default'
                      }}
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '120%',
                      right: 0,
                      width: '200px',
                      backgroundColor: isDark ? '#374151' : 'white',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                      padding: '8px',
                      zIndex: 999,
                      border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
                      overflow: 'hidden'
                    }}>
                      {!hideProfileOption && (
                        <button
                          onClick={() => {
                            onProfileClick && onProfileClick();
                            setIsProfileOpen(false);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: isDark ? '#f9fafb' : '#374151',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            textAlign: 'left',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <UserCircle size={18} />
                          Profile
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onNavigate && onNavigate('settings');
                          setIsProfileOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: isDark ? '#f9fafb' : '#374151',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          textAlign: 'left',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Settings size={18} />
                        Settings
                      </button>

                      <div style={{ margin: '4px 0', borderTop: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb' }} />

                      <button
                        onClick={() => {
                          onLogout && onLogout();
                          setIsProfileOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#ef4444',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          textAlign: 'left',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#4b5563' : '#fef2f2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : onAuthOpen ? (
              <button
                onClick={onAuthOpen}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                }}
              >
                Login
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          nav > div > div {
            gap: 16px !important;
          }
          nav > div > div > div:nth-child(3) > div {
            gap: 4px !important;
            padding: 2px !important;
          }
          nav > div > div > div:nth-child(3) > div > button {
            padding: 8px 12px !important;
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 768px) {
          nav > div > div {
            height: auto !important;
            flex-direction: column !important;
            padding: 12px 0 !important;
            gap: 12px !important;
          }
          
          nav > div > div > div:first-child {
            order: 1;
            width: 100% !important;
            justify-content: center !important;
          }
          
          nav > div > div > div:nth-child(2) {
            order: 3;
            max-width: 100% !important;
          }
          
          nav > div > div > div:nth-child(3) {
            order: 2;
            width: 100% !important;
            justify-content: center !important;
          }
          
          nav > div > div > div:last-child {
            order: 4;
            width: 100% !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
          
          nav > div > div > div:last-child > div:first-child {
            min-width: 200px !important;
            max-width: 280px !important;
            flex: 1 !important;
          }
        }
        
        @media (max-width: 480px) {
          nav > div {
            padding: 0 16px !important;
          }
          
          nav > div > div > div:first-child > div:last-child {
            display: none !important;
          }
          
          nav > div > div > div:first-child > img {
            width: 40px !important;
            height: 40px !important;
          }
          
          nav > div > div > div:nth-child(3) > div {
            gap: 2px !important;
            padding: 2px !important;
          }
          
          nav > div > div > div:nth-child(3) > div > button {
            padding: 6px 8px !important;
            font-size: 11px !important;
          }
          
          nav > div > div > div:last-child {
            gap: 8px !important;
          }
          
          nav > div > div > div:last-child > div:first-child {
            min-width: 150px !important;
            max-width: 200px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;